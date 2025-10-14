---
title: Next.js 14+ 完整入門指南
excerpt: 深入了解 Next.js 14 的新特性，包含 App Router、Server Components 等核心概念，以及如何建立現代化的 React 應用程式。
date: 2024-10-13
tags:
  - React
  - Next.js
  - TypeScript
  - Frontend
author:
  name: kimi-kiki
  avatar: /images/avatar.jpg
featured: false
views: 890
---

# Next.js 14+ 完整入門指南

Next.js 是一個強大的 React 框架，提供了許多開箱即用的功能，讓我們能夠快速建立高效能的 Web 應用程式。

## 什麼是 Next.js？

Next.js 是由 Vercel 開發的 React 框架，它提供了：

- **Server-Side Rendering (SSR)**：伺服器端渲染
- **Static Site Generation (SSG)**：靜態網站生成
- **API Routes**：內建 API 路由
- **File-based Routing**：基於檔案的路由系統

## Next.js 14 的新特性

### App Router

Next.js 14 引入了全新的 App Router，提供更強大的路由功能：

```typescript
// app/page.tsx
export default function HomePage() {
  return (
    <main>
      <h1>Welcome to Next.js 14</h1>
    </main>
  )
}
```

### Server Components

預設情況下，App Router 中的所有元件都是 Server Components：

```typescript
// Server Component (default)
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data.title}</div>
}
```

### Client Components

當需要使用 hooks 或瀏覽器 API 時，使用 'use client' 指令：

```typescript
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

## 建立 Next.js 專案

使用以下命令快速建立新專案：

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

## 路由系統

Next.js 使用檔案系統作為路由：

```
app/
├── page.tsx          # /
├── about/
│   └── page.tsx      # /about
└── posts/
    └── [id]/
        └── page.tsx  # /posts/:id
```

## 資料獲取

### Server-side Data Fetching

```typescript
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store' // 動態資料
  })

  return <div>{/* Render data */}</div>
}
```

### Static Data Fetching

```typescript
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // 每小時重新驗證
  })

  return <div>{/* Render data */}</div>
}
```

## Metadata API

優化 SEO 的 Metadata：

```typescript
export const metadata = {
  title: 'My Page',
  description: 'Page description',
}

export default function Page() {
  return <div>Content</div>
}
```

## 結論

Next.js 14 帶來了許多強大的新特性，使得建立現代化 Web 應用程式變得更加簡單高效。透過 App Router 和 Server Components，我們能夠構建更快速、更優化的應用程式。

在後續的文章中，我會繼續深入探討 Next.js 的進階功能！

## 參考資源

- [Next.js 官方文件](https://nextjs.org/docs)
- [App Router 指南](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
