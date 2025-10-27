# ✅ SEO 優化檢查清單

> 部署前必看！確保你的部落格 SEO 完全優化

## 🚀 快速檢查（5 分鐘）

### 1. Build 測試
```bash
npm run build
```

檢查輸出：
- [ ] 所有路由顯示 `○` (Static) 符號
- [ ] 沒有錯誤或警告
- [ ] Build 成功完成

**範例輸出**：
```
Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB          87 kB  ✅
├ ○ /posts/[slug]                        8.3 kB          95 kB  ✅
└ ○ /tags                                2.1 kB          84 kB  ✅

○  (Static)  prerendered as static content
```

---

### 2. 啟動測試
```bash
npm start
```

檢查：
- [ ] Server 成功啟動在 port 3000
- [ ] 可以在瀏覽器訪問 http://localhost:3000
- [ ] 頁面正常顯示

---

### 3. SEO 自動測試
```bash
npm run test:seo
```

檢查：
- [ ] 所有測試項目顯示 ✓（綠色勾勾）
- [ ] 無 ✗（紅色叉叉）
- [ ] 測試完成訊息

---

### 4. 視覺檢查

在瀏覽器中：
- [ ] 首頁立即顯示文章列表（無 "載入中..."）
- [ ] 文章頁立即顯示完整內容
- [ ] 標籤頁正常運作
- [ ] 搜尋功能正常運作

---

### 5. 原始碼檢查

在瀏覽器中右鍵 → 「檢視網頁原始碼」：
- [ ] 可以看到完整的文章標題
- [ ] 可以看到文章摘要
- [ ] 可以看到 `<meta name="description">` 標籤
- [ ] 無 "載入中..." 文字

---

## 📋 完整檢查清單

### 技術設定

#### Next.js 設定
- [ ] [next.config.js](next.config.js) 包含 `withContentlayer`
- [ ] 所有頁面路由使用 `export const dynamic = 'force-static'`
- [ ] 動態路由都有 `generateStaticParams()`

#### Meta Tags
- [ ] [app/layout.tsx](app/layout.tsx) 有全站預設 metadata
- [ ] 所有頁面都有 `generateMetadata()`
- [ ] 文章頁包含 OpenGraph tags
- [ ] Google Search Console verification tag 已設定

#### Sitemap
- [ ] `public/sitemap.xml` 存在
- [ ] Sitemap 包含所有頁面
- [ ] robots.txt 允許搜尋引擎爬取

---

### 元件架構

#### Server Components（必須）
- [ ] [app/page.tsx](app/page.tsx) - 首頁
- [ ] [app/posts/[slug]/page.tsx](app/posts/[slug]/page.tsx) - 文章頁
- [ ] [app/tags/page.tsx](app/tags/page.tsx) - 標籤頁
- [ ] [components/article/ArticleList.tsx](components/article/ArticleList.tsx) - 文章列表

#### Client Components（互動功能）
- [ ] [components/search/SearchWrapper.tsx](components/search/SearchWrapper.tsx) - 搜尋
- [ ] [components/layout/Navbar.tsx](components/layout/Navbar.tsx) - 導覽
- [ ] [components/giscus/GiscusBoard.tsx](components/giscus/GiscusBoard.tsx) - 留言

---

### 內容品質

#### Markdown 檔案
- [ ] 所有文章都有完整的 frontmatter
- [ ] title 有意義且包含關鍵字
- [ ] excerpt 吸引人且總結內容
- [ ] tags 準確且不過多（3-5 個為佳）
- [ ] date 格式正確（YYYY-MM-DD）

**範例**：
```markdown
---
title: React 18 新特性完整指南
excerpt: 深入探討 React 18 的 Concurrent Features，包含實際範例與效能優化技巧
date: 2024-10-27
tags:
  - React
  - JavaScript
  - Performance
featured: true
---
```

#### HTML 結構
- [ ] 標題層級正確（H1 → H2 → H3）
- [ ] 每頁只有一個 H1
- [ ] 圖片有 alt 屬性
- [ ] 連結有意義的文字（不是 "點這裡"）

---

### SEO 最佳實踐

#### On-Page SEO
- [ ] 標題包含關鍵字
- [ ] URL 簡潔且有意義
- [ ] 內容長度足夠（建議 > 500 字）
- [ ] 適當的內部連結
- [ ] 適當的外部連結

#### Technical SEO
- [ ] HTTPS 啟用（部署後）
- [ ] Mobile-friendly（響應式設計）
- [ ] Page speed 優化（使用 Next.js Image）
- [ ] 無 404 錯誤
- [ ] 無重複內容

---

## 🔧 進階驗證

### Lighthouse 測試

