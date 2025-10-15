# kimi-kiki Blog

> 🚀 一個基於 Next.js 15 的現代化技術部落格平台，專注於學習紀錄與技術分享

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![SCSS](https://img.shields.io/badge/SCSS-1.93-cc6699?style=flat-square&logo=sass)](https://sass-lang.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

## 📋 專案簡介

這是一個為技術分享而生的部落格平台，採用 Next.js App Router 架構，使用 Markdown 撰寫文章，搭配完整的設計系統與響應式佈局。

### 🎯 目標受眾

- 同行工程師
- 技術愛好者
- 一般大眾

### 🌟 主要特色

- ✅ **現代化技術棧**: Next.js 15 + React 19 + TypeScript
- ✅ **Markdown 撰寫**: 支援 MDX，輕鬆撰寫技術文章
- ✅ **完整設計系統**: 使用 CSS Variables 與 SCSS
- ✅ **深色模式**: 亮色/暗色主題切換
- ✅ **響應式設計**: 完美支援手機、平板、桌面
- ✅ **SEO 優化**: 完整的 Meta Tags 與結構化資料
- ✅ **標籤系統**: 文章分類與篩選
- ✅ **側邊欄導覽**: 熱門標籤 + 推薦閱讀

---

## 🚀 快速開始

### 環境需求

- **Node.js**: >= 20.x
- **npm**: >= 10.x

### 安裝步驟

```bash
# 1. 複製專案
git clone https://github.com/kimi-kiki/kimi-kiki-blog.git
cd kimi-kiki-blog

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm run dev

# 4. 開啟瀏覽器
# 訪問 http://localhost:3000
```

### 可用指令

```bash
npm run dev       # 啟動開發伺服器 (Turbopack)
npm run build     # 建置生產版本
npm run start     # 啟動生產伺服器
npm run lint      # 執行 ESLint 檢查
```

---

## 📁 專案結構

```text
kimi-kiki-blog/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 共用 Layout (Navbar, Footer, Theme)
│   ├── page.tsx                 # 首頁：文章列表
│   ├── tags/
│   │   ├── page.tsx            # 標籤列表頁
│   │   └── [tag]/page.tsx      # 單一標籤文章列表
│   ├── posts/
│   │   └── [slug]/page.tsx     # 單篇文章頁
│   ├── about/page.tsx          # 關於我
│   └── contact/page.tsx        # 聯絡我
│
├── components/                  # React 元件
│   ├── layout/                 # 佈局元件
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── ThemeSwitcher.tsx
│   ├── article/                # 文章相關元件
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleList.tsx
│   │   └── TOC.tsx             # 目錄
│   ├── home/
│   │   └── HeroBanner.tsx      # 首頁橫幅
│   └── ui/                     # UI 元件
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── TagBadge.tsx
│       └── Input.tsx
│
├── content/                     # Markdown 文章
│   └── posts/
│       ├── post-1.md
│       ├── post-2.md
│       └── ...
│
├── lib/                         # 工具函數
│   ├── markdown.ts             # Markdown 解析
│   ├── posts.ts                # 文章資料處理
│   └── utils.ts                # 通用工具
│
├── scss/                        # 樣式系統
│   ├── core/                   # 核心樣式
│   │   ├── theme/
│   │   │   ├── _variables.scss    # Design Tokens
│   │   │   ├── _light-theme.scss  # 亮色主題
│   │   │   └── _dark-theme.scss   # 深色主題
│   │   ├── _reset.scss
│   │   ├── _typography.scss
│   │   └── _global.scss
│   ├── components/             # 元件樣式
│   │   ├── Navbar.scss
│   │   ├── ArticleCard.scss
│   │   └── ...
│   ├── pages/                  # 頁面樣式
│   │   ├── _tags.scss
│   │   ├── _about.scss
│   │   └── _contact.scss
│   └── styles.scss             # SCSS 主檔案
│
├── types/                       # TypeScript 型別定義
│   └── post.ts
│
├── public/                      # 靜態資源
│   ├── images/
│   └── fonts/
│
├── CLAUDE.md                    # 專案開發文件 (AI 上下文)
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 🎨 設計系統

### Design Tokens

專案使用完整的 Design Tokens 系統,所有樣式變數定義在 `scss/core/theme/_variables.scss`:

#### 🎨 顏色系統

- **Brand Colors**: 品牌主色、懸浮色、淺色、深色
- **Background Colors**: 主背景、次要背景、卡片背景
- **Text Colors**: 主文字、次要文字、連結
- **Border Colors**: 主邊框、次要邊框、聚焦邊框
- **Status Colors**: 成功、警告、錯誤、資訊
- **Tag Colors**: React、TypeScript、JavaScript、AI 等

#### 📝 排版系統

- **Font Family**: sans、serif、mono
- **Font Size**: 12px - 60px
- **Font Weight**: 300 - 800
- **Line Height**: 1 - 2

#### 📏 間距與佈局

- **Spacing**: 4px - 128px (使用 4px 基準)
- **Border Radius**: 4px - 完全圓形
- **Z-Index**: 0 - 100 (分層管理)

### CSS Variables 範例

```scss
.card {
  background-color: var(--color-bg-card);
  padding: var(--card-padding-base);
  border-radius: var(--card-radius);
  box-shadow: var(--shadow-base);
}

// 主題切換
[data-theme="dark"] {
  --color-bg-primary: #0f172a;
  --color-text-primary: #f1f5f9;
}
```

---

## 📝 撰寫文章

### Frontmatter 格式

在 `content/posts/` 目錄下建立 `.md` 檔案:

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

## 章節一

文章內容...
```

### 支援功能

| 功能 | 說明 |
|------|------|
| 標題層級 | `#` `##` `###` 自動生成 TOC |
| 程式碼區塊 | Syntax Highlighting |
| 引用 | 特殊樣式呈現 |
| 分隔線 | 視覺區隔 |
| 連結 | 內部/外部連結 |
| 圖片 | 響應式寬度 |
| 表格 | 響應式表格 |
| 列表 | 有序/無序列表 |

---

## 🛠️ 技術棧

### 核心技術

| 技術 | 版本 | 用途 |
|------|------|------|
| **Next.js** | 15.5 | React 框架 (App Router) |
| **React** | 19.2 | UI 函式庫 |
| **TypeScript** | 5.9 | 型別系統 |
| **SCSS** | 1.93 | 樣式預處理器 |

### 依賴套件

```json
{
  "dependencies": {
    "next": "^15.5.5",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "gray-matter": "^4.0.3",      // Markdown frontmatter 解析
    "remark": "^15.0.1",           // Markdown 處理
    "remark-html": "^16.0.1",      // Markdown 轉 HTML
    "lucide-react": "^0.545.0",    // Icon 圖示
    "date-fns": "^4.1.0"           // 日期格式化
  },
  "devDependencies": {
    "@types/node": "^24.7.2",
    "@types/react": "^19.2.2",
    "typescript": "^5.9.3",
    "sass": "^1.93.2",
    "eslint": "^9.37.0",
    "eslint-config-next": "^15.5.5",
    "@playwright/test": "^1.56.0"  // E2E 測試
  }
}
```

---

## 📐 開發規範

### 命名規範

| 類型 | 規範 | 範例 |
|------|------|------|
| 元件 | PascalCase | `Button`, `ArticleCard` |
| 檔案 (元件) | PascalCase | `Button.tsx`, `UserProfile.tsx` |
| 檔案 (工具) | camelCase | `utils.ts`, `formatDate.ts` |
| 變數/函數 | camelCase | `getUserData`, `isLoading` |
| 常數 | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_ITEMS` |
| 型別/介面 | PascalCase | `User`, `PostMetadata` |
| Hook | camelCase (use 開頭) | `useTheme`, `usePosts` |

### CSS/SCSS (BEM 命名法)

```scss
// Block (區塊)
.article-card { }

// Element (元素)
.article-card__title { }
.article-card__excerpt { }

// Modifier (修飾符)
.article-card--featured { }
.article-card--large { }
```

### Git Commit 規範

使用 **Conventional Commits** 格式:

```bash
# Type 類型
feat:      新功能
fix:       Bug 修復
docs:      文件更新
style:     樣式調整
refactor:  重構
perf:      效能優化
test:      測試
chore:     雜項

# 範例
git commit -m "feat: 新增文章搜尋功能"
git commit -m "fix: 修復標籤篩選錯誤"
git commit -m "style: 調整 Navbar 樣式"
```

---

## 🎯 核心功能

### 🏠 首頁 (Home Page)

- Hero Section 橫幅
- 文章卡片列表
- 側邊欄 (熱門標籤 + 推薦閱讀)
- 分頁功能

### 📄 文章頁 (Post Page)

- 文章標題、日期、標籤
- Markdown 內容渲染
- 目錄 (TOC)
- 上一篇/下一篇導覽
- 留言系統 (Giscus/Disqus)

### 🏷️ 標籤頁 (Tags Page)

- 所有標籤列表
- 每個標籤的文章數量
- 標籤文章篩選

### 👩‍💻 關於頁 (About Page)

- 個人簡介與頭像
- 技能展示
- 社群連結 (GitHub, LinkedIn, Twitter)

### 📬 聯絡頁 (Contact Page)

- 聯絡表單
- 直接聯絡方式 (Email, X, LinkedIn)

---

## 🌐 部署

### Vercel (推薦)

```bash
# 1. 安裝 Vercel CLI
npm i -g vercel

# 2. 登入
vercel login

# 3. 部署
vercel
```

### 其他平台

- **Netlify**: 支援 Next.js
- **Railway**: 支援 Node.js
- **自架**: 使用 `npm run build && npm run start`

---

## 📚 參考資源

### 官方文件

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [SCSS Documentation](https://sass-lang.com/documentation/)

### 設計參考

- [互動式設計原型](blog-design-prototype.html)
- [CLAUDE.md - 完整專案文件](CLAUDE.md)

---

## 🤝 貢獻指南

歡迎提交 Issue 或 Pull Request!

### 開發流程

```bash
# 1. Fork 專案
# 2. 建立分支
git checkout -b feat/your-feature

# 3. 開發功能
# 4. 提交變更
git commit -m "feat: 新增功能"

# 5. 推送分支
git push origin feat/your-feature

# 6. 建立 Pull Request
```

### 審查重點

- [ ] 符合命名規範
- [ ] 型別定義完整
- [ ] 有適當註解
- [ ] 符合設計系統
- [ ] 通過 ESLint 檢查

---

## 📄 授權

MIT License - 詳見 [LICENSE](./LICENSE)

---

## 👤 作者

### kimi-kiki

- GitHub: [@kimi-kiki](https://github.com/kimi-kiki)
- Email: <katytsai.git@gmail.com>

---

## 🙏 致謝

- Next.js 團隊提供優秀的框架
- React 社群的持續支援
- 所有開源貢獻者

---

### Built with ❤️ and Next.js
