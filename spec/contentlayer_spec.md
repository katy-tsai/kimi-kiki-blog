## FEATURE:

從 Markdown Parser 改為 Contentlayer

## DOCUMENTATION:
將原本以手動 gray-matter + remark 處理的 Markdown 檔案內容，全面改為由 Contentlayer 管理與生成靜態內容資料
- 確保 PlantUML 和圖片路徑處理功能正常
- 支援 GFM (GitHub Flavored Markdown) 的解析器

---

## PRP 資訊

**PRP 檔案位置**: `PRPs/migrate-to-contentlayer.md`
**生成時間**: 2025-10-18
**信心評分**: 8/10
**預估時間**: 2-3 小時

### 重要提醒

1. **使用 Contentlayer2**: 必須使用 `contentlayer2` 和 `next-contentlayer2`（fork 版本），原版不支援 Next.js 15
2. **保留功能**: PlantUML 渲染、圖片路徑轉換、TOC 生成
3. **新增依賴**: remark-gfm, rehype-slug
4. **自訂插件**: 需建立 rehype-image-path.ts 處理圖片路徑轉換

### 執行步驟概要

1. 安裝 contentlayer2 相關套件
2. 建立 contentlayer.config.ts
3. 建立自訂 rehype 插件
4. 更新 Next.js 和 TypeScript 配置
5. 重構 lib/posts.ts
6. 更新所有頁面組件
7. 刪除舊的 lib/markdown.ts
8. 測試與驗證

詳細實作步驟請參閱 PRP 文件。