在 Chrome DevTools 中：

1. 打開開發者工具（F12）
2. 切換到 "Lighthouse" 分頁
3. 選擇 "SEO" 類別
4. 點選 "Analyze page load"

**目標分數**：
- [ ] SEO Score: 95+
- [ ] Performance: 90+
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+

---

### Google Search Console

部署後設定：

1. **新增網站**
   - [ ] 前往 [Google Search Console](https://search.google.com/search-console)
   - [ ] 新增你的網站
   - [ ] 驗證擁有權

2. **提交 Sitemap**
   - [ ] 前往 "Sitemaps" 頁面
   - [ ] 提交 `https://your-domain.com/sitemap.xml`

3. **URL 檢查**
   - [ ] 使用 "URL Inspection" 工具測試首頁
   - [ ] 使用 "URL Inspection" 工具測試一篇文章
   - [ ] 確認 "Coverage" 顯示 "Indexed"

4. **追蹤效能**
   - [ ] 定期檢查 "Performance" 報告
   - [ ] 監控 "Coverage" 報告
   - [ ] 查看 "Enhancements" 建議

---

### Rich Results Test

測試結構化資料：

1. 前往 [Rich Results Test](https://search.google.com/test/rich-results)
2. 輸入你的文章 URL
3. 檢查是否有錯誤或警告

- [ ] 無錯誤
- [ ] 無警告
- [ ] 結構化資料正確

---

## 🎯 部署前最終檢查

### 必做項目

```bash
# 1. 清理並重新 build
rm -rf .next
npm run build

# 2. 檢查 build output
# 確認所有路由都是 ○ (Static)

# 3. 測試 production build
npm start

# 4. 執行 SEO 測試
npm run test:seo

# 5. 手動檢查
# - 在瀏覽器查看原始碼
# - 確認內容在 HTML 中
# - 測試所有主要頁面
```

### 檢查清單

- [ ] Build 成功無錯誤
- [ ] 所有路由顯示 ○ (Static)
- [ ] SEO 測試全部通過
- [ ] 原始 HTML 包含完整內容
- [ ] 所有連結正常運作
- [ ] 圖片正常顯示
- [ ] 響應式設計正常
- [ ] sitemap.xml 已生成
- [ ] robots.txt 設定正確

---

## 📊 效能基準

部署後應達到的目標：

| 指標 | 目標 | 檢查方式 |
|------|------|----------|
| **Lighthouse SEO** | 95+ | Chrome DevTools |
| **Page Speed** | < 2s | Lighthouse |
| **Core Web Vitals** | Pass | Google Search Console |
| **Mobile Usability** | No Issues | Google Search Console |
| **Index Coverage** | No Errors | Google Search Console |

---

## 🚨 常見問題快速修正

### 問題 1: Build 顯示 λ (Server) 而非 ○ (Static)

**原因**：頁面使用動態功能或缺少 `force-static` 設定

**修正**：
```typescript
// 在頁面中新增
export const dynamic = 'force-static'
```

---

### 問題 2: 原始 HTML 沒有內容

**原因**：元件使用 'use client' 且內容在 useEffect 中載入

**修正**：
```typescript
// ❌ 錯誤
'use client'
export function ArticleList() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts().then(setPosts)
  }, [])
}

// ✅ 正確
export function ArticleList({ posts }: { posts: Post[] }) {
  return <div>{posts.map(...)}</div>
}
```

---

### 問題 3: SEO 測試失敗

**原因**：Production server 未啟動或內容不在 HTML 中

**修正**：
1. 確認執行了 `npm start`
2. 檢查 http://localhost:3000 可以訪問
3. 查看原始碼確認內容存在

---

## 🎉 全部完成！

當所有項目都打勾後：

1. **部署你的網站**
   ```bash
   git add .
   git commit -m "feat: SEO 優化完成"
   git push
   ```

2. **設定 Google Search Console**
   - 新增網站並驗證
   - 提交 sitemap.xml
   - 等待索引（通常需要幾天）

3. **持續優化**
   - 定期檢查 Search Console
   - 撰寫高品質內容
   - 建立內部連結網絡
   - 獲取外部連結

---

## 📚 更多資源

- **快速上手**: [SEO_QUICK_START.md](SEO_QUICK_START.md)
- **技術細節**: [SEO_OPTIMIZATION.md](SEO_OPTIMIZATION.md)
- **改動總結**: [SEO_CHANGES_SUMMARY.md](SEO_CHANGES_SUMMARY.md)
- **架構說明**: [docs/seo-architecture.md](docs/seo-architecture.md)

---

**最後更新**: 2024-10-27

需要協助？參考上述文件或檢查 Google Search Console 的建議！
