---
title: Markdown 圖片插入完整指南
excerpt: 測試Vscode Markdown 圖片插入功能
date: 2025-10-16
tags:
  - Test
  - Markdown
author:
  name: kimi-kiki
  avatar: /images/avatar.jpg
---


## 🎯 方法總覽

| 方法           | 適用場景         | 快捷鍵      | 優點   |
| -------------- | ---------------- | ----------- | ------ |
| **快捷鍵貼上** | 截圖、剪貼簿圖片 | `Cmd+Alt+V` | 最快速 |
| **拖拉圖片**   | 現有圖片檔案     | 無          | 最直覺 |

---

## ⭐ 方法 1：快捷鍵貼上（推薦）

### 📋 前置準備

#### 1. 安裝擴充功能

在 VSCode 中安裝 **Paste Image** 擴充功能：

```bash
# 方法 A：使用指令安裝
code --install-extension mushan.vscode-paste-image

# 方法 B：在 VSCode 中手動安裝
# 1. 按 Cmd+Shift+X 開啟擴充功能面板
# 2. 搜尋 "Paste Image"
# 3. 點擊「安裝」
```

#### 2. 設定已完成 ✅

`.vscode/settings.json` 已包含以下設定：

```json
{
  "pasteImage.path": "${projectRoot}/public/images",
  "pasteImage.basePath": "${projectRoot}",
  "pasteImage.prefix": "/public/images/",
  "pasteImage.insertPattern": "![${imageFileNameWithoutExt}](${prefix}${imageFileName})",
  "pasteImage.defaultName": "Y-MM-DD-HH-mm-ss",
  "pasteImage.showFilePathConfirmInputBox": false
}
```

**重要設定說明**：
- `pasteImage.path`：圖片儲存到 `public/images/` 目錄
- `pasteImage.basePath`：設為專案根目錄，確保路徑正確
- `pasteImage.prefix`：Markdown 中使用 `/public/images/` 前綴（**更新**）
- `pasteImage.insertPattern`：自動插入完整的 Markdown 語法
- `showFilePathConfirmInputBox: false`：不顯示確認對話框，直接插入

> **⚠️ 路徑重要說明**：
> - Markdown 檔案中使用 `/public/images/` 路徑
> - VSCode Markdown Preview 會正常顯示
> - Next.js 渲染時會自動轉換成 `/images/`（透過 `lib/markdown.ts` 處理）

---

### 🚀 使用步驟

#### 步驟 1：準備圖片到剪貼簿

**選項 A - 截圖**（最常用）
```
Mac:     Cmd+Shift+4（截取區域）
         Cmd+Shift+3（截取全螢幕）
Windows: Win+Shift+S
```

**選項 B - 複製圖片檔案**
1. 在 Finder 或檔案總管中選擇圖片
2. 按 `Cmd+C`（Mac）或 `Ctrl+C`（Windows）

#### 步驟 2：在 Markdown 中貼上

1. 開啟任何 `.md` 檔案
2. 將游標移到要插入圖片的位置
3. 按快捷鍵：
   - **Mac**: `Cmd+V` 
   - **Windows/Linux**: `Ctrl+Alt+V`

#### 步驟 3：完成！

✅ 圖片會自動：
- 儲存到 `/public/images/2025-10-17-16-30-45.png`
- 插入 Markdown：`![2025-10-17-16-30-45](/public/images/2025-10-17-16-30-45.png)`

---

### 📝 完整範例

**操作流程**：
1. 按 `Cmd+Shift+4` 截圖
2. 在 Markdown 中按 `Cmd+Alt+V`
3. 自動插入以下內容：

```markdown
# 我的技術文章

這是內文。

![2025-10-17-16-30-45](/public/images/2025-10-17-16-30-45.png)

圖片已插入！
```

**手動優化（建議）**：
為圖片添加有意義的替代文字（Alt Text）：

```markdown
![網站首頁截圖展示](/public/images/2025-10-17-16-30-45.png)
```

這對 **SEO** 和 **無障礙訪問** 都很重要！

---

## 🖱️ 方法 2：拖拉圖片

### 使用步驟

1. 從 Finder 或檔案總管選擇圖片檔案
2. **拖拉**圖片到 Markdown 編輯器中
3. 放開滑鼠

### 結果

VSCode 會自動：
- 複製圖片到 `/public/images/`
- 插入 Markdown 語法

### 相關設定

```json
{
  "markdown.copyFiles.destination": {
    "**/*.md": "/public/images/"
  }
}
```

---

## 🔧 疑難排解

### ❌ 快捷鍵按了沒反應

#### 檢查 1：確認擴充功能已安裝
```bash
code --list-extensions | grep paste
# 應該看到：mushan.vscode-paste-image
```

#### 檢查 2：確認剪貼簿有圖片
先按 `Cmd+Shift+4` 截圖，再按 `Cmd+Alt+V`

#### 檢查 3：重新載入 VSCode
1. 按 `Cmd+Shift+P` 開啟命令面板
2. 輸入 "Reload Window"
3. 按 Enter

#### 檢查 4：確認快捷鍵綁定
1. 按 `Cmd+K Cmd+S` 開啟快捷鍵設定
2. 搜尋 "Paste Image"
3. 確認快捷鍵是 `Cmd+Alt+V`

---

