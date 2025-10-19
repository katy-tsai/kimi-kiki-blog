# 🖼 VSCode Markdown 圖片貼上指南

## 📋 目前設定狀態

✅ **已移除**: `markdown-drop-image` 自訂外掛
✅ **已停用**: VSCode 內建的 Markdown 圖片貼上功能（會產生錯誤的相對路徑）
✅ **已配置**: Paste Image 外掛（mushan.vscode-paste-image）

## 🎯 正確使用方式

### 方法：使用 Paste Image 外掛

**快捷鍵**: `Cmd+Alt+V` (Mac) 或 `Ctrl+Alt+V` (Windows)

**步驟**:
1. 截圖或複製圖片到剪貼簿
   - 截圖: `Cmd+Shift+4`
   - 或從 Finder 複製圖片: `Cmd+C`

2. 在 Markdown 檔案中按 `Cmd+Alt+V`

3. 圖片會自動:
   - 儲存到 `/public/images/YYYY-MM-DD-HH-mm-ss.png`
   - 插入語法: `![YYYY-MM-DD-HH-mm-ss](/images/YYYY-MM-DD-HH-mm-ss.png)`

## ⚠️ 注意事項

### ❌ 不要使用 `Cmd+V`

如果您使用普通的 `Cmd+V` 貼上圖片，VSCode 內建功能可能會:
- 產生錯誤的相對路徑: `../../public/images/xxx.png`
- 這個路徑在 Next.js 中無法正常顯示

### ✅ 正確路徑格式

- **正確**: `![](/images/screenshot.png)` 或 `![](/public/images/screenshot.png)`
- **錯誤**: `![](../../public/images/screenshot.png)`

## 🔧 當前設定

```json
{
  // 停用 VSCode 內建的圖片複製功能
  "markdown.copyFiles.destination": {},

  // Paste Image 外掛設定
  "pasteImage.path": "${projectRoot}/public/images",
  "pasteImage.prefix": "/images/",
  "pasteImage.insertPattern": "![${imageFileNameWithoutExt}](${prefix}${imageFileName})"
}
```

## 🐛 疑難排解

### 問題: 按 `Cmd+Alt+V` 沒反應

**解決方法**:
1. 確認已安裝 Paste Image 外掛:
   ```bash
   code --list-extensions | grep paste
   # 應該看到: mushan.vscode-paste-image
   ```

2. 如果沒有安裝，執行:
   ```bash
   code --install-extension mushan.vscode-paste-image
   ```

3. 重新載入 VSCode:
   - `Cmd+Shift+P` → "Reload Window"

### 問題: 仍然產生錯誤的相對路徑

**解決方法**:
1. 確認您使用的是 `Cmd+Alt+V`，不是 `Cmd+V`
2. 檢查 `.vscode/settings.json` 中的設定是否正確
3. 重新載入 VSCode 視窗

## 📝 快速參考

| 操作 | 快捷鍵 | 結果 |
|------|--------|------|
| 截圖 | `Cmd+Shift+4` | 截圖到剪貼簿 |
| 貼上圖片（正確） | `Cmd+Alt+V` | `![](/images/xxx.png)` |
| 貼上圖片（錯誤） | `Cmd+V` | `![](../../public/images/xxx.png)` ❌ |

## 🎉 完成

現在您可以:
1. 按 `Cmd+Shift+4` 截圖
2. 按 `Cmd+Alt+V` 貼上
3. 圖片會自動使用正確的路徑格式！

---

**更新日期**: 2025-10-18
