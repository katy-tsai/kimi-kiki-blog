# SEO 優化指南 - SSR/SSG 實作

> 本文件說明如何確保你的 Next.js 部落格內容可被搜尋引擎正確索引

## 📊 當前狀態

### ✅ 已完成的優化

#### 1. **所有頁面使用 SSG（Static Site Generation）**

所有重要頁面都已設定為靜態生成：

```typescript
// 強制靜態生成
export const dynamic = 'force-static'
```

| 頁面 | 策略 | 說明 |
|------|------|------|
| [首頁](app/page.tsx) | SSG | 在 build time 預渲染，文章列表直接在 HTML 中 |
| [文章詳情](app/posts/[slug]/page.tsx) | SSG | 使用 `generateStaticParams()` 預渲染所有文章 |
| [標籤列表](app/tags/page.tsx) | SSG | 預渲染所有標籤 |
| [標籤篩選](app/tags/[tag]/page.tsx) | SSG | 使用 `generateStaticParams()` 預渲染所有標籤頁 |

#### 2. **Server Components 為主**

大部分元件都是 Server Component，只有需要互動的部分才使用 Client Component：

- ✅ Server Component（SEO 友善）
  - `app/page.tsx` - 首頁
  - `app/posts/[slug]/page.tsx` - 文章頁
  - `components/article/ArticleList.tsx` - 文章列表
  - `components/layout/Sidebar.tsx` - 側邊欄

- 🎯 Client Component（漸進增強）
  - `components/search/SearchWrapper.tsx` - 搜尋功能
  - `components/layout/Navbar.tsx` - 導覽列互動
  - `components/giscus/GiscusBoard.tsx` - 留言系統

#### 3. **完整的 Meta Tags**

每個頁面都有完整的 SEO metadata：

```typescript
// app/layout.tsx - 全站預設
export const metadata: Metadata = {
  title: {
    default: 'kimi-kiki Blog | 技術分享',
    template: '%s | kimi-kiki Blog',
  },
  description: '分享程式開發、AI 技術與學習心得',
  keywords: ['技術部落格', 'React', 'TypeScript', 'AI', 'Next.js'],
  authors: [{ name: 'kimi-kiki' }],
  verification: {
    google: '4soaWqzybN2d3WuiZAa0EMYgZKw3BQ1dKMvEX2hA-LQ',
  },
}

// app/posts/[slug]/page.tsx - 文章頁動態 metadata
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}
```

---

## 🔍 如何驗證 SEO 是否有效

### 1. 查看原始 HTML（最重要！）

這是最可靠的驗證方式：

```bash
# 1. Build 專案
npm run build

# 2. 啟動 production server
npm start

# 3. 使用 curl 查看原始 HTML（或瀏覽器查看原始碼）
curl http://localhost:3000 > homepage.html
curl http://localhost:3000/posts/your-post-slug > post.html

# 4. 檢查 HTML 內容
# 應該要看到完整的文章內容，不是 "載入中..." 或空白
```

**驗證重點**：

✅ **正確**：HTML 中包含完整文章內容
```html
<article class="post-container">
  <h1 class="post-title">React 18 新特性完整指南</h1>
  <div class="post-content">
    <p>React 18 帶來了許多重要的新功能...</p>
    <!-- 完整文章內容 -->
  </div>
</article>
```

❌ **錯誤**：HTML 只有載入狀態
```html
<div>載入中...</div>
<!-- 或完全空白 -->
```

### 2. 使用 Google Search Console

