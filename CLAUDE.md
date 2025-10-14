# kimi-kiki Blog 專案文件

> 📝 這份文件為 Claude AI 提供完整的專案上下文，包含架構、規範、設計系統等資訊

## 📋 專案概述

### 目的
技術部落格平台，用於紀錄學習及技術分享。

### 目標受眾
- 同行工程師
- 一般大眾
- 語言風格：中文為主

### 設計稿參考
- [互動式設計原型](blog-design-prototype.html)

---

## 🏗️ 架構藍圖

### 核心頁面結構

```
Blog Website
├── Layout Components
│   ├── Navbar (固定導覽列)
│   ├── Footer
│   └── Theme Switcher (深色/淺色模式)
│
├── 🏠 Home Page
│   ├── Hero Section
│   ├── Article Card List
│   ├── Sidebar (熱門標籤 / 推薦文章) - 可收合
│   └── Pagination
│
├── 📄 Post Page
│   ├── Post Header (標題 / 日期 / Tags)
│   ├── Markdown Renderer
│   ├── TOC (目錄)
│   ├── Next/Prev Navigation
│   └── Comment Section (Giscus / Disqus)
│
├── 🏷️ Tags Page
│   ├── Tag List
│   └── Articles by Tag
│
├── 👩‍💻 About Page
│   ├── Profile Section (頭像 / 簡介 / 技能)
│   ├── Tech Stack Icons
│   └── Social Links
│
└── 📬 Contact Page
    ├── Contact Form
    └── Direct Links (Email / X / LinkedIn)
```

### UI Components
- Button
- Card
- Tag Badge
- Input
- Markdown Block

---

## 💻 技術棧

### 核心技術
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: SCSS + CSS Variables
- **Content**: Markdown (MDX)
- **UI Icons**: Lucide React

### 推薦套件
```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^18.x",
    "gray-matter": "^4.x",
    "remark": "^15.x",
    "remark-html": "^16.x",
    "lucide-react": "^0.x"
  },
  "devDependencies": {
    "@types/node": "^20.x",
    "@types/react": "^18.x",
    "typescript": "^5.x",
    "sass": "^1.x"
  }
}
```

---

## 📁 專案目錄結構

```
my-blog/
├── app/
│   ├── layout.tsx                    # 共用 Layout (Navbar, Footer, 主題)
│   ├── page.tsx                      # 首頁：文章列表
│   ├── tags/
│   │   └── [tag]/page.tsx           # 標籤頁
│   ├── posts/
│   │   └── [slug]/page.tsx          # 單篇文章頁
│   ├── about/page.tsx               # 關於我
│   └── contact/page.tsx             # 聯絡我
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx               # 導覽列
│   │   ├── Footer.tsx               # 頁尾
│   │   └── ThemeSwitcher.tsx        # 主題切換器
│   ├── article/
│   │   ├── ArticleCard.tsx          # 文章卡片
│   │   ├── ArticleList.tsx          # 文章列表
│   │   └── TOC.tsx                  # 目錄
│   ├── ui/
│   │   ├── Button.tsx               # 按鈕
│   │   ├── Card.tsx                 # 卡片
│   │   ├── TagBadge.tsx             # 標籤徽章
│   │   └── Input.tsx                # 輸入框
│   └── markdown/
│       └── MarkdownRenderer.tsx     # Markdown 渲染器
│
├── content/
│   └── posts/
│       ├── post-1.md                # 文章檔案
│       ├── post-2.md
│       └── ...
│
├── lib/
│   ├── markdown.ts                  # Markdown 解析
│   ├── posts.ts                     # 文章相關工具
│   └── utils.ts                     # 通用工具函數
│
├── hooks/
│   ├── useTheme.ts                  # 主題管理 hook
│   └── usePosts.ts                  # 文章資料 hook
│
├── scss/
│   ├── components/                  # 元件樣式
│   │   ├── Navbar.scss
│   │   ├── ArticleCard.scss
│   │   ├── Button.scss
│   │   └── ...
│   ├── core/                        # 核心樣式
│   │   ├── theme/
│   │   │   ├── _variables.scss     # Design Tokens
│   │   │   ├── _light-theme.scss   # 亮色主題
│   │   │   └── _dark-theme.scss    # 深色主題
│   │   ├── _reset.scss              # CSS Reset
│   │   ├── _typography.scss         # 排版
│   │   └── _global.scss             # 全域樣式
│   └── styles.scss                  # SCSS 主檔案
│
├── public/
│   ├── images/                      # 圖片資源
│   └── fonts/                       # 字型檔案
│
├── types/
│   └── post.ts                      # 型別定義
│
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🎨 設計系統

### 設計原則

#### 1. Layout 風格
- **雙欄佈局**：主內容 + 側邊欄（可收合）
- **最大寬度**：800px - 900px（保證可讀性）
- **固定導覽列**：Navbar 固定在頂部
- **響應式**：手機版使用 Drawer 導覽

#### 2. 視覺風格
- **配色**：
  - 亮色系：淺灰 + 藍色主調
  - 暗色系：深藍黑 + 亮文字
- **字體**：
  - 標題：無襯線體
  - 內文：襯線體（可讀性更好）
- **品牌一致性**：Logo 與配色協調

#### 3. 響應式設計
- **手機版**：導覽改為 Drawer
- **Markdown 內容**：圖片與表格自適應
- **斷點**：xs(320px) / sm(640px) / md(768px) / lg(1024px) / xl(1280px)

### CSS Variables 使用規範

所有樣式變數以 `--` 開頭，例如：

```scss
// ✅ 正確用法
.card {
  background-color: var(--color-bg-card);
  padding: var(--card-padding-base);
  border-radius: var(--card-radius);
  box-shadow: var(--shadow-base);
}

