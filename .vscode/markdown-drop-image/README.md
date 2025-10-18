# Markdown Drop Image

拖拉圖片到 Markdown 編輯器時，自動將圖片複製到專案的 `/public/images` 目錄，並插入正確的 Markdown 語法。

## 功能特色

- 自動偵測拖拉圖片事件
- 圖片自動重新命名為時間戳格式（例如：`screenshot-2025-10-17-16-12-50.png`）
- 自動複製到 `/public/images` 目錄
- 自動插入 Markdown 圖片語法：`![](images/檔名.png)`
- 支援 PNG、JPG、JPEG、GIF、WEBP 格式

## 使用方式

1. 在 Markdown 檔案中編輯時
2. 直接拖拉圖片到編輯器
3. 圖片會自動複製並插入語法

## 需求

- VSCode 1.80.0 或更新版本

## 授權

MIT
