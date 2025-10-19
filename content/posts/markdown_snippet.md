---
title: 用 VS Code 寫 Blog Markdown 文章？先設定這個模板！
excerpt: vscode 建立 Markdown 模板
date: 2025-10-19
tags: 
 - Markdown
 - VsCode
author: 
  name: kimi-kiki
  link: /images/avatar.jpg
featured: false
---

## Step1: 打開使用者 Snippet 設定
`Ctrl + Shift + P`（或 `Cmd + Shift + P`）
搜尋：Preferences: Configure User Snippets
![Snippet 設定](/public/images/20251019-180609.png)

## Step2: 選擇語言 markdown.json
![選擇語言](/public/images/20251019-180928.png)

## Step3: 新增自訂模板
在打開的 JSON 中加入範例： (把想建立的模板，以每行字串方式，寫在body 陣列中)
```json
{
	"Tech Blog Template": {
		"prefix": "blog",
		"body": [
			"---",
			"title: ${1:文章標題}",
			"excerpt: ${2:文章摘要}",
			"date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}",
			"tags: ",
			" - ${3:標籤}",
			" - ${4:標籤}",
			"author: ",
			"  name: kimi-kiki",
			"  link: /images/avatar.jpg",
			"featured: false",
			"---"
		],
		"description": "建立一篇blog Markdown 模板"
	}
}

```

## Step 4: 使用模板
新增一個 .md 檔案
輸入 blog → 按下 Tab
自動插入整份模板
![模板](/public/images/20251019-181337.png)
![blog markdown](/public/images/20251019-181413.png)