// ✅ 主題切換
[data-theme="dark"] {
  --color-bg-primary: #0f172a;
  --color-text-primary: #f1f5f9;
}
```

### Design Tokens 類別

#### 🎨 顏色系統
- **Brand Colors**：品牌主色、懸浮色、淺色、深色
- **Background Colors**：主背景、次要背景、卡片背景、輸入框背景
- **Text Colors**：主文字、次要文字、連結、反色
- **Border Colors**：主邊框、次要邊框、聚焦邊框
- **Status Colors**：成功、警告、錯誤、資訊
- **Tag Colors**：React、TypeScript、JavaScript、AI 等

#### 📝 排版系統
- **Font Family**：sans、serif、mono
- **Font Size**：12px - 60px
- **Font Weight**：300 - 800
- **Line Height**：1 - 2
- **Letter Spacing**：-0.05em - 0.1em

#### 📏 間距與佈局
- **Spacing**：4px - 128px（使用 4px 基準）
- **Border Radius**：4px - 完全圓形
- **Layout**：Navbar 高度、Sidebar 寬度、最大寬度
- **Z-Index**：0 - 100（分層管理）

#### 🎯 組件 Tokens
- **Button**：padding、font-size、border-radius
- **Input**：padding、height、border-radius
- **Card**：padding、border-radius
- **Badge & Tag**：padding、font-size、border-radius
- **Article**：標題大小、段落大小、行高

---

## 📐 開發規範

### 程式碼組織原則

#### 1. 單一職責原則
- 每個元件只負責一個功能
- 單檔 **不得超過 300 行程式碼**
- 超過需拆分成：
  - 子元件
  - Custom Hooks
  - Utils 函數
  - Service 層

#### 2. 元件分類

##### UI 元件（純展示）
```tsx
// ✅ 純展示元件範例
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
}) => {
  return (
    <button 
      className={`button button--${variant} button--${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

##### 容器元件（邏輯處理）
```tsx
// ✅ 容器元件範例
export const ArticleListContainer: React.FC = () => {
  const { posts, isLoading, error } = usePosts();

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return <ArticleList posts={posts} />;
};
```

#### 3. 抽象層級
```
app/ (頁面)
  ↓
components/ (可重用元件)
  ↓
hooks/ (邏輯抽離)
  ↓
lib/ (工具函數)
  ↓
utils/ (底層工具)
```

---

## 📝 命名規範

### TypeScript/React

| 類型 | 規範 | 範例 |
|------|------|------|
| 元件 | PascalCase | `Button`, `UserProfile`, `ArticleCard` |
| 檔案 | PascalCase (元件) | `Button.tsx`, `UserProfile.tsx` |
| 檔案 | camelCase (工具) | `utils.ts`, `formatDate.ts` |
| 變數/函數 | camelCase | `getUserData`, `isLoading`, `handleClick` |
| 常數 | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_ITEMS` |
| 型別/介面 | PascalCase | `User`, `ApiResponse`, `PostMetadata` |
| Hook | camelCase (use 開頭) | `useTheme`, `usePosts`, `useAuth` |

### CSS/SCSS (BEM 命名法)

```scss
// Block (區塊)
.article-card { }

// Element (元素)
.article-card__title { }
.article-card__excerpt { }
.article-card__footer { }

// Modifier (修飾符)
.article-card--featured { }
.article-card--large { }
.article-card__title--highlight { }
```

#### BEM 範例
```scss
.button {
  // Base styles
  
  &__icon {
    // Icon styles
  }
  
  &--primary {
    // Primary variant
  }
  
  &--secondary {
    // Secondary variant
  }
  
  &--disabled {
    // Disabled state
  }
}
```

---

## 🎯 TypeScript 規範

### 型別定義

```tsx
// ✅ 定義清晰的介面
interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  metadata: {
    readTime: number;
    views: number;
  };
}

// ✅ Props 型別
interface ArticleCardProps {
  post: Post;
  featured?: boolean;
  onTagClick?: (tag: string) => void;
}

// ✅ 使用泛型
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// ✅ 使用 Union Types
type Theme = 'light' | 'dark';
type ButtonVariant = 'primary' | 'secondary' | 'outline';
```

### 避免 any

```tsx
// ❌ 錯誤
const fetchData = async (): Promise<any> => { }

// ✅ 正確
const fetchData = async (): Promise<Post[]> => { }

// ✅ 未知型別使用 unknown
const handleData = (data: unknown) => {
  if (isPost(data)) {
    // 型別收窄後使用
  }
};
```

---

## 📚 文件與註解規範

### 元件文件

```tsx
/**
 * ArticleCard 元件
 *
 * 用於展示文章卡片，包含標題、摘要、日期和標籤。
 *
 * @component
 * @example
 * ```tsx
 * <ArticleCard
 *   post={post}
 *   featured={true}
 *   onTagClick={(tag) => console.log(tag)}
 * />
 * ```
 *
 * Features:
 * - 支援精選文章樣式
 * - 標籤可點擊
 * - 響應式設計
 * - 深色模式支援
 *
 * Reason: 拆成純展示元件，邏輯抽離至 useArticle hook
 */
export const ArticleCard: React.FC<ArticleCardProps> = ({ ... }) => {
  // ...
};
```

### 複雜邏輯註解

```tsx
// Reason: 使用 useMemo 避免每次渲染都重新計算
const sortedPosts = useMemo(() => {
  return posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}, [posts]);

// Reason: 防抖避免頻繁搜尋請求
const debouncedSearch = useDebounce(searchTerm, 500);
```

### README.md 結構

```markdown
# 元件/模組名稱

## 功能說明
簡短描述這個元件/模組的用途

## 使用方式
程式碼範例

## Props / API
參數說明

## 注意事項
特殊情況或限制

## 相關連結
相關文件或資源
```

---

## 🔄 Git Commit 規範

使用 **Conventional Commits** 格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 類型

| Type | 說明 | 範例 |
|------|------|------|
| `feat` | 新功能 | `feat: 新增使用者登入功能` |
| `fix` | Bug 修復 | `fix: 修復購物車數量計算錯誤` |
| `docs` | 文件更新 | `docs: 更新 API 文件` |
| `style` | 樣式調整 | `style: 調整按鈕樣式` |
| `refactor` | 重構 | `refactor: 重構商品列表元件` |
| `perf` | 效能優化 | `perf: 優化圖片載入速度` |
| `test` | 測試 | `test: 新增 Button 元件測試` |
| `chore` | 雜項 | `chore: 更新依賴套件` |
| `ci` | CI/CD | `ci: 新增自動部署設定` |

### Commit 範例

```bash
# 簡單 commit
git commit -m "feat: 新增文章搜尋功能"

# 詳細 commit
git commit -m "feat(search): 新增文章搜尋功能

- 實作搜尋輸入框
- 新增防抖處理
- 支援標籤篩選

Closes #123"
```

---

## ✅ 程式碼審查檢查清單

### TypeScript
- [ ] 型別定義完整，無使用 `any`
- [ ] Props 有清楚的介面定義
- [ ] 有處理可選屬性的預設值

### 元件設計
- [ ] 元件職責單一清晰
- [ ] UI 元件保持純展示（無業務邏輯）
- [ ] Props 驗證完整
- [ ] 有適當的預設值

### 錯誤處理
- [ ] 有處理 loading 狀態
- [ ] 有處理 error 狀態
- [ ] 有適當的錯誤訊息
- [ ] API 請求有 try-catch

### 效能優化
- [ ] 使用 `useMemo` 快取計算結果
- [ ] 使用 `useCallback` 避免函數重建
- [ ] 避免不必要的重新渲染
- [ ] 大型列表使用虛擬滾動

### 樣式
- [ ] 使用 CSS Variables
- [ ] 支援深色/淺色模式
- [ ] 響應式設計實作
- [ ] BEM 命名規範

### 可維護性
- [ ] 無 `console.log` 殘留
- [ ] 有適當的註解說明
- [ ] 複雜邏輯有 `// Reason:` 註解
- [ ] 元件有文件說明區塊

### 可訪問性 (A11y)
- [ ] 語義化 HTML 標籤
- [ ] 圖片有 alt 屬性
- [ ] 按鈕有適當的 aria-label
- [ ] 鍵盤導航支援

### SEO
- [ ] 標題層級清晰（H1 → H2 → H3）
- [ ] Meta tags 完整
- [ ] 圖片有 alt 屬性
- [ ] 有適當的語義化標籤

---

## 🚀 開發流程

### 1. 開始開發新功能

```bash
# 1. 建立新分支
git checkout -b feat/article-search

# 2. 開發功能
# - 實作元件
# - 撰寫樣式
# - 新增測試

# 3. 提交變更
git add .
git commit -m "feat: 新增文章搜尋功能"

# 4. 推送到遠端
git push origin feat/article-search

# 5. 建立 Pull Request
```

### 2. Code Review 重點

審查者應檢查：
1. 符合命名規範
2. 型別定義完整
3. 無多餘程式碼
4. 有適當註解
5. 符合設計系統
6. 通過所有檢查清單

### 3. 合併後

```bash
# 1. 切回主分支
git checkout main

# 2. 拉取最新代碼
git pull origin main

# 3. 刪除本地分支
git branch -d feat/article-search
```

---

## 📦 SCSS 架構

### 檔案組織

```scss
// styles.scss (主檔案)
@import 'core/theme/variables';
@import 'core/reset';
@import 'core/typography';
@import 'core/global';

@import 'components/Navbar';
@import 'components/Button';
@import 'components/ArticleCard';
// ... 其他元件
```

### 變數使用

```scss
// ✅ 直接使用 CSS Variables
.card {
  background-color: var(--color-bg-card);
  padding: var(--card-padding-base);
  border-radius: var(--card-radius);
  box-shadow: var(--shadow-base);
  
  // Hover 效果
  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
  }
}

// ✅ 響應式設計
@media (max-width: 768px) {
  .card {
    padding: var(--card-padding-sm);
  }
}
```

### 元件樣式範例

```scss
// components/ArticleCard.scss
.article-card {
  background: var(--color-bg-card);
  border-radius: var(--card-radius);
  padding: var(--card-padding-base);
  border: 1px solid var(--color-border-primary);
  transition: all var(--transition-base) var(--transition-timing-ease);
  
  // Elements
  &__header {
    margin-bottom: var(--spacing-4);
  }
  
  &__title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-2);
  }
  
  &__excerpt {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
  }
  
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--spacing-4);
    padding-top: var(--spacing-4);
    border-top: 1px solid var(--color-border-primary);
  }
  
  // Modifiers
  &--featured {
    border: 2px solid var(--color-brand-primary);
    box-shadow: var(--shadow-lg);
  }
  
  // States
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-brand-primary);
  }
  
  // Responsive
  @media (max-width: 768px) {
    padding: var(--card-padding-sm);
    
    &__title {
      font-size: var(--font-size-xl);
    }
  }
}
```

---

## 🎨 Markdown 支援

### Frontmatter 格式

```markdown
---
title: React 18 新特性完整指南
excerpt: 深入探討 React 18 的 Concurrent Features
date: 2024-10-10
tags:
  - React
  - JavaScript
  - Frontend
author:
  name: kimi-kiki
  avatar: /images/avatar.jpg
featured: true
---

# 文章內容開始...
```

### 支援功能

| 功能 | 說明 |
|------|------|
| 標題層級 | `#` `##` `###` 自動生成 TOC |
| 程式碼區塊 | Syntax Highlighting（深色底） |
| 引用 | 特殊樣式呈現 |
| 分隔線 | 視覺區隔 |
| 連結 | 內部/外部連結 |
| 圖片 | 響應式寬度 |
| 表格 | 響應式表格 |
| 列表 | 有序/無序列表 |

---

## 🔧 實用工具函數

### 日期格式化

```typescript
// lib/utils.ts
export const formatDate = (date: string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
```

### 閱讀時間計算

```typescript
export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};
```

### 標籤處理

```typescript
export const getAllTags = (posts: Post[]): string[] => {
  const tags = posts.flatMap(post => post.tags);
  return Array.from(new Set(tags)).sort();
};
```

---

## 🌐 SEO 最佳實踐

### Meta Tags 設定

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'kimi-kiki Blog | 技術分享',
    template: '%s | kimi-kiki Blog',
  },
  description: '分享程式開發、AI 技術與學習心得',
  keywords: ['技術部落格', 'React', 'TypeScript', 'AI'],
  authors: [{ name: 'kimi-kiki' }],
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: 'https://kimi-kiki.dev',
    siteName: 'kimi-kiki Blog',
  },
};
```

### 結構化資料

```tsx
// app/posts/[slug]/page.tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  datePublished: post.date,
  author: {
    '@type': 'Person',
    name: post.author.name,
  },
};
```

---

## 🎯 效能優化建議

### 圖片優化

```tsx
import Image from 'next/image';

