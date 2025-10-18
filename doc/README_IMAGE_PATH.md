# 圖片路徑處理機制說明

## 🎯 問題背景

在 Next.js + Markdown 專案中，圖片路徑面臨以下挑戰：

| 環境 | 需要的路徑 | 原因 |
|------|-----------|------|
| **VSCode Markdown Preview** | `/public/images/xxx.png` | 相對於工作區根目錄 |
| **Next.js Runtime** | `/images/xxx.png` | Next.js 自動映射 `public/` 目錄到根路徑 |

如果只使用一種路徑，就會導致另一個環境無法正常顯示圖片。

---

## ✅ 解決方案

採用**自動路徑轉換機制**：

1. **Markdown 檔案中**：使用 `/public/images/` 路徑
2. **渲染時自動轉換**：轉換成 `/images/` 給 Next.js 使用

這樣兩邊都能正常顯示！

---

## 🔧 實作細節

### 1. Markdown 處理函數

在 [lib/markdown.ts](./markdown.ts) 中新增路徑轉換函數：

```typescript
/**
 * Transform image paths from /public/images/ to /images/
 *
 * Reason: Allow markdown files to use /public/images/ for editor preview,
 * while Next.js uses /images/ for runtime. This provides compatibility
 * between markdown preview and Next.js static file serving.
 */
function transformImagePaths(html: string): string {
  // Match img tags with src="/public/images/..." and transform to "/images/..."
  return html.replace(
    /(<img[^>]*src=["'])\/public\/images\//gi,
    '$1/images/'
  )
}
```

### 2. 整合到處理流程

在 `parseMarkdown` 函數中呼叫：

```typescript
export async function parseMarkdown(content: string): Promise<ParsedMarkdown> {
  // ... 其他處理 ...

  let htmlContent = processedContent.toString()

  // Add IDs to headings
  htmlContent = addHeadingIds(htmlContent)

  // Transform image paths from /public/images/ to /images/
  htmlContent = transformImagePaths(htmlContent)

  return {
    frontmatter: data as PostFrontmatter,
    content: markdownContent,
    html: htmlContent,
  }
}
```

### 3. VSCode 設定

在 [.vscode/settings.json](../.vscode/settings.json) 中設定：

```json
{
  "pasteImage.prefix": "/public/images/",
  "markdown.preview.baseUrl": "${workspaceFolder}/public"
}
```

---

## 📝 使用範例

### Markdown 檔案中的寫法

```markdown
---
title: 我的文章
---

## 內容

這是一張圖片：

![截圖說明](/public/images/2025-10-17-16-30-45.png)
```

### VSCode Preview 顯示

VSCode 會正確讀取：
```
/public/images/2025-10-17-16-30-45.png
```

### Next.js 渲染結果

轉換後的 HTML：
```html
<img src="/images/2025-10-17-16-30-45.png" alt="截圖說明">
```

Next.js 會正確映射到 `public/images/2025-10-17-16-30-45.png`

---

## 🎯 優點

| 優點 | 說明 |
|------|------|
| ✅ **VSCode Preview 正常** | Markdown Preview 可正確顯示圖片 |
| ✅ **Next.js 正常渲染** | 網站上圖片可正確載入 |
| ✅ **自動轉換** | 無需手動維護兩套路徑 |
| ✅ **統一規範** | 所有 Markdown 檔案使用相同路徑格式 |
| ✅ **易於維護** | 路徑轉換邏輯集中在一處 |

---

## 📋 注意事項

1. **所有 Markdown 檔案**都應使用 `/public/images/` 路徑
2. **不要混用**兩種路徑格式
3. 如果手動編輯 Markdown，記得使用 `/public/images/` 前綴
4. 圖片檔案實際存放位置：`public/images/`

---

## 🔍 測試方法

### 測試 VSCode Preview

1. 開啟任一 `.md` 檔案
2. 按 `Cmd+K V` 開啟 Preview
3. 確認圖片正常顯示

### 測試 Next.js 渲染

1. 啟動開發伺服器：`npm run dev`
2. 瀏覽文章頁面
3. 確認圖片正常載入（檢查瀏覽器 DevTools）

---

## 🛠️ 疑難排解

### 問題：VSCode Preview 顯示不出圖片

**檢查 1**：確認 `.vscode/settings.json` 設定
```json
{
  "markdown.preview.baseUrl": "${workspaceFolder}/public"
}
```

**檢查 2**：確認圖片路徑使用 `/public/images/` 前綴

### 問題：Next.js 網站顯示不出圖片

**檢查 1**：開啟瀏覽器 DevTools Network 面板，查看圖片請求路徑

**檢查 2**：確認圖片檔案存在於 `public/images/` 目錄

**檢查 3**：確認 `lib/markdown.ts` 的 `transformImagePaths` 函數有被呼叫

---

## 📚 相關檔案

- [lib/markdown.ts](./markdown.ts) - Markdown 處理與路徑轉換
- [.vscode/settings.json](../.vscode/settings.json) - VSCode 設定
- [content/posts/HOW_TO_INSERT_IMAGES.md](../content/posts/HOW_TO_INSERT_IMAGES.md) - 圖片插入完整指南

---

## 🎉 總結

透過這個自動路徑轉換機制，我們成功解決了 Markdown Preview 和 Next.js 之間的路徑不一致問題，讓開發體驗更加順暢！

**記住**：Markdown 中永遠使用 `/public/images/` 路徑，系統會自動處理轉換。
