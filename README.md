# Boba Connect

Boba Tech 的活動交流媒合 Demo：讓參加者知道適合認識誰、理由與第一句話。

- Demo: https://boba-connect.stan954054.chatgpt.site
- 技術與資料說明: https://boba-connect.stan954054.chatgpt.site/architecture
- BUILDMODE 2026 / AI Agents & Automation / T066

## 功能

172 位參加者的匿名化概括摘要及預先媒合。評審也可填自己的背景與需求，實際呼叫 OpenAI。右側顯示 API 執行階段、語意檢索候選、來源核對進度與判定摘要；動畫只在請求執行時出現。

## 本機執行

需要 Node.js 24（支援原生 TypeScript stripping）與 npm。

```sh
npm ci
```

自行建立 `.env.local`，填入 `OPENAI_API_KEY` 與選用的 `OPENAI_MODEL=gpt-5-mini`。不要提交該檔案。

```sh
npm run dev
npx tsc --noEmit
node --experimental-strip-types --test lib/validation.test.ts
npm run build
```

若沒有 API key，仍可瀏覽預先媒合；即時搜尋需要伺服器端 key。建立完整匿名資料所需的私人來源及對照表刻意不包含在公開 repo。`scripts/precompute.mjs` 可以用已公開摘要重新產生預先媒合，會產生 API 費用。

## 架構與限制

React + Vinext / Cloudflare Workers。即時流程：結構化需求理解 → OpenAI text-embedding-3-small（512 維）→ 語意與文字排名融合 → 最多 20 位候選 → gpt-5-mini 分兩批核對 → 逐字驗證引用 → 最多 6 位推薦。引用或候選覆蓋錯誤最多修復一次；仍失敗則回傳錯誤。NDJSON 串流呈現真實事件，沒有預錄的假進度。

預先媒合用本人摘要向量檢索其餘 171 人，將 20 位候選交給模型選出至多 5 位並驗證引用。這條批次路徑沒有逐人生成淘汰理由，也沒有執行即時需求規劃；未入選者不等於不適合。前端清楚標示讀取預先結果時零模型呼叫。有限候選檢索不保證全池召回。判定摘要不是模型內部思考逐字稿；推薦不是投資、採購或會面的承諾。

## 資料與隱私

公開資料是 172 位活動參加者資料的概括改寫，移除姓名、組織、產品、聯絡方式、精確數字、雇主經歷與可識別細節。不是只換名字，也不是本人逐字原文；不得據此重建真實身分。部分資料只保留廣泛表單分類。引用驗證針對公開摘要。概括化會降低資訊量，不能宣稱不可再識別或完全保留原始媒合品質。

使用者即時输入送往 OpenAI，Responses API 使用 `store:false`；應用不把輸入寫入公开名單。供應商與託管平台仍適用自身資料處理政策。key 僅伺服器端使用。Demo 的每 IP 限流為記憶體內的 best-effort 實作，跨 Worker 不保證全域一致；正式使用需持久配額、存取控制及同意撤回流程。

## 既有成果揭露

Boba Connect 是為 Boba Tech 活動交流需求開發的獨立 AI 媒合模組，目標是讓參加者在活動前知道適合認識誰、為什麼，以及如何開始交流。本次以可獨立操作的公開 Demo 呈現，後續預計整合至 Boba Tech 的會員平台。

本次於 2026-09-06 為黑客松新增的實作包含雙欄互動展示、公開匿名化摘要與預先媒合結果、自填背景與需求的即時 API 流程、引用驗證，以及獨立部署。產品背景、設計色彩與媒合方法承接 Boba Tech 的既有探索；先前已有本機 AI 搜尋／媒合實驗。本次將這些探索發展為可公開試用的獨立模組。

Boba Tech 原有的報名、名錄、人物頁與規則式推薦提供後續整合場景，屬於既有平台功能，不列入本次新增開發範圍。正式會員整合尚未完成。

## License

程式碼採 MIT（見 LICENSE）。Boba Tech 名稱與品牌標識不因程式碼授權移轉商標權。匿名示範摘要僅供此 Demo 評估，請勿用於身分比對或聯繫原始參加者。
