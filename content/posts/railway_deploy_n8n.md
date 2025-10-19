---
title: 新手指南：在 Railway 上快速部署 n8n
excerpt: 使用 Railway部署 N8N 步驟詳解
date: 2025-10-19
tags: 
 - Railway
 - n8n
author: 
  name: kimi-kiki
  link: /images/avatar.jpg
featured: false
---

## 一、 註冊 Railway 帳號

- 前往 https://railway.app
- 點擊「Login with GitHub」
- 授權 Railway 連接您的 GitHub
- ✅ 新用戶自動獲得 $5 試用額度

> 未來可升級到 Hobby 方案
> 免費測試：
    - 用 Render 免費方案測試靜態網站
    - 用 Railway Trial（$5 額度）測試 n8n
如果您想長期運行 n8n：
    - Railway Hobby - $5/月起（最便宜）
    - Render Starter + DB - $13/月（穩定但較貴）
    - DigitalOcean VPS - $6/月（需要自己設定）

## 二、一鍵部署 n8n
### 使用 Railway 官方模板

step1:  登入 Railway 後，點擊 「New Project」
step2: 在搜尋框輸入 「n8n」
step3: 選擇以下其中一個模板：
`推薦選擇：`

- 「N8N (w/ worker)」 - 適合一般使用
- 「N8N (w/ webhook processors)」 - 如果需要大量使用 Webhook


step4: 點擊 「Deploy」 按鈕
step5: Railway 會自動部署以下組件：
✅ n8n 主服務
✅ PostgreSQL 資料庫
✅ Redis（用於任務佇列）
✅ Worker（可選，用於處理工作流程）

## 三、 等待部署完成
- 部署通常需要 1-3 分鐘
- 您會看到 4-5 個服務同時部署：
   *  primary - n8n 主服務
   *  postgres - 資料庫
   *  redis - 快取和佇列
   *  worker - 工作處理器（如果選擇了 worker 版本）
   ![alt txt](/public/images/20251019-174209.png)

## 四、獲取訪問網址
- 在 Railway 專案中，點擊 「primary」 服務
  ![alt txt](/public/images/20251019-175013.png)
- 前往 「Settings」 標籤
- 在 「Networking」 區域：
    Railway 會自動生成一個公開網址 ，可以修改domain
    點擊即可開啟

    ![alt txt](/public/images/20251019-174938.png)

## 五、訪問網址即可開啟N8N, 設定頁面
![alt txt](/public/images/20251019-174815.png)

設定完成後，即可登入

![alt txt](/public/images/20251019-175902.png)