---
title: VS Code Markdown 寫作神技：一秒貼上截圖、即時生成 Markdown 圖片語法
excerpt: Vscode Markdown 圖片插入功能
date: 2025-10-18
tags:
  - Image
  - Markdown
  - VsCode
author:
  name: kimi-kiki
  avatar: /images/avatar.jpg
featured: true
---

> 自從用AI 建立Next.js + Markdown的部落格後，發現在Vscode 寫 Markdown 很方便，但卻仍然有一些痛點，每次插圖，都需存檔然後移動到public/images的資料夾,再手動打 Markdown的語法，實在太麻煩了，所以又想問問AI 是否有辦法解決這個問題


## 一、安裝外掛

Ai提供的建議有兩個:
- Markdown Image : 主要功能可拖拉圖片到md檔->但目前測試皆不成功，拖拉圖片只會另開頁籤  
- Paste Image  :複製圖片或截圖，按cmd+v會將圖片放到指定目錄下，且生成 圖片的md語法．


在 VSCode 中安裝 **Paste Image** 擴充功能：

```bash
# 方法 A：使用指令安裝
code --install-extension mushan.vscode-paste-image

# 方法 B：在 VSCode 中手動安裝
# 1. 按 Cmd+Shift+X 開啟擴充功能面板
# 2. 搜尋 "Paste Image"
# 3. 點擊「安裝」
```


## 二、設定路徑 

#### 方法1: 
在專案下的.vscode/settings.json` 設定

```json
{
  // ========================================
  // Markdown 編輯器設定
  // ========================================
  // Markdown 檔案自動換行
  "[markdown]": {
    "editor.wordWrap": "on",
    "editor.quickSuggestions": {
      "comments": "on",
      "strings": "on",
      "other": "on"
    }
  },
  // ---------- Paste Image 設定（貼上時觸發） ----------
  // 圖片儲存路徑
  "pasteImage.path": "${projectRoot}/public/images",
  // Markdown 插入路徑格式（使用 /images/ 路徑，與 Next.js 靜態資源路徑一致）
  "pasteImage.insertPattern": "![alt txt](/public/images/${imageFileName})",
  // 基礎路徑
  "pasteImage.basePath": "${projectRoot}",
  // 使用 Unix 風格路徑分隔符（前斜線）
  "pasteImage.forceUnixStyleSeparator": true,
  // 插入後不顯示確認輸入框（直接插入）
  "pasteImage.showFilePathConfirmInputBox": false,
  "pasteImage.encodePath": "urlEncodeSpace",
  //預設檔名格式
  "pasteImage.defaultName": "YYYYMMDD-HHmmss",
}
```

#### 方法2:
到 Preferences -> Settings
到對應的參數下設定
![2025-10-19-09-16-08](/public/images/2025-10-19-09-16-08.png)
![2025-10-19-09-19-00](/public/images/2025-10-19-09-19-00.png)
## 三、重新載入 VSCode 視窗
1. 按 `Cmd+Shift+P` 開啟命令面板
2. 輸入 "Reload Window"
3. 按 Enter
![2025-10-19-09-20-13](/public/images/2025-10-19-09-20-13.png)


## 四、使用方式
重新載入 VSCode 後，複製圖片就可以`Cmd+Option+V` 貼到 markdown 裡！
### Step 1：準備圖片到剪貼簿
**選項 A - 截圖**（最常用）
```
Mac:     Cmd+Shift+4（截取區域）
         Cmd+Shift+3（截取全螢幕）
