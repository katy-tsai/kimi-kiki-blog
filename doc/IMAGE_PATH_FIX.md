# Markdown 圖片路徑修正說明

## 問題描述

在 VSCode 中使用 Paste Image 擴充功能貼上圖片時，圖片路徑格式不一致，導致在 Next.js 中無法正確顯示。

## 解決方案

### 1. 修正 VSCode 設定

更新 [.vscode/settings.json](.vscode/settings.json)：

```json
{
  // 圖片儲存路徑
  "pasteImage.path": "${projectRoot}/public/images",

  // Markdown 插入路徑格式（使用 /images/ 路徑）
  "pasteImage.insertPattern": "![${imageFileNameWithoutExt}](/images/${imageFileName})",

  // 基礎路徑
  "pasteImage.basePath": "${projectRoot}",

  // 使用 Unix 風格路徑分隔符
  "pasteImage.forceUnixStyleSeparator": true,

  // 插入後不顯示確認輸入框
  "pasteImage.showFilePathConfirmInputBox": false
}
```

### 2. 增強 rehype-image-path 插件

更新 [lib/rehype-image-path.ts](lib/rehype-image-path.ts) 以支援多種路徑格式：

- `../../public/images/` → `/images/`（相對路徑）
- `/public/images/` → `/images/`（絕對路徑）
- `public/images/` → `/images/`（無前綴）

### 3. 更新現有 Markdown 文件

修正所有使用 `/public/images/` 路徑的 Markdown 文件：

- `hello-world.md`
- `HOW_TO_INSERT_IMAGES.md`
- `vscode_markdown_images.md`

將 `/public/images/` 改為 `/images/`

## 使用方式

### 貼上新圖片

1. 截圖或複製圖片（`Cmd+Shift+4` 或 `Cmd+C`）
2. 在 Markdown 編輯器中按 `Cmd+V`
3. 圖片會自動：
   - 儲存到 `public/images/` 目錄
   - 插入 Markdown 語法：`![圖片描述](/images/檔名.png)`

### 路徑格式規範

- ✅ **正確**：`![描述](/images/screenshot.png)`
- ❌ **錯誤**：`![描述](/public/images/screenshot.png)`

## 技術細節

### Next.js 靜態資源處理

Next.js 將 `public/` 目錄視為根目錄：

- 檔案系統路徑：`public/images/banner.png`
- 網頁訪問路徑：`/images/banner.png`

### rehype-image-path 處理流程

1. Markdown → MDAST（Markdown AST）
2. MDAST → HAST（HTML AST）
3. **rehype-image-path** 轉換 `<img>` 標籤的 `src` 屬性
4. HAST → HTML 字串

## 測試

訪問 http://localhost:3003 查看圖片是否正確顯示。

## 相關檔案

- [.vscode/settings.json](.vscode/settings.json) - VSCode 設定
- [lib/rehype-image-path.ts](lib/rehype-image-path.ts) - 圖片路徑轉換插件
- [contentlayer.config.ts](contentlayer.config.ts) - Contentlayer 配置
