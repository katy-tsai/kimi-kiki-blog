# SEO 架構圖解

## 🏗️ 整體架構

```
┌──────────────────────────────────────────────────────────────┐
│                         使用者請求                              │
│                    https://your-blog.com                       │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                   Next.js App Router (SSG)                     │
│                                                                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Server Components (SSG)                    │  │
│  │                                                         │  │
│  │  app/page.tsx                → 首頁（靜態生成）         │  │
│  │  app/posts/[slug]/page.tsx   → 文章頁（靜態生成）       │  │
│  │  app/tags/page.tsx           → 標籤頁（靜態生成）       │  │
│  │  app/tags/[tag]/page.tsx     → 標籤篩選（靜態生成）     │  │
│  │                                                         │  │
│  │  ✅ 在 Build Time 生成 HTML                             │  │
│  │  ✅ 內容完整出現在 HTML 中                               │  │
│  │  ✅ 搜尋引擎可以直接讀取                                 │  │
│  └────────────────────────────────────────────────────────┘  │
│                              ↓                                 │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                   Contentlayer                          │  │
│  │                                                         │  │
│  │  content/posts/*.md  →  處理  →  生成型別安全資料       │  │
│  │                                                         │  │
│  │  - 解析 Frontmatter                                     │  │
│  │  - 轉換 Markdown → HTML                                 │  │
│  │  - 生成 TypeScript 型別                                 │  │
│  │  - 計算閱讀時間                                          │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                    靜態 HTML 輸出                               │
│                                                                │
│  .next/server/app/                                            │
│  ├── page.html              (首頁)                             │
│  ├── posts/                                                    │
│  │   ├── react-18.html      (文章 1)                          │
│  │   ├── typescript-tips.html (文章 2)                        │
│  │   └── ...                                                  │
│  └── tags/                                                     │
│      ├── page.html          (標籤列表)                         │
│      └── react/page.html    (React 標籤篩選)                   │
│                                                                │
│  ✅ 完整的 HTML 檔案                                            │
│  ✅ 包含所有文章內容                                            │
│  ✅ 包含完整 Meta Tags                                          │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                      使用者瀏覽器                               │
│                                                                │
│  1. 收到完整的 HTML（瞬間顯示內容）                              │
│  2. 載入 JavaScript（啟用互動功能）                             │
│  3. Hydration（讓靜態 HTML 變成互動式 React 元件）              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔄 資料流程

### Build Time（構建時期）

```
1. 開發者執行
   npm run build
        ↓
