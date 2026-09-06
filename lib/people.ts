import generatedPeople from './generated-people.json';
export type Person = { id: string; name: string; role: string; focus: string; intro: string; needs: string };
// Authored fictional scenarios. No record is a renamed real attendee.
export const syntheticPeople: Person[] = [
 {id:'p01',name:'林語晴',role:'企業 AI 創業者',focus:'AI · Enterprise',intro:'我是青序工作室共同創業者。我們替製造與零售企業導入 AI Agent，已完成三個內部客服與訂單流程專案。我負責把訪談轉成需求規格，以及導入後的成效衡量。',needs:'想和企業軟體創業者交流試點如何轉成長期合約，也想認識熟悉 ERP 整合的技術夥伴。'},
 {id:'p02',name:'周沐安',role:'診所營運負責人',focus:'Healthcare · Operations',intro:'我管理澄嶼診所集團的預約與客服流程。目前仍用人工整理跨據點預約，員工每天花很多時間回答重複問題。我不開發 AI 產品。',needs:'正在尋找可以整合預約系統、提供內部客服自動化的團隊，希望先從小規模試點開始。'},
 {id:'p03',name:'江允哲',role:'醫療 SaaS 創業者',focus:'Healthcare · SaaS',intro:'我創立維序軟體，產品替診所客戶處理排班與病患通知。我們已有自己的工程團隊。診所的排班問題是我們的客戶問題，並不是我公司的內部採購需求。',needs:'想認識醫療通路夥伴與診所客戶。目前沒有導入外部自動化服務的需求。'},
 {id:'p04',name:'許庭禾',role:'ERP 整合工程师',focus:'ERP · Integration',intro:'我有七年企業系統整合經驗，實作過 SAP 與訂單系統 API、權限稽核和資料同步。我曾協助兩間製造業公司把人工報表改成自動排程。',needs:'希望認識做企業 AI 產品的創業者，交流產品化與客戶需求訪談；可以討論技術合作，尚未決定加入新團隊。'},
 {id:'p05',name:'陳以棠',role:'消費 AI 創業者',focus:'Consumer AI',intro:'我是小島筆記的獨立創業者，做日記整理與個人習慣工具。我的經驗是消費訂閱、社群內容與使用者留存，沒有企業軟體導入經驗。',needs:'想認識其他消費產品創業者，交流訂閱轉換率。'},
 {id:'p06',name:'方若川',role:'早期投資人',focus:'B2B · Seed',intro:'我在虛構的拾光創投負責 pre-seed 與 seed 投資，關注企業 SaaS、AI 基礎設施與工業軟體，單筆投資二十五萬至一百萬美元。',needs:'想認識有客戶驗證的 B2B 創業團隊，也願意交流商業模式；投資仍須完成正式評估。'},
 {id:'p07',name:'吳知遠',role:'旅遊平台創業者',focus:'Travel · Marketplace',intro:'我經營途伴，一個連結在地導覽者與旅客的平台。我實際做過雙邊市場冷啟動、供需媒合及旅行社通路合作，目前服務台灣與日本旅客。',needs:'想找日本在地通路夥伴，以及能交流平台供給成長的創業者。'},
 {id:'p08',name:'鄭沐辰',role:'日本市場顧問',focus:'Japan · Market Entry',intro:'我在日本工作八年，協助三家台灣 B2B 軟體公司建立日本經銷合作、設計日文提案與企業採購流程；能用日語進行商務協商。',needs:'想認識準備進入日本市場、已有穩定產品的團隊。'},
 {id:'p09',name:'葉星禾',role:'成長期投資人',focus:'Growth · Climate',intro:'我任職遠汐成長基金，專注 B 輪後的能源與氣候科技公司，單筆投資五百萬美元以上。我們不投 pre-seed。',needs:'想認識有跨國營收的能源科技團隊。'},
 {id:'p10',name:'顏書庭',role:'產品設計師',focus:'UX · Accessibility',intro:'我做過企業後台、無障礙表單與 SaaS 新手引導，熟悉使用者訪談及設計系統，也曾協助小型團隊重整產品資訊架構。',needs:'希望認識正在改善複雜工作流程的技術團隊，交流如何把功能變成容易理解的操作。'},
 {id:'p11',name:'何予澄',role:'社群活動策劃',focus:'Events · Community',intro:'我策劃技術社群聚會，設計過主題桌、主持人引導與活動後追蹤。我熟悉讓第一次見面的參加者開啟對話。',needs:'想找能改善活動配對與參加者體驗的產品團隊。'},
 {id:'p12',name:'李映安',role:'半導體研發主管',focus:'Semiconductor',intro:'我帶領晶片驗證團隊，熟悉硬體測試與供應鏈。我尚未經營公司，也没有醫療或企業 AI 導入經驗。',needs:'想了解創業與早期募資，目前是在探索階段。'},
 {id:'p13',name:'黃辰希',role:'教育產品創業者',focus:'EdTech · Platform',intro:'我建立課程與家教媒合平台，親自實作推薦、訂閱與內容管理。團隊現在需要把客服及教材上架流程自動化。',needs:'想認識能協助內部 AI 工作流程的團隊，也想和雙邊平台創業者交流供需成長。'},
 {id:'p14',name:'宋予安',role:'餐飲營運創業者',focus:'Retail · Operations',intro:'我經營幾間虛構的餐飲門市，最近正整合庫存與訂單。對我們來說，跨門市資料整理是自己的營運困難。',needs:'想找能串接訂單、庫存與內部報表的自動化服務，希望先確認資料與維護成本。'},
 {id:'p15',name:'趙以寧',role:'醫師與創業者',focus:'Clinical · Health',intro:'我是執業家醫科醫師，同時創立居家照護協作服務，親自參與臨床流程與診所試點。我能分享医療創業及導入經驗，但不會日語。',needs:'想認識醫療服務設計與照護科技團隊。'},
 {id:'p16',name:'高明澈',role:'遊戲開發者',focus:'Gaming',intro:'我開發手機解謎遊戲，平常喜歡玩棋類與一般策略遊戲。資料中沒有任何指定遊戲的遊玩經驗。',needs:'想找遊戲美術合作夥伴與玩家社群經營者。'},
 {id:'p17',name:'蕭映禾',role:'技術招募者',focus:'Talent · Recruiting',intro:'我協助企業招募工程師、安排面試與設計職缺內容。我不是軟體工程師，沒有親自開發 AI Agent。',needs:'想認識有招募需求的公司，以及可以交流的工程人才。'},
 {id:'p18',name:'梁可晴',role:'工程師與桌遊玩家',focus:'Engineering · Games',intro:'我是後端工程師，平常參加桌遊團，也固定玩《星港航線》這款虛構策略桌遊。我熟悉其資源交換與路線規劃規則。',needs:'希望在活動認識同樣玩《星港航線》的人，也願意交流後端架構。'},
 {id:'p19',name:'沈語川',role:'AI 研究者',focus:'Research · ML',intro:'我研究大型語言模型評估、檢索系統和資料品質，曾建立回答引用的驗證工具。我的主要經驗是研究與原型，尚未負責企業銷售。',needs:'想和實際部署 AI 產品的團隊交流，了解離線評估與真實使用的差距。'},
 {id:'p20',name:'杜子安',role:'行銷顧問',focus:'B2B · Marketing',intro:'我幫 B2B 軟體團隊做定位、內容與銷售線索培養，曾協助建立產品展示到客戶訪談的流程。',needs:'想認識已有產品、需要釐清目標客群的創業者。'},
 {id:'p21',name:'彭若晨',role:'物流營運主管',focus:'Logistics · Data',intro:'我負責物流公司的派車和報表流程。我們的客服要在多個系統間查詢運單，目前還沒有自己的軟體研發團隊。',needs:'正在找能整合查詢、建立內部知識庫及自動回覆的技術服務，但要先確認權限與資料安全。'},
 {id:'p22',name:'郭言希',role:'早期創業者',focus:'AI · Exploring',intro:'我剛開始探索 AI 產品，尚未開發產品、交付專案或取得客戶。',needs:'我想找企業 AI 客戶、ERP 工程師、投資人與日本市場顧問。這些都是我正在尋找的資源，不是我已具備的能力。'},
 {id:'p23',name:'林見川',role:'資料工程師',focus:'Data · Infrastructure',intro:'我實作過資料倉儲、文件清理、向量檢索及模型監控，擅長把凌亂的企業文件轉成可追溯的資料。',needs:'想認識正在建立企業知識庫的產品團隊，也想學習如何驗證使用者價值。'},
 {id:'p24',name:'卓予晴',role:'資安顧問',focus:'Security · Governance',intro:'我協助中小企業做存取權限、稽核紀錄和軟體供應商評估，曾參與雲端客服平台的導入審查。',needs:'想與做企業 AI 的團隊交流資料治理，讓自動化產品能通過客戶的內部審查。'},
];
export const people: Person[] = generatedPeople;
export const examples = [
 {label:'我適合認識誰？',background:'我是一位企業 AI 創業者，做 AI Agent、客服及訂單流程自動化。目前在台灣做早期試點，希望交流如何把專案變成可持續的產品。',query:'你覺得我適合認識誰？請告訴我為什麼，以及我們可以聊什麼。'},
 {label:'找到潛在客戶',background:'我的團隊提供企業內部客服、預約及訂單系統的 AI 自動化與整合服務。',query:'找自己的公司正需要這些服務的潛在客戶，不是只在賣相似產品的人。'},
 {label:'日本市場拓展',background:'我經營一個連結在地服務業者與旅客的早期平台，已在台灣營運。',query:'我想認識有實際日本 B2B 市場拓展經驗，能用日語交流的人。'},
 {label:'跨出產業標籤',background:'我是後端工程師，想在活動中認識有共同休閒興趣的人。',query:'有人也玩《星港航線》嗎？'},
];
