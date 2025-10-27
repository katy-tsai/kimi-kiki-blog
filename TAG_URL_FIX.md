# 標籤 URL 空格問題修復

## 🐛 問題描述

當標籤名稱包含空格時（例如 "Claude Code"），訪問 `/tags/Cloude%20Code` 會出現 404 錯誤。

### 問題原因

1. **URL 編碼不一致**：瀏覽器會自動將空格轉換為 `%20`
2. **參數解碼缺失**：頁面接收到 `Cloude%20Code` 但直接用來篩選文章
3. **文章標籤是原始名稱**：文章 frontmatter 中的標籤是 `Claude Code`（包含空格）
4. **篩選失敗**：`Cloude%20Code` 無法匹配 `Claude Code`，導致找不到文章

---

## ✅ 解決方案

### 1. 修改 `generateStaticParams()` - URL 編碼

**檔案**: [app/tags/[tag]/page.tsx](app/tags/[tag]/page.tsx)

```typescript
// ❌ 修改前
export function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag,  // 直接使用原始標籤名稱
  }))
}

// ✅ 修改後
export function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),  // URL 編碼標籤名稱
  }))
}
```

**原因**：確保生成的靜態路由使用 URL 編碼的標籤名稱（如 `Cloude%20Code`）

---

### 2. 修改頁面元件 - URL 解碼

**檔案**: [app/tags/[tag]/page.tsx](app/tags/[tag]/page.tsx)

```typescript
// ❌ 修改前
export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const allPosts = getAllPosts()

  // 直接使用 URL 編碼的標籤篩選（會失敗）
  const filteredPosts = allPosts.filter((post) => post.tags.includes(tag))
}

// ✅ 修改後
export default async function TagPage({ params }: TagPageProps) {
  const { tag: encodedTag } = await params

  // 解碼 URL 編碼的標籤
  const tag = decodeURIComponent(encodedTag)

  const allPosts = getAllPosts()

  // 使用解碼後的標籤篩選（成功匹配）
  const filteredPosts = allPosts.filter((post) => post.tags.includes(tag))
}
```

**原因**：
- `encodedTag` = `"Cloude%20Code"` (從 URL 參數)
- `tag` = `"Claude Code"` (解碼後)
- 現在可以正確匹配文章中的 `"Claude Code"` 標籤

---

### 3. 修改 Metadata - 顯示正確標籤名稱

**檔案**: [app/tags/[tag]/page.tsx](app/tags/[tag]/page.tsx)

```typescript
// ❌ 修改前
export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params

  return {
    title: `標籤: ${tag}`,  // 顯示 "標籤: Cloude%20Code"
  }
}

// ✅ 修改後
export async function generateMetadata({ params }: TagPageProps) {
  const { tag: encodedTag } = await params
  const tag = decodeURIComponent(encodedTag)  // 解碼

  return {
    title: `標籤: ${tag}`,  // 顯示 "標籤: Claude Code"
  }
}
```

**原因**：在 SEO metadata 中顯示人類可讀的標籤名稱，而不是 URL 編碼版本

---

### 4. 修改所有標籤連結 - 統一使用 URL 編碼

#### A. Sidebar 元件

**檔案**: [components/layout/Sidebar.tsx](components/layout/Sidebar.tsx)

```typescript
// ❌ 修改前
<Link href={`/tags/${tag}`}>
  <TagBadge tag={tag} />
</Link>

// ✅ 修改後
<Link href={`/tags/${encodeURIComponent(tag)}`}>
  <TagBadge tag={tag} />
</Link>
```

#### B. 標籤列表頁

**檔案**: [app/tags/page.tsx](app/tags/page.tsx)

```typescript
// ❌ 修改前
<Link href={`/tags/${tag}`}>
  <TagBadge tag={tag} />
</Link>

// ✅ 修改後
<Link href={`/tags/${encodeURIComponent(tag)}`}>
  <TagBadge tag={tag} />
</Link>
```

#### C. TagBadge 元件增強

**檔案**: [components/ui/TagBadge.tsx](components/ui/TagBadge.tsx)

```typescript
// ✅ 新增功能：支援作為連結
interface TagBadgeProps {
  tag: string
  className?: string
  asLink?: boolean  // 新增：是否渲染為連結
}

export const TagBadge: React.FC<TagBadgeProps> = ({
  tag,
  className = '',
  asLink = false,
}) => {
  const tagContent = `#${tag}`

  // 如果需要連結，自動處理 URL 編碼
  if (asLink) {
    return (
      <Link href={`/tags/${encodeURIComponent(tag)}`} className="tag-badge">
        {tagContent}
      </Link>
    )
  }

  return <span className="tag-badge">{tagContent}</span>
}
```

#### D. ArticleCard 使用新的 TagBadge

**檔案**: [components/article/ArticleCard.tsx](components/article/ArticleCard.tsx)

```typescript
// ✅ 標籤移出文章連結，獨立可點擊
<article className="article-card">
  <Link href={`/posts/${post.slug}`}>
    <h2>{post.title}</h2>
    <p>{post.excerpt}</p>
  </Link>

  {/* 標籤獨立在外，可點擊 */}
  <div className="article-card__tags">
    {post.tags.map((tag) => (
      <TagBadge key={tag} tag={tag} asLink />
    ))}
  </div>