### ❌ 圖片儲存到錯誤位置（如 `.vscode/public/images/`）

**原因**：`pasteImage.basePath` 設定錯誤

**解決方案**：
確認 `.vscode/settings.json` 中的設定：

```json
{
  "pasteImage.basePath": "${projectRoot}",  // ← 必須是專案根目錄
  "pasteImage.path": "${projectRoot}/public/images"
}
```

修改後，重新載入 VSCode（`Cmd+Shift+P` → "Reload Window"）

---

### ❌ 插入的是純文字路徑，不是 Markdown 語法

**錯誤範例**：
```
${prefix}2025-10-17-16-30-45.png
```

**原因**：`pasteImage.insertPattern` 設定錯誤

**解決方案**：
確認設定：

```json
{
  "pasteImage.insertPattern": "![${imageFileNameWithoutExt}](${prefix}${imageFileName})"
}
```

---

## 💡 進階使用技巧

### 1. 自訂檔名格式

編輯 `.vscode/settings.json`：

```json
{
  // 時間戳記格式（目前設定）
  "pasteImage.defaultName": "Y-MM-DD-HH-mm-ss",

  // 其他格式範例：
  // "pasteImage.defaultName": "image-${currentFileNameWithoutExt}-Y-MM-DD-HH-mm-ss",
  // "pasteImage.defaultName": "screenshot-Y-MM-DD",
}
```

### 2. 啟用檔名確認對話框

如果想在貼上時手動修改檔名：

```json
{
  "pasteImage.showFilePathConfirmInputBox": true
}
```

貼上後會彈出輸入框，可以修改檔名。

### 3. 批次插入多張圖片

連續按 `Cmd+Alt+V` 可插入多張圖片：
1. 截圖 → `Cmd+Alt+V`
2. 再截圖 → `Cmd+Alt+V`
3. 繼續...

### 4. 圖片命名最佳實踐

手動編輯 Alt Text，使用有意義的描述：

```markdown
✅ 好的範例：
![使用者登入表單介面](/public/images/2025-10-17-16-30-45.png)
![網站架構圖](/public/images/2025-10-17-16-31-20.png)

❌ 不好的範例：
![](/public/images/2025-10-17-16-30-45.png)
![圖片](/public/images/2025-10-17-16-31-20.png)
```

---

## 🎯 快速測試

**立即測試功能是否正常！**

1. 按 `Cmd+Shift+4` 截取螢幕任意區域
2. 開啟 [IMAGE_PASTE_TEST.md](IMAGE_PASTE_TEST.md)
3. 按 `Cmd+Alt+V`
4. 確認圖片已插入

**預期結果**：
- ✅ 檔案儲存在 `public/images/2025-10-17-XX-XX-XX.png`
- ✅ Markdown 插入：`![2025-10-17-XX-XX-XX](/public/images/2025-10-17-XX-XX-XX.png)`

---

## ❓ 常見問題 FAQ

### Q1: 圖片檔名可以包含中文嗎？

可以，但**不建議**。設定中已啟用 `urlEncode` 編碼，但為了相容性，建議使用英文數字命名。

### Q2: 圖片會壓縮嗎？

不會。原始圖片會直接複製到 `public/images/`，保持原始品質。

### Q3: 可以修改預設儲存路徑嗎？

可以！編輯 `.vscode/settings.json`：

```json
{
  "pasteImage.path": "${projectRoot}/public/assets/images",  // 改成其他路徑
  "pasteImage.prefix": "/assets/images/"  // 對應修改前綴
}
```

### Q4: 支援哪些圖片格式？

支援所有常見格式：`.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`

### Q5: 圖片太大怎麼辦？

建議使用圖片壓縮工具：
- [TinyPNG](https://tinypng.com/)（線上壓縮）
- [ImageOptim](https://imageoptim.com/)（Mac App）
- [Squoosh](https://squoosh.app/)（Google 工具）

---

## 📚 相關設定檔案

- **擴充功能設定**：[.vscode/settings.json](.vscode/settings.json)
- **測試檔案**：[.vscode/IMAGE_PASTE_TEST.md](IMAGE_PASTE_TEST.md)
- **圖片目錄**：`/public/images/`

---

## 🔄 完整設定參考

```json
{
  // ========================================
  // Paste Image 擴充功能設定
  // ========================================

  "pasteImage.path": "${projectRoot}/public/images",
  "pasteImage.basePath": "${projectRoot}",
  "pasteImage.prefix": "/public/images/",
  "pasteImage.insertPattern": "![${imageFileNameWithoutExt}](${prefix}${imageFileName})",
  "pasteImage.defaultName": "Y-MM-DD-HH-mm-ss",
  "pasteImage.namePrefix": "",
  "pasteImage.nameSuffix": "",
  "pasteImage.showFilePathConfirmInputBox": false,
  "pasteImage.encodePath": "urlEncode",

  // ========================================
  // Markdown 圖片拖拉設定（VSCode 內建）
  // ========================================

  "markdown.copyFiles.destination": {
    "**/*.md": "/public/images/"
  },
  "editor.dragAndDrop": true
}
```

---

## 🎉 開始使用

**一切準備就緒！**

現在您可以：
1. 截圖：`Cmd+Shift+4`
2. 貼上：`Cmd+Alt+V`
3. 完成：圖片自動插入 ✨

**Happy writing!** 🚀