2. Contentlayer 處理
   content/posts/*.md
        ↓
   解析 Markdown
   生成資料物件
   轉換成 HTML
        ↓
3. Next.js 靜態生成
   generateStaticParams()
   為每篇文章生成路由
        ↓
4. 產生靜態 HTML 檔案
   .next/server/app/
        ↓
5. 生成 Sitemap
   public/sitemap.xml
```

### Runtime（執行時期）

```
1. 使用者訪問
   https://your-blog.com/posts/react-18
        ↓
2. CDN/Server 回應
   直接回傳預生成的 HTML
   ⚡ 超快速（無需計算）
        ↓
3. 瀏覽器渲染
   立即顯示內容
   （無需等待 JavaScript）
        ↓
4. JavaScript 載入
   React Hydration
   啟用互動功能
   （搜尋、主題切換等）
```

---

## 🎯 元件層級架構

### 首頁架構

```
app/page.tsx (Server Component) ⭐ SSG
├─ export const dynamic = 'force-static'
├─ getSortedPosts() → 取得所有文章
│
├─ <Sidebar /> (Client Component)
│  ├─ props: tags, recommendedPosts
│  ├─ 收合/展開功能
│  └─ ✅ 內容在 HTML 中（從 props 傳入）
│
├─ <HeroBanner /> (Server Component)
│  └─ 靜態內容
│
├─ <SearchWrapper /> (Client Component)
│  ├─ props: initialPosts
│  ├─ 搜尋功能（漸進增強）
│  └─ ✅ 不影響 SEO（初始不顯示）
│
└─ <ArticleList /> (Server Component) ⭐ SEO 關鍵
   ├─ props: posts
   └─ 直接渲染文章卡片
      └─ ✅ 完整內容在 HTML 中
```

### 文章頁架構

```
app/posts/[slug]/page.tsx (Server Component) ⭐ SSG
├─ generateStaticParams() → 預渲染所有文章
├─ generateMetadata() → 動態 SEO Meta Tags
├─ export const dynamic = 'force-static'
│
├─ <Sidebar /> (Client Component)
│  └─ ✅ 內容在 HTML 中
│
├─ <article> (原生 HTML) ⭐ SEO 關鍵
│  ├─ <h1>{post.title}</h1>
│  ├─ <time>{post.date}</time>
│  ├─ <TagBadge /> (每個標籤)
│  ├─ <TOC /> (目錄)
│  ├─ <div dangerouslySetInnerHTML={{__html: post.body.html}} />
│  │  └─ ✅ 完整 Markdown 內容轉換成 HTML
│  └─ <nav> (上一篇/下一篇)
│
└─ <GiscusBoard /> (Client Component)
   └─ 留言系統（不影響 SEO）
```

---

## 📊 SEO 優化層級

### Level 1: HTML 結構（最重要）⭐⭐⭐

```html
<!-- ✅ 良好的 HTML 結構 -->
<main>
  <article>
    <header>
      <h1>文章標題</h1>
      <time datetime="2024-10-27">2024年10月27日</time>
    </header>
    <div class="post-content">
      <h2>章節標題</h2>
      <p>段落內容...</p>
      <!-- 完整的文章內容 -->
    </div>
  </article>
</main>
```

### Level 2: Meta Tags（重要）⭐⭐

```html
<head>
  <!-- 基本 Meta Tags -->
  <title>文章標題 | kimi-kiki Blog</title>
  <meta name="description" content="文章摘要..." />
  <meta name="keywords" content="React, TypeScript" />

  <!-- OpenGraph（社群分享）-->
  <meta property="og:title" content="文章標題" />
  <meta property="og:description" content="文章摘要..." />
  <meta property="og:type" content="article" />
  <meta property="article:published_time" content="2024-10-27" />
  <meta property="article:tag" content="React" />
  <meta property="article:tag" content="TypeScript" />

  <!-- Google Verification -->
  <meta name="google-site-verification" content="..." />
</head>
```

### Level 3: 結構化資料（加分項）⭐

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "文章標題",
  "datePublished": "2024-10-27",
  "author": {
    "@type": "Person",
    "name": "kimi-kiki"
  }
}
</script>
```

### Level 4: Sitemap（必要）⭐⭐

```xml
<!-- public/sitemap.xml -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-blog.com/posts/react-18</loc>
    <lastmod>2024-10-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- 更多網址 -->
</urlset>
```

---

## 🔍 搜尋引擎爬取流程

```
1. Googlebot 訪問你的網站
   GET https://your-blog.com
        ↓
2. 收到完整 HTML 回應
   <html>
     <head>
       <title>kimi-kiki Blog</title>
       <meta name="description" content="..." />
     </head>
     <body>
       <article>
         <h1>文章標題</h1>
         <p>文章內容...</p>
       </article>
     </body>
   </html>
        ↓
3. 解析 HTML
   ✅ 找到標題
   ✅ 找到內容
   ✅ 找到連結
   ✅ 找到 Meta Tags
        ↓
4. 索引內容
   將頁面加入搜尋索引
        ↓
5. 爬取連結
   繼續爬取其他文章
```

---

## 📈 效能與 SEO 的關係

### 傳統 CSR（Client-Side Rendering）

```
使用者訪問 → 空白 HTML → 載入 JS → 請求資料 → 渲染內容
                                              ↑
                                          慢！影響 SEO！
```

### 優化後的 SSG（Static Site Generation）

```
使用者訪問 → 完整 HTML（立即顯示）→ 載入 JS → 啟用互動
                   ↑
              快！SEO 友善！
```

### 效能指標比較

| 指標 | CSR | SSR | SSG ✅ |
|------|-----|-----|-------|
| Time to First Byte (TTFB) | 慢 | 中 | 快 ⚡ |
| First Contentful Paint (FCP) | 慢 | 中 | 快 ⚡ |
| SEO Friendliness | 差 | 好 | 優 ⭐ |
| Server Load | 低 | 高 | 低 |
| Cache-ability | 低 | 低 | 高 ⚡ |

---

## ✅ 驗證檢查表

### 視覺化驗證流程

```
┌─────────────────────────────────────────┐
│  1. Build 專案                           │
│     npm run build                       │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  2. 檢查 Build Output                    │
│     ✅ 所有路由顯示 ○ (Static)           │
│     ❌ 如果顯示 λ (Server) 需要修正      │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  3. 啟動 Production Server               │
│     npm start                           │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  4. 執行 SEO 測試                        │
│     npm run test:seo                    │
│     ✅ 所有測試通過                      │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  5. 檢查原始 HTML                        │
│     curl http://localhost:3000          │
│     ✅ 包含完整文章內容                  │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  6. 部署並驗證                           │
│     - Google Search Console            │
│     - Rich Results Test                │
│     - Lighthouse SEO Score             │
└─────────────────────────────────────────┘
```

---

## 🎓 關鍵概念總結

### Server Component vs Client Component

| 特性 | Server Component | Client Component |
|------|------------------|------------------|
| 執行位置 | 伺服器 | 瀏覽器 |
| 何時渲染 | Build Time / Request Time | Browser Runtime |
| SEO | ✅ 優秀 | ⚠️ 依情況 |
| 互動性 | ❌ 無 | ✅ 有 |
| Bundle Size | ✅ 不增加 | ❌ 增加 |
| 使用時機 | 靜態內容、資料讀取 | 互動功能、狀態管理 |

### SSG vs SSR vs CSR

```
SSG (Static Site Generation) ✅ 我們使用的
├─ Build time 生成 HTML
├─ 快速、SEO 友善
├─ 適合：部落格、文件、產品頁
└─ 缺點：需要重新 build 才能更新

SSR (Server-Side Rendering)
├─ Request time 生成 HTML
├─ 快速、SEO 友善
├─ 適合：動態內容、個人化頁面
└─ 缺點：伺服器負載較高

CSR (Client-Side Rendering)
├─ Browser 端生成內容
├─ 互動性強
├─ 適合：Dashboard、管理後台
└─ 缺點：SEO 不友善、初始載入慢
```

---

**最後更新**: 2024-10-27
