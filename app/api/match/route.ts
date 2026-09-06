import { people } from '@/lib/people';
import { PLAN_PROMPT,JUDGE_PROMPT,planSchema,decisionSchema,validateDecisions,rankCandidates,shortlist,type Plan,type Decision } from '@/lib/engine';
export const dynamic='force-dynamic';
const quota = new Map<string,{count:number;reset:number}>();
let vectorCache: {model:string;vectors:number[][]}|undefined;
type OpenAIReply={status?:string;output?:{content?:{type:string;text?:string}[]}[];data?:{index:number;embedding:number[]}[]};
async function openai(path:string,body:unknown,key:string,signal:AbortSignal):Promise<OpenAIReply>{
 const r=await fetch(`https://api.openai.com/v1/${path}`,{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify(body),signal});
 if(!r.ok) throw new Error(`模型服務暫時無法完成（HTTP ${r.status}）。請稍後再試。`);
 return await r.json() as OpenAIReply;
}
async function jsonCall(key:string,model:string,system:string,input:unknown,schema:unknown,signal:AbortSignal){
 const data=await openai('responses',{model,store:false,instructions:system,input:JSON.stringify(input),reasoning:{effort:'low'},text:{format:{type:'json_schema',name:'event_result',strict:true,schema}},max_output_tokens:10000},key,signal);
 const text=(data.output||[]).flatMap(o=>o.content||[]).filter(c=>c.type==='output_text').map(c=>c.text||'').join('');
 if(data.status!=='completed'||!text) throw new Error('模型未產生完整結果；本次不顯示未完成的推薦。');
 return JSON.parse(text);
}
export async function POST(request:Request){
 const key=process.env.OPENAI_API_KEY; if(!key) return Response.json({error:'API 尚未設定；目前可瀏覽匿名化名單與運作說明。'},{status:503});
 const origin=request.headers.get('origin'); if(origin&&origin!==new URL(request.url).origin) return Response.json({error:'請從 Demo 網頁執行。'},{status:403});
 const ip=request.headers.get('cf-connecting-ip')||request.headers.get('x-forwarded-for')||'local';const now=Date.now();
 if(quota.size>1000)for(const [k,v]of quota)if(v.reset<now)quota.delete(k);
 const q=quota.get(ip);if(q&&q.reset>now&&q.count>=8)return Response.json({error:'此 Demo 每個來源每十分鐘最多執行八次，請稍候。'},{status:429});
 let input:{background:string;query:string;viewerId?:string};try{const raw=await request.text();if(raw.length>5000)throw 0;input=JSON.parse(raw);if(typeof input.background!=='string'||typeof input.query!=='string'||!input.background.trim()||!input.query.trim()||input.background.length>2200||input.query.length>1000)throw 0;}catch{return Response.json({error:'請填寫背景與需求，並縮短至欄位上限內。'},{status:400});}
 quota.set(ip,{count:q&&q.reset>now?q.count+1:1,reset:q&&q.reset>now?q.reset:now+600000});
 const model=process.env.OPENAI_MODEL||'gpt-5-mini';const embeddingModel='text-embedding-3-small';const encoder=new TextEncoder();
 const stream=new ReadableStream({async start(controller){
  const send=(type:string,payload:unknown)=>controller.enqueue(encoder.encode(JSON.stringify({type,...payload as object})+'\n'));
  const deadline=AbortSignal.timeout(170000);let calls=0;const started=Date.now();
  try{
   send('stage',{step:0,title:'理解你想認識的人',detail:'讀取你的背景與這次需求，形成交流方向。'});
   const plan:Plan=await jsonCall(key,model,PLAN_PROMPT,input,planSchema,deadline);calls++;
   send('plan',{plan});
   const warm=vectorCache?.model===embeddingModel;
   send('stage',{step:1,title:'建立語意搜尋',detail:warm?'沿用匿名化名單索引，將這次需求轉為向量。':'首次建立匿名化名單索引，同時將這次需求轉為向量。'});
   const texts=warm?[plan.searchText]:[...people.map(p=>`${p.role}\n${p.intro}\n${p.needs}`),plan.searchText];
   const emb=await openai('embeddings',{model:embeddingModel,input:texts,dimensions:512},key,deadline);calls++;
   if(!emb.data?.length)throw Error('向量回應不完整');
   const vectors=emb.data.sort((a:{index:number},b:{index:number})=>a.index-b.index).map((x:{embedding:number[]})=>x.embedding);
   if(!warm)vectorCache={model:embeddingModel,vectors:vectors.slice(0,-1)};
   const available=people.filter(p=>p.id!==input.viewerId);
   const availableVectors=vectorCache!.vectors.filter((_,i)=>people[i].id!==input.viewerId);
   const routes=shortlist(available,availableVectors,vectors.at(-1)!,plan.searchText);
   send('retrieval',{step:2,title:'找到值得核對的線索',detail:`從 ${people.length} 位匿名化人物取出 ${routes.length} 位，結合語意與文字排名。相似不代表適合。`,candidates:routes.map(r=>({id:r.person.id,name:r.person.name,focus:r.person.focus}))});
   send('stage',{step:3,title:'核對雙方關係與原文',detail:'分兩批讀取候選原文，檢查對你有什麼交流價值。'});
   const batches=[routes.slice(0,10),routes.slice(10)];let done=0;let repairs=0;
   const assessments=(await Promise.all(batches.map(async batch=>{
    const candidates=batch.map(r=>r.person);const packet={seeker:input,plan,candidates};
    let raw=await jsonCall(key,model,JUDGE_PROMPT,packet,decisionSchema(candidates.length),deadline);calls++;
    let checked:Decision[];
    try{checked=validateDecisions(raw.decisions,candidates);}catch{repairs++;raw=await jsonCall(key,model,JUDGE_PROMPT+' The previous output failed exact citation or candidate coverage checks. Return a corrected complete batch.',{...packet,previous:raw},decisionSchema(candidates.length),deadline);calls++;checked=validateDecisions(raw.decisions,candidates);}
    done+=batch.length;send('checked',{step:3,done,total:routes.length,accepted:checked.filter(d=>d.fit!=='none').length});return checked;
   }))).flat();
   send('stage',{step:4,title:'整理你的交流起點',detail:'引用已通過逐字檢查，彙整推薦理由、開場問題與待確認事項。'});
   const matches=rankCandidates(assessments).map(d=>({...d,person:people.find(p=>p.id===d.id),score:undefined}));
   const rejected=assessments.filter(d=>d.fit==='none').map(d=>({id:d.id,name:people.find(p=>p.id===d.id)!.name,why:d.why,gap:d.gap}));
   send('result',{matches,rejected,plan,stats:{pool:people.length,reviewed:routes.length,accepted:assessments.filter(d=>d.fit!=='none').length,shown:matches.length,calls,repairs,seconds:Math.round((Date.now()-started)/100)/10,model,embeddingModel},disclosure:'匿名化參加者；即時 API 執行。這些是判定摘要與來源證據，不是模型的內部思考逐字稿。'});
  }catch(e){send('error',{message:e instanceof Error?e.message:'執行未完成，請重試。'});}finally{controller.close();}
 }});
 return new Response(stream,{headers:{'Content-Type':'application/x-ndjson; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
}
