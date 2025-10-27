# 🚀 SEO 快速上手指南

> 5 分鐘了解如何確保你的部落格內容可被搜尋引擎索引

## ✅ 已完成的優化

你的部落格**已經完全 SEO 優化**！所有頁面都使用 SSG（Static Site Generation），內容在 build time 就會被預渲染成 HTML。

### 主要改進

1. **首頁優化** ([app/page.tsx](app/page.tsx))
   - ✅ 移除 `HomeContent` Client Component 包裝
   - ✅ 文章列表直接在 Server Component 中渲染
   - ✅ 搜尋功能改為漸進增強（不影響 SEO）
   - ✅ 設定 `export const dynamic = 'force-static'`

2. **文章頁優化** ([app/posts/[slug]/page.tsx](app/posts/[slug]/page.tsx))
   - ✅ 使用 `generateStaticParams()` 預渲染所有文章
   - ✅ 使用 `generateMetadata()` 提供完整 SEO meta tags
   - ✅ 新增 OpenGraph metadata 支援社群分享
   - ✅ 設定 `export const dynamic = 'force-static'`

3. **標籤頁優化**
   - ✅ 標籤列表頁 ([app/tags/page.tsx](app/tags/page.tsx)) 使用 SSG
   - ✅ 標籤篩選頁 ([app/tags/[tag]/page.tsx](app/tags/[tag]/page.tsx)) 預渲染所有標籤

4. **新增元件**
   - ✅ [SearchWrapper](components/search/SearchWrapper.tsx) - 將搜尋功能獨立成漸進增強元件

---

## 🔍 如何驗證

### 方法一：快速測試（推薦）

```bash
# 1. Build 專案
npm run build

# 2. 啟動 production server
npm start

# 3. 在另一個終端視窗執行測試
npm run test:seo
```

你應該會看到類似這樣的輸出：

```
🔍 SEO 測試工具
===============

✓ 找到 .next 目錄
✓ Production server 正在運行

📄 測試首頁 (/)...
✓ 首頁包含 '最新文章' 標題
✓ 首頁包含文章卡片

📝 測試文章頁...
✓ 文章頁包含文章容器
✓ 文章頁包含文章內容

🏷️  測試標籤頁 (/tags)...
✓ 標籤頁包含標題
✓ 標籤頁包含標籤卡片

🔖 測試 Meta Tags...
✓ 首頁包含 description meta tag
✓ 首頁包含 keywords meta tag

✅ 測試完成！
```

### 方法二：手動檢查原始 HTML

```bash
# 查看首頁原始 HTML
curl http://localhost:3000 > homepage.html

# 查看文章頁原始 HTML（替換成你的文章 slug）
curl http://localhost:3000/posts/your-post-slug > post.html

# 用文字編輯器打開檢查
code homepage.html
```

**檢查重點**：

✅ **正確**：可以看到完整的文章標題和內容
```html
<h2 class="home__articles-title">📝 最新文章</h2>
<div class="article-list">
  <article class="article-card">
    <h3>React 18 新特性完整指南</h3>
    <p>深入探討 React 18 的 Concurrent Features...</p>
  </article>
  <!-- 更多文章 -->
</div>
```

❌ **錯誤**：只看到 "載入中..." 或完全空白
```html
<div>載入中...</div>
```

### 方法三：檢查 Build Output

執行 `npm run build` 後，檢查輸出：

```
Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB          87 kB
├ ○ /about                               1.4 kB          83 kB
├ ○ /posts/[slug]                        8.3 kB          95 kB
│  ├ /posts/react-18-guide
│  ├ /posts/typescript-tips
│  └ [+10 more paths]
├ ○ /tags                                2.1 kB          84 kB
└ ○ /tags/[tag]                          2.5 kB          85 kB
   ├ /tags/React
   ├ /tags/TypeScript
   └ [+8 more paths]

○  (Static)  prerendered as static content
```

**重點符號**：
- `○` = Static（靜態生成）✅ **這是我們想要的**
- `λ` = Server（伺服器端渲染）
- `ƒ` = Dynamic（動態路由）

---

## 🎯 架構說明

### 漸進增強策略

我們採用**漸進增強**策略，確保核心內容可被搜尋引擎索引：

```
┌─────────────────────────────────────────┐
│         Server Component (SSG)          │
│      ✅ 核心內容（SEO 友善）             │
│                                         │
│  - 文章列表                              │
│  - 文章內容                              │
│  - 標籤列表                              │
│  - Meta Tags                            │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │   Client Component (互動功能)     │  │
│  │   ⚡ 漸進增強（不影響 SEO）       │  │
│  │                                   │  │
│  │  - 搜尋功能                        │  │
│  │  - 主題切換                        │  │
│  │  - 導覽選單                        │  │
│  │  - 留言系統                        │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### 資料流

```
Build Time (npm run build)
    ↓