// ✅ 使用 Next.js Image 元件
<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // 首屏圖片
  placeholder="blur" // 載入中模糊
/>
```

### 程式碼分割

```tsx
// ✅ 動態引入
const CommentSection = dynamic(() => import('@/components/CommentSection'), {
  loading: () => <CommentSkeleton />,
  ssr: false, // 不需要 SSR 的元件
});
```

### 資料快取

```tsx
// ✅ 使用 Next.js 快取
export const revalidate = 3600; // 1 小時重新驗證

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}
```

---

## 📌 重要提醒

### DO's ✅
- 保持元件簡潔（< 300 行）
- 使用 TypeScript 型別
- 遵循 BEM 命名規範
- 使用 CSS Variables
- 撰寫清晰註解
- 提交前自我審查
- 保持程式碼一致性

### DON'Ts ❌
- 避免使用 `any` 型別
- 不要留下 `console.log`
- 不要寫巨型元件
- 不要重複程式碼
- 不要忽略錯誤處理
- 不要跳過型別檢查
- 不要忽略可訪問性

---

## 📞 需要協助時

當你需要 Claude 協助開發時，可以：

1. **提及特定元件**："請幫我建立 ArticleCard 元件"
2. **參考規範**："依照專案的命名規範..."
3. **引用設計系統**："使用專案的 Design Tokens..."
4. **遵循架構**："放在 components/article/ 目錄下"
5. **符合限制**："確保檔案不超過 300 行"

Claude 會根據這份文件提供符合專案規範的建議和程式碼！

---

## 🔄 文件更新

這份文件會隨著專案演進持續更新。

**最後更新**: 2024-10-14
**版本**: 1.0.0

---

> 💡 **提示**: 開發時隨時參考這份文件，確保符合專案規範！