1. 前往 [Google Search Console](https://search.google.com/search-console)
2. 使用「網址檢查工具」測試你的頁面
3. 點選「查看已檢索的網頁」
4. 檢查「HTML」分頁，確認內容是否正確顯示

### 3. 使用 Rich Results Test

1. 前往 [Rich Results Test](https://search.google.com/test/rich-results)
2. 輸入你的網址
3. 檢查結構化資料是否正確

### 4. 檢查 Next.js Build Output

```bash
npm run build
```

你應該會看到類似這樣的輸出：

```
Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB          87 kB
├ ○ /about                               1.4 kB          83 kB
├ ○ /posts/[slug]                        8.3 kB          95 kB
├   ├ /posts/react-18-guide
├   ├ /posts/typescript-tips
├   └ [+10 more paths]
└ ○ /tags                                2.1 kB          84 kB

○  (Static)  prerendered as static content
```

**重點符號**：
- `○` (Static) = 靜態生成 ✅
- `λ` (Server) = 每次請求都在伺服器端渲染
- `ƒ` (Dynamic) = 動態路由

---

## 🚀 漸進增強策略

我們採用**漸進增強**（Progressive Enhancement）策略：

### 核心內容（靜態 - SEO 友善）
1. 文章列表 → Server Component 直接渲染
2. 文章內容 → Server Component 直接渲染
3. 標籤列表 → Server Component 直接渲染
4. Sidebar → Server Component 直接渲染

### 互動功能（動態 - 漸進增強）
1. 搜尋功能 → Client Component（`SearchWrapper`）
2. 主題切換 → Client Component（`ThemeSwitcher`）
3. 導覽選單 → Client Component（`Navbar`）
4. 留言系統 → Client Component（`GiscusBoard`）

這樣的設計確保：
- ✅ 即使 JavaScript 未載入，核心內容仍可見
- ✅ 搜尋引擎可以正確索引所有文章
- ✅ 使用者體驗不會因為 JavaScript 載入慢而受影響
- ✅ 互動功能作為額外增強，不影響基本功能

---

## 🎯 Next.js 15 最佳實踐

### 1. 使用 `force-static` 明確指定渲染策略

```typescript
// CRITICAL: 強制靜態生成
export const dynamic = 'force-static'
```

這確保 Next.js 在 build time 就生成 HTML，而不是在 runtime。

### 2. 為動態路由使用 `generateStaticParams`

```typescript
// 預渲染所有文章
export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
```

### 3. 使用 `generateMetadata` 提供動態 SEO

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    },
  }
}
```

### 4. 避免在 Server Component 中使用 Suspense 包裹靜態內容

```typescript
// ❌ 錯誤：不必要的 Suspense
<Suspense fallback={<div>載入中...</div>}>
  <ArticleList posts={posts} />
</Suspense>

// ✅ 正確：直接渲染
<ArticleList posts={posts} />
```

---

## 🔧 常見問題與解決方案

### Q1: 為什麼我的頁面在 Lighthouse 顯示 "Not indexable"？

**可能原因**：
1. robots.txt 阻擋搜尋引擎
2. Meta robots 設為 noindex
3. 頁面實際使用 SSR 而非 SSG

**解決方式**：
```bash
# 檢查 build output
npm run build

# 確認頁面是靜態生成（○ 符號）
Route (app)                              Size     First Load JS
├ ○ /posts/[slug]                        8.3 kB          95 kB
```

### Q2: 搜尋引擎看不到我的文章內容

**檢查步驟**：
1. 查看原始 HTML（`curl http://localhost:3000/posts/slug`）
2. 確認內容在 HTML 中，而非透過 JavaScript 載入
3. 確認沒有使用 `'use client'` 在主要內容元件

### Q3: 如何測試本地是否正確 SSG？

```bash
# 1. Build
npm run build

# 2. Start production server
npm start

# 3. 使用 curl 或瀏覽器查看原始碼
curl http://localhost:3000/posts/your-slug

# 4. 確認 HTML 中有完整內容
```

### Q4: 動態內容如何處理？

使用**漸進增強**：
1. 靜態內容用 Server Component
2. 互動功能用 Client Component
3. Client Component 不影響 SEO 的核心內容

範例：
```typescript
// Server Component（首頁）
export default function HomePage() {
  const posts = getSortedPosts()

  return (
    <main>
      {/* 互動功能：漸進增強 */}
      <SearchWrapper initialPosts={posts} />

      {/* 核心內容：靜態渲染 */}
      <ArticleList posts={posts} />
    </main>
  )
}
```

---

## 📈 效能與 SEO 指標

優化後應該達到的目標：

| 指標 | 目標值 | 說明 |
|------|--------|------|
| First Contentful Paint (FCP) | < 1.8s | 首次內容繪製時間 |
| Largest Contentful Paint (LCP) | < 2.5s | 最大內容繪製時間 |
| Time to Interactive (TTI) | < 3.8s | 可互動時間 |
| Cumulative Layout Shift (CLS) | < 0.1 | 累積佈局偏移 |
| SEO Score (Lighthouse) | 95+ | SEO 評分 |

---

## 🔍 檢查清單

部署前請確認：

- [ ] 所有重要頁面都設定 `export const dynamic = 'force-static'`
- [ ] 動態路由都有 `generateStaticParams()`
- [ ] 所有頁面都有 `generateMetadata()`
- [ ] 原始 HTML 包含完整內容（使用 curl 測試）
- [ ] Build output 顯示 `○` (Static) 符號
- [ ] robots.txt 允許搜尋引擎爬取
- [ ] sitemap.xml 已生成並提交
- [ ] Google Search Console 已設定
- [ ] 結構化資料正確（使用 Rich Results Test）

---

## 📚 延伸閱讀

- [Next.js 15 Documentation - Rendering](https://nextjs.org/docs/app/building-your-application/rendering)
- [Next.js 15 Documentation - Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google Search Central - JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Web.dev - Rendering on the Web](https://web.dev/rendering-on-the-web/)

---

**最後更新**: 2024-10-27
**版本**: 1.0.0