Contentlayer 處理 Markdown 檔案
    ↓
生成靜態 HTML 檔案
    ↓
使用者訪問
    ↓
直接回傳預渲染的 HTML（瞬間載入！）
    ↓
JavaScript 載入後啟用互動功能
```

---

## 📁 關鍵檔案說明

| 檔案 | 類型 | 說明 |
|------|------|------|
| [app/page.tsx](app/page.tsx) | Server Component | 首頁，直接渲染文章列表 |
| [app/posts/[slug]/page.tsx](app/posts/[slug]/page.tsx) | Server Component | 文章詳情頁，使用 SSG |
| [components/article/ArticleList.tsx](components/article/ArticleList.tsx) | Server Component | 文章列表元件 |
| [components/search/SearchWrapper.tsx](components/search/SearchWrapper.tsx) | Client Component | 搜尋功能（漸進增強）|
| [lib/posts.ts](lib/posts.ts) | Utility | 文章資料處理函數 |

---

## 🛠️ 常見問題

### Q: 為什麼有些元件還是 'use client'？

**A**: 只有需要**互動功能**的元件才使用 Client Component：

- ✅ 可以是 Client Component：
  - 搜尋功能（`SearchWrapper`）
  - 主題切換器（`ThemeSwitcher`）
  - 導覽選單（`Navbar`）
  - 側邊欄收合功能（`Sidebar`）

- ❌ 必須是 Server Component（影響 SEO）：
  - 文章列表（`ArticleList`）
  - 文章內容（`PostPage`）
  - 頁面路由（`app/**/*.tsx`）

**關鍵點**：Client Component 的內容也會在 HTML 中，**只要它是從 Server Component 傳入的 props**。

範例：
```typescript
// Server Component（首頁）
export default function HomePage() {
  const posts = getSortedPosts() // ✅ 在伺服器端取得

  return (
    <main>
      {/* Client Component，但內容來自 Server Component */}
      <SearchWrapper initialPosts={posts} /> {/* ✅ SEO 友善 */}

      {/* Server Component，直接渲染 */}
      <ArticleList posts={posts} /> {/* ✅ SEO 友善 */}
    </main>
  )
}
```

### Q: 如何新增文章？

**A**: 直接在 `content/posts/` 目錄新增 `.md` 檔案：

```markdown
---
title: 我的新文章
excerpt: 這是文章摘要
date: 2024-10-27
tags:
  - React
  - TypeScript
featured: false
---

# 文章內容開始

這裡是 Markdown 內容...
```

執行 `npm run build` 時會自動：
1. Contentlayer 處理 Markdown
2. 生成靜態 HTML
3. 更新 sitemap.xml

### Q: 部署後如何確認 SEO 有效？

**A**: 使用 Google Search Console：

1. 前往 [Google Search Console](https://search.google.com/search-console)
2. 新增你的網站
3. 使用「網址檢查工具」測試任一頁面
4. 點選「測試已發布的網址」
5. 查看「已檢索的網頁」，確認內容正確顯示

---

## 📋 部署前檢查清單

在部署前，請確認：

- [ ] 執行 `npm run build` 成功
- [ ] 所有路由顯示 `○` (Static) 符號
- [ ] 執行 `npm run test:seo` 全部通過
- [ ] 查看原始 HTML 包含完整內容
- [ ] 確認 sitemap.xml 已生成（在 `public/sitemap.xml`）
- [ ] robots.txt 設定正確（允許搜尋引擎爬取）
- [ ] Google Search Console 已設定並提交 sitemap

---

## 🎉 完成！

你的部落格現在已經完全 SEO 優化了！

### 下一步

1. **提交 sitemap**：在 Google Search Console 提交 `sitemap.xml`
2. **監控效能**：使用 Vercel Analytics 或 Google Analytics
3. **內容優化**：撰寫高品質文章，使用適當的關鍵字
4. **社群分享**：利用 OpenGraph metadata 優化社群分享效果

---

## 📚 更多資訊

- 詳細 SEO 說明：[SEO_OPTIMIZATION.md](SEO_OPTIMIZATION.md)
- 專案規範：[CLAUDE.md](CLAUDE.md)
- Next.js 文件：[nextjs.org/docs](https://nextjs.org/docs)

---

**最後更新**: 2024-10-27
**版本**: 1.0.0

有問題？請參考 [SEO_OPTIMIZATION.md](SEO_OPTIMIZATION.md) 了解更多細節！
