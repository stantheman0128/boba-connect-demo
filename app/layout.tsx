import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Boba Tech Demo · 有理由開始的對話',description:'匿名化參加者名錄、預先配對與即時 AI 配對流程。BUILDMODE 2026。'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-Hant" className="dark"><body>{children}</body></html>}