</article>
```

**原因**：
- 標籤移出文章連結範圍，避免巢狀連結
- 標籤可以獨立點擊，導向標籤篩選頁
- 自動使用 URL 編碼

---

## 🔄 完整流程

### 修改前（有問題）

```
1. 用戶點擊標籤 "Claude Code"
   ↓
2. Next.js Link 生成 href="/tags/Claude Code"
   ↓
3. 瀏覽器自動編碼為 /tags/Claude%20Code
   ↓
4. 頁面接收 params.tag = "Claude%20Code"
   ↓
5. 直接用 "Claude%20Code" 篩選文章
   ↓
6. 找不到匹配（文章標籤是 "Claude Code"）
   ↓
7. ❌ 404 錯誤
```

### 修改後（正確）

```
1. 用戶點擊標籤 "Claude Code"
   ↓
2. Next.js Link 使用 encodeURIComponent("Claude Code")
   生成 href="/tags/Claude%20Code"
   ↓
3. 瀏覽器訪問 /tags/Claude%20Code
   ↓
4. 頁面接收 params.tag = "Claude%20Code"
   ↓
5. 使用 decodeURIComponent("Claude%20Code") = "Claude Code"
   ↓
6. 用 "Claude Code" 篩選文章
   ↓
7. ✅ 成功匹配並顯示文章列表
```

---

## 📊 Build 驗證

執行 `npm run build` 後的輸出：

```bash
Route (app)
└ ● /tags/[tag]
    ├ /tags/AI
    ├ /tags/Blog
    ├ /tags/Cloude%20Code  ✅ 正確編碼
    └ [+10 more paths]
```

所有標籤頁面都正確生成，包含空格的標籤已被 URL 編碼。

---

## 🎯 關鍵學習點

### 1. URL 編碼規則

| 字元 | URL 編碼 | 說明 |
|------|---------|------|
| 空格 | `%20` 或 `+` | 空格必須編碼 |
| 中文 | `%E4%B8%AD%E6%96%87` | 非 ASCII 字元需編碼 |
| `/` | `%2F` | 路徑分隔符需編碼（如果在參數中） |
| `?` | `%3F` | 查詢字串分隔符需編碼 |
| `#` | `%23` | 錨點分隔符需編碼 |

### 2. Next.js 動態路由最佳實踐

```typescript
// ✅ 正確：編碼和解碼配對使用
// Step 1: 生成參數時編碼
export function generateStaticParams() {
  return items.map(item => ({
    slug: encodeURIComponent(item.name)
  }))
}

// Step 2: 使用參數時解碼
export default async function Page({ params }) {
  const { slug: encodedSlug } = await params
  const slug = decodeURIComponent(encodedSlug)
  // 現在可以正確使用 slug
}

// Step 3: 生成連結時編碼
<Link href={`/items/${encodeURIComponent(item.name)}`}>
```

### 3. 常見錯誤

```typescript
// ❌ 錯誤 1：忘記編碼
<Link href={`/tags/${tag}`}>  // 如果 tag 有空格會出錯

// ❌ 錯誤 2：忘記解碼
const { tag } = await params
posts.filter(p => p.tags.includes(tag))  // tag 可能是編碼版本

// ❌ 錯誤 3：重複編碼
const encoded = encodeURIComponent(encodeURIComponent(tag))  // 錯誤！

// ❌ 錯誤 4：使用錯誤的函數
const encoded = escape(tag)  // 已棄用，應使用 encodeURIComponent
```

---

## ✅ 測試檢查清單

修復後應該測試：

- [ ] 點擊包含空格的標籤（如 "Claude Code"）
- [ ] 標籤頁面正確顯示文章列表
- [ ] 頁面標題顯示人類可讀的標籤名稱（非 `%20`）
- [ ] Build 成功生成所有標籤頁面
- [ ] 直接在瀏覽器輸入 `/tags/Claude%20Code` 可以訪問
- [ ] 標籤頁面的 SEO metadata 正確
- [ ] 文章卡片中的標籤可以點擊
- [ ] Sidebar 中的標籤連結正常運作

---

## 🔗 相關檔案

### 修改的檔案

1. [app/tags/[tag]/page.tsx](app/tags/[tag]/page.tsx) - 主要修復
2. [components/layout/Sidebar.tsx](components/layout/Sidebar.tsx) - 標籤連結編碼
3. [app/tags/page.tsx](app/tags/page.tsx) - 標籤列表連結編碼
4. [components/ui/TagBadge.tsx](components/ui/TagBadge.tsx) - 支援連結模式
5. [components/article/ArticleCard.tsx](components/article/ArticleCard.tsx) - 使用可點擊標籤

### 同時修復的問題

- [app/contact/page.tsx](app/contact/page.tsx) - 移除不必要的 `async`/`await`
- [app/about/page.tsx](app/about/page.tsx) - 移除不必要的 `async`/`await`，更新已棄用的圖示

---

## 📚 延伸閱讀

- [MDN: encodeURIComponent()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
- [MDN: decodeURIComponent()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)
- [Next.js: Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Next.js: generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)

---

**修復日期**: 2024-10-27
**版本**: 1.0.0