Windows: Win+Shift+S
```
實測:截圖後，要開啟圖檔複製， 按 `Cmd+C`（Mac）或 `Ctrl+C`（Windows）
**選項 B - 複製圖片檔案**
1. 在 Finder 或檔案總管中選擇圖片
2. 按 `Cmd+C`（Mac）或 `Ctrl+C`（Windows）

### Step 2：在 Markdown 中貼上

1. 開啟任何 `.md` 檔案
2. 將游標移到要插入圖片的位置
3. 按快捷鍵：
   - **Mac**:  `Cmd+Option+V`
   - **Windows/Linux**: `Ctrl+Alt+V`
  
### Step 3：完成
圖片會自動：
- `Cmd+Option+V`
  - 儲存到 `/public/images/20251019-095329.png`
  - 插入 Markdown：`![alt txt](/public/images/20251019-095329.png)`
- `Cmd+V`
 - 儲存到 `/public/images/image-n.png`
 - 插入 Markdown：`![alt txt](../../public/images/image-n.png)`
  

>用Cmd+V 也可以成功貼上但檔名和路徑會是依vscode 設定 


## 五、 vscode 設定欄位整理
| 設定鍵名                                              | 功能說明                                     | 可用變數 / 值                                                      | 範例設定                                           | 建議值                                  |
| :---------------------------------------------------- | :------------------------------------------- | :----------------------------------------------------------------- | :------------------------------------------------- | :-------------------------------------- |
| **`pasteImage.path`**                                 | 圖片儲存的實體路徑（相對或絕對）             | `${currentFileDir}`, `${projectRoot}`                              | `"${projectRoot}/public/images"`                   | ✅ 建議存入 `/public/images`             |
| **`pasteImage.basePath`**                             | 計算 Markdown 中相對路徑的基準目錄           | `${currentFileDir}`, `${projectRoot}`                              | `"${projectRoot}"`                                 | 通常與 `projectRoot` 相同               |
| **`pasteImage.prefix`**                               | 貼入 Markdown 時，圖片路徑前的前綴字串       | 任意字串                                                           | `"/public/images/"`                                | ✅ 讓路徑顯示為 `/public/images/xxx.png` |
| **`pasteImage.suffix`**                               | 貼入 Markdown 時，圖片路徑後的後綴字串       | 任意字串                                                           | `""`                                               | 保持空白                                |
| **`pasteImage.defaultName`**                          | 預設圖片檔名（無原始檔名時使用）             | Moment.js 格式字串（如 `YYYYMMDD-HHmmss`）或 extension 支援的變數  | `"YYYYMMDD-HHmmss"`                                | ✅ 用時間避免重名                        |
| **`pasteImage.namePrefix`**                           | 在圖片檔名前加的前綴                         | 任意字串                                                           | `""`                                               | 保持空白                                |
| **`pasteImage.nameSuffix`**                           | 在圖片檔名後加的後綴                         | 任意字串                                                           | `""`                                               | 保持空白                                |
| **`pasteImage.encodePath`**                           | 是否對檔名進行 URL 編碼                      | `"none"`, `"urlEncode"`, `"urlEncodeSpace"`                        | `"urlEncodeSpace"`                                 | ✅ 可避免空格錯誤                        |
| **`pasteImage.forceUnixStyleSeparator`**              | 強制使用 `/` 作為路徑分隔符號                | `true` / `false`                                                   | `true`                                             | ✅ 建議開啟                              |
| **`pasteImage.showFilePathConfirmInputBox`**          | 貼上時是否彈出視窗確認儲存路徑與檔名         | `true` / `false`                                                   | `false`                                            | 若想手動命名可設為 `true`               |
| **`pasteImage.filePathConfirmInputBoxMode`**          | 視窗顯示模式                                 | `"fileName"`, `"fullPath"`                                         | `"fullPath"`                                       | 預設即可                                |
| **`pasteImage.insertPattern`**                        | 插入 Markdown 的格式樣板                     | `${imageSyntaxPrefix}`, `${imageFilePath}`, `${imageSyntaxSuffix}` | `"![${imageFileName}](${prefix}${imageFileName})"` | ✅ 產出標準 `![alt](path)` 格式          |
| **`pasteImage.pathConfirmInputBoxMode`**              | (部分版本相同於上者)                         | `"fullPath"`                                                       | `"fullPath"`                                       | 同上                                    |
| **`pasteImage.forceSetPasteStyleToUnix`**             | 舊版別名，用於強制 `/`                       | `true` / `false`                                                   | `true`                                             | ✅ 建議開                                |
| **`pasteImage.nameEncodePath`**                       | 舊版設定，同 `encodePath`                    | `"none"` / `"urlEncode"`                                           | `"urlEncodeSpace"`                                 | 視版本支援                              |
| **`markdown.editor.pasteUrlAsFormattedLink.enabled`** | 是否自動將貼上網址轉成 `[文字](url)`         | `true` / `false`                                                   | `true`                                             | ✅ Markdown 編輯建議開啟                 |
| **`markdown.editor.updateLinksOnPaste.enabled`**      | 貼上含鏈結文字時，自動更新路徑               | `true` / `false`                                                   | `true`                                             | ✅ 讓複製的相對路徑自動修正              |
| **`ipynb.pasteImagesAsAttachments.enabled`**          | 在 Jupyter Notebook Markdown cell 貼圖為附件 | `true` / `false`                                                   | `true`                                             | 僅對 `.ipynb` 有效                      |


- 可用變數（部分 extension 支援 )
  
| 變數                           | 說明                                   |
| :----------------------------- | :------------------------------------- |
| `${currentFileDir}`            | 目前編輯的 Markdown 檔案所在資料夾路徑 |
| `${projectRoot}`               | 專案根目錄（workspace root）           |
| `${currentFileName}`           | 當前檔案名（含副檔名）                 |
| `${currentFileNameWithoutExt}` | 當前檔案名（不含副檔名）               |
| `${imageFilePath}`             | 貼上圖片的最終完整相對路徑             |
| `${imageFileName}`             | 圖片檔名（含副檔名）                   |
| `${imageFileNameWithoutExt}`   | 圖片檔名（不含副檔名）                 |
| `${imageSyntaxPrefix}`         | Markdown 開頭語法（預設 `![](`）       |
| `${imageSyntaxSuffix}`         | Markdown 結尾語法（預設 `)`）          |
