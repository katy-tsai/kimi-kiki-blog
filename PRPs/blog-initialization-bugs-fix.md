# PRP: Fix Blog Initialization Bugs

## Goal
Fix two critical bugs in the kimi-kiki blog:
1. Article cards not navigating to detail pages (404 error)
2. Implementation not matching the interactive design prototype specifications

By the end of this PRP, users should be able to click on article cards and view full post details, and the blog should match the design prototype with proper styling, sidebar, hero banner, and all specified pages.

## Why
- **User Experience**: Users cannot read full articles, making the blog unusable
- **Design Consistency**: The current implementation doesn't match the approved design, leading to poor UX
- **Project Completion**: Core pages (Tags, About, Contact) are missing
- **Feature Completeness**: Key features like TOC, theme switching, and sidebar are not implemented

## What
Fix the following issues to make the blog fully functional and design-compliant:

### Success Criteria
- [ ] Clicking on article cards navigates to a properly rendered post detail page
- [ ] Post detail page displays with TOC, markdown content, and prev/next navigation
- [ ] Home page has hero banner matching design prototype
- [ ] Collapsible sidebar with hot tags and recommended posts
- [ ] Theme switcher (light/dark mode) fully functional
- [ ] Tags page displays all tags and filters articles
- [ ] About page with profile and tech stack
- [ ] Contact page with contact form
- [ ] All pages match the design prototype styling
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Next.js build completes without errors

## All Needed Context

### Documentation & References
```yaml
# MUST READ - Core documentation for implementation

- url: https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes
  why: Understanding Next.js 15 App Router dynamic routes ([slug] pattern)
  critical: generateStaticParams for static generation at build time

- url: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
  why: Pre-render dynamic routes for blog posts at build time
  critical: Must return array of slugs for all markdown posts

- url: https://github.com/remarkjs/remark-toc
  why: Generate table of contents from markdown headings
  critical: Requires proper heading structure in markdown

- url: https://github.com/Microflash/rehype-toc
  why: Alternative TOC generation using rehype (HTML AST)
  note: May need rehype-slug and rehype-autolink-headings

- url: https://reacthustle.com/blog/nextjs-react-responsive-collapsible-sidebar-tailwind
  why: Pattern for responsive collapsible sidebar
  critical: Use CSS/SCSS approach to match existing styling system

- file: blog-design-prototype.html
  why: Complete visual and interaction specification
  critical: |
    - Sidebar must be collapsible (toggle button at fixed position)
    - Hero banner with gradient background on home page
    - Article cards with hover effects (translateY, shadow)
    - Post page with TOC, code blocks, prev/next navigation
    - Theme toggle icon changes (🌙/☀️)
    - All spacing, colors, and typography must match

- file: CLAUDE.md
  why: Project coding standards and conventions
  critical: |
    - BEM naming for SCSS
    - TypeScript interfaces for all props
    - Files under 300 lines
    - Use existing CSS variables from scss/core/theme/_variables.scss
    - Document components with JSDoc comments
    - Follow existing patterns in components/

- file: scss/core/theme/_variables.scss
  why: Design tokens (CSS variables) for the entire project
  critical: |
    - ALL colors, spacing, typography must use these variables
    - Dark mode handled via [data-theme="dark"]
    - Examples: var(--color-bg-card), var(--spacing-4), var(--shadow-lg)

- file: lib/posts.ts
  why: Existing utility functions for post operations
  critical: |
    - getAllPosts(): Get all markdown posts
    - getPostBySlug(slug): Get single post by slug
    - getSortedPosts(): Get posts sorted by date
    - getAllTags(): Get unique tags
    - Already handles markdown parsing via lib/markdown.ts

- file: types/post.ts
  why: TypeScript interfaces for Post data
  critical: |
    interface Post {
      slug: string
      title: string
      excerpt: string
      date: string
      tags: string[]
      author: { name: string; avatar?: string }
      content: string  // HTML from markdown
      readTime?: number
      featured?: boolean
    }
```

### Current Codebase Structure
```bash
kimi-kiki-blog/
├── app/
│   ├── layout.tsx                    # ✅ Root layout with Navbar/Footer
│   ├── page.tsx                      # ✅ Home page (needs hero banner)
│   ├── globals.scss                  # ✅ Imports main SCSS
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx              # ❌ MISSING - BUG #1
│   ├── tags/
│   │   ├── page.tsx                  # ❌ MISSING - All tags list
│   │   └── [tag]/page.tsx            # ❌ MISSING - Tag filter page
│   ├── about/
│   │   └── page.tsx                  # ❌ MISSING
│   └── contact/
│       └── page.tsx                  # ❌ MISSING
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # ✅ Exists
│   │   ├── Footer.tsx                # ✅ Exists
│   │   ├── ThemeSwitcher.tsx         # ✅ Exists (needs implementation)
│   │   └── Sidebar.tsx               # ❌ MISSING
│   ├── article/
│   │   ├── ArticleCard.tsx           # ✅ Exists (has Link to /posts/[slug])
│   │   ├── ArticleList.tsx           # ✅ Exists
│   │   └── TOC.tsx                   # ❌ MISSING
│   ├── home/
│   │   └── HeroBanner.tsx            # ❌ MISSING
│   └── ui/
│       ├── Button.tsx                # ✅ Exists
│       ├── Card.tsx                  # ✅ Exists
│       └── TagBadge.tsx              # ✅ Exists
│
├── lib/
│   ├── posts.ts                      # ✅ Exists - post utilities
│   ├── markdown.ts                   # ✅ Exists - markdown parser
│   └── utils.ts                      # ✅ May exist
│
├── scss/
│   ├── core/
│   │   ├── theme/_variables.scss     # ✅ Complete design tokens
│   │   ├── _reset.scss               # ✅ Exists
│   │   ├── _typography.scss          # ✅ Exists
│   │   └── _global.scss              # ✅ Exists
│   ├── components/
│   │   ├── _navbar.scss              # ✅ Exists
│   │   ├── _footer.scss              # ✅ Exists
│   │   ├── _sidebar.scss             # ❌ MISSING
│   │   ├── _hero-banner.scss         # ❌ MISSING
│   │   ├── _toc.scss                 # ❌ MISSING
│   │   └── ...                       # Other component styles exist
│   ├── pages/
│   │   ├── _home.scss                # ✅ Exists (needs hero)
│   │   ├── _post.scss                # ❌ MISSING
│   │   ├── _tags.scss                # ❌ MISSING
│   │   ├── _about.scss               # ❌ MISSING
│   │   └── _contact.scss             # ❌ MISSING
│   └── styles.scss                   # ✅ Main SCSS entry
│
├── content/
│   └── posts/
│       ├── hello-world.md            # ✅ Sample post
│       └── nextjs-intro.md           # ✅ Sample post
│
└── blog-design-prototype.html        # ✅ Design reference
```

### Desired Codebase Structure (After Fix)
```bash
# NEW FILES TO CREATE:

app/posts/[slug]/page.tsx             # Dynamic post detail page
app/tags/page.tsx                     # All tags page
app/tags/[tag]/page.tsx               # Tag filter page
app/about/page.tsx                    # About page
app/contact/page.tsx                  # Contact page

components/layout/Sidebar.tsx         # Collapsible sidebar
components/article/TOC.tsx            # Table of contents
components/home/HeroBanner.tsx        # Hero banner

scss/components/_sidebar.scss         # Sidebar styles
scss/components/_hero-banner.scss     # Hero banner styles
scss/components/_toc.scss             # TOC styles
scss/pages/_post.scss                 # Post detail page styles
scss/pages/_tags.scss                 # Tags page styles
scss/pages/_about.scss                # About page styles
scss/pages/_contact.scss              # Contact page styles

# FILES TO MODIFY:

app/page.tsx                          # Add HeroBanner and Sidebar
app/layout.tsx                        # Add ThemeSwitcher to body
components/layout/ThemeSwitcher.tsx   # Implement theme toggle logic
scss/styles.scss                      # Import new SCSS files
```

### Known Gotchas & Library Quirks
```typescript
// CRITICAL: Next.js 15 App Router caching
// - GET routes are NOT cached by default in Next.js 15
// - Use `export const revalidate = 3600` for ISR
// - generateStaticParams pre-renders at BUILD time

// CRITICAL: remark/rehype markdown processing
// - remark works on markdown AST
// - rehype works on HTML AST
// - Use remark-html to convert markdown to HTML (already in package.json)
// - For TOC: Can extract headings during markdown parse OR use remark-toc

// CRITICAL: CSS Variables & Theme Switching
// - Theme toggle must add/remove [data-theme="dark"] on <html> element
// - Store preference in localStorage
// - Apply theme before render to avoid flash

// CRITICAL: BEM Naming Convention
// - Block: .sidebar
// - Element: .sidebar__toggle-btn
// - Modifier: .sidebar--collapsed
// - Never nest BEM classes more than 3 levels

// CRITICAL: TypeScript in Next.js 15
// - Page components receive params as a Promise in Next.js 15
// - Must await params: const { slug } = await params
// - Not async in earlier versions

// CRITICAL: Link vs onClick for Navigation
// - ArticleCard ALREADY has Link wrapper (line 37 in ArticleCard.tsx)
// - Bug is NOT the Link - bug is MISSING destination page
// - Don't add onClick handlers - keep Next.js Link for SEO

// CRITICAL: Markdown Frontmatter Format (from hello-world.md)
/*
---
title: String
excerpt: String
date: YYYY-MM-DD
tags:
  - Tag1
  - Tag2
author:
  name: String
  avatar: String (optional)
featured: Boolean (optional)
---
*/
```

## Implementation Blueprint

### Phase 1: Fix Core Bug - Create Post Detail Page

**CRITICAL: This fixes Bug #1 - Article navigation**

```typescript
// CREATE app/posts/[slug]/page.tsx

/**
 * Post Detail Page
 *
 * Displays full blog post with:
 * - Post header (title, date, tags, read time)
 * - Table of contents (TOC)
 * - Markdown content rendered as HTML
 * - Prev/Next post navigation
 * - Comment section placeholder
 *
 * Uses generateStaticParams for static generation
 */

import { getPostBySlug, getAllPosts, getSortedPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// CRITICAL: Next.js 15 - params is a Promise
interface PostPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  // Get prev/next posts
  const allPosts = await getSortedPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  return (
    <div className="post-page">
      <article className="post-container">
        {/* Post Header */}
        <header className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <time>{formatDate(post.date)}</time>
            {post.readTime && <span>⏱️ {post.readTime} min read</span>}
          </div>
          <div className="post-tags">
            {post.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
          </div>
        </header>

        {/* TOC Component */}
        <TOC content={post.content} />

        {/* Post Content */}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Prev/Next Navigation */}
        <nav className="post-navigation">
          {prevPost && <Link href={`/posts/${prevPost.slug}`}>← {prevPost.title}</Link>}
          {nextPost && <Link href={`/posts/${nextPost.slug}`}>{nextPost.title} →</Link>}
        </nav>

        {/* Comments Placeholder */}
        <section className="post-comments">
          <h3>💬 留言討論</h3>
          <p>使用 GitHub 帳號登入後即可留言 (整合 Giscus)</p>
        </section>
      </article>
    </div>
  )
}
```

### Phase 2: Create Table of Contents Component

```typescript
// CREATE components/article/TOC.tsx

/**
 * Table of Contents Component
 *
 * Extracts headings from HTML content and renders navigable TOC
 *
 * Reason: Helps users navigate long articles
 */

'use client'

interface TOCProps {
  content: string // HTML string
}

interface Heading {
  id: string
  text: string
  level: number
}

export const TOC: React.FC<TOCProps> = ({ content }) => {
  // Extract headings from HTML
  const headings = extractHeadings(content)

  if (headings.length === 0) return null

  return (
    <nav className="toc">
      <h3 className="toc__title">📑 目錄</h3>
      <ul className="toc__list">
        {headings.map(heading => (
          <li
            key={heading.id}
            className={`toc__item toc__item--level-${heading.level}`}
          >
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// Helper to extract headings from HTML
function extractHeadings(html: string): Heading[] {
  // Parse HTML to find h2, h3 elements
  // Generate IDs from text content
  // Return array of { id, text, level }

  const headings: Heading[] = []
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  doc.querySelectorAll('h2, h3').forEach((heading, index) => {
    const text = heading.textContent || ''
    const level = parseInt(heading.tagName[1])
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '')

    // Add id to heading in actual content
    heading.id = id

    headings.push({ id, text, level })
  })

  return headings
}
```

### Phase 3: Create Sidebar Component

```typescript
// CREATE components/layout/Sidebar.tsx

/**
 * Sidebar Component
 *
 * Collapsible sidebar with:
 * - Hot tags
 * - Recommended posts
 *
 * Features:
 * - Sticky positioning
 * - Collapsible animation
 * - Mobile responsive (hidden on mobile)
 */

'use client'

import { useState } from 'react'
import { TagBadge } from '@/components/ui/TagBadge'
import Link from 'next/link'
import type { Post } from '@/types/post'

interface SidebarProps {
  tags: string[]
  recommendedPosts: Post[]
}

export const Sidebar: React.FC<SidebarProps> = ({ tags, recommendedPosts }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Toggle Button */}
      <button
        className="sidebar-toggle"
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle sidebar"
      >
        {collapsed ? '▶' : '◀'}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
        <div className="sidebar__section">
          <h3 className="sidebar__title">🔥 熱門標籤</h3>
          <div className="sidebar__tags">
            {tags.map(tag => (
              <Link key={tag} href={`/tags/${tag}`}>
                <TagBadge tag={tag} />
              </Link>
            ))}
          </div>
        </div>

        <div className="sidebar__section">
          <h3 className="sidebar__title">📌 推薦閱讀</h3>
          <div className="sidebar__posts">
            {recommendedPosts.map(post => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="sidebar__post"
              >
                <div className="sidebar__post-title">{post.title}</div>
                <div className="sidebar__post-date">
                  🕒 {formatDate(post.date)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
```

### Phase 4: Create Hero Banner Component

```typescript
// CREATE components/home/HeroBanner.tsx

/**
 * Hero Banner Component
 *
 * Eye-catching banner for home page with gradient background
 *
 * Reason: Matches design prototype
 */

import { Button } from '@/components/ui/Button'

export const HeroBanner: React.FC = () => {
  return (
    <section className="hero-banner">
      <div className="hero-banner__content">
        <h1 className="hero-banner__title">
          歡迎來到 kimi-kiki 的技術部落格
        </h1>
        <p className="hero-banner__subtitle">
          分享程式開發、AI 技術與學習心得
        </p>
        <Button variant="primary" size="lg">
          開始閱讀 →
        </Button>
      </div>
    </section>
  )
}
```

### Phase 5: Implement Theme Switcher

```typescript
// MODIFY components/layout/ThemeSwitcher.tsx

'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

export const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Reason: Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  if (!mounted) return null

  return (
    <button
      className="theme-switcher"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}
```

### Phase 6: Create Additional Pages

```typescript
// CREATE app/tags/page.tsx - All tags list page
// CREATE app/tags/[tag]/page.tsx - Filtered by tag page
// CREATE app/about/page.tsx - About page with profile
// CREATE app/contact/page.tsx - Contact form page

// Each follows same pattern as post detail page:
// - Export metadata
// - Use getAllTags() or other lib functions
// - Match design prototype layout
```

### Phase 7: Create SCSS Styles

```scss
// CREATE scss/components/_sidebar.scss
.sidebar {
  width: var(--sidebar-width);
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  position: sticky;
  top: calc(var(--navbar-height) + var(--spacing-6));
  border: 1px solid var(--color-border-primary);
  transition: all var(--transition-base) var(--transition-timing-ease);

  &--collapsed {
    width: 0;
    padding: 0;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    display: none;
  }
}

.sidebar-toggle {
  position: fixed;
  left: var(--spacing-6);
  top: calc(var(--navbar-height) + var(--spacing-4));
  background-color: var(--color-brand-primary);
  color: var(--color-text-inverse);
  border: none;
  padding: var(--spacing-2);
  border-radius: var(--radius-base);
  cursor: pointer;
  z-index: var(--z-fixed);

  @media (max-width: 768px) {
    display: none;
  }
}

// CREATE scss/components/_hero-banner.scss
.hero-banner {
  background: linear-gradient(135deg, var(--color-brand-primary) 0%, var(--color-brand-primary-dark) 100%);
  border-radius: var(--radius-xl);
  padding: var(--spacing-12);
  margin-bottom: var(--spacing-12);
  color: var(--color-text-inverse);

  &__title {
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--spacing-4);
  }

  &__subtitle {
    font-size: var(--font-size-xl);
    opacity: 0.9;
    margin-bottom: var(--spacing-6);
  }

  @media (max-width: 768px) {
    padding: var(--spacing-8);

    &__title {
      font-size: var(--font-size-3xl);
    }
  }
}

// CREATE scss/components/_toc.scss
.toc {
  background-color: var(--color-bg-input);
  border-radius: var(--radius-base);
  padding: var(--spacing-6);
  margin-bottom: var(--spacing-8);
  border-left: 4px solid var(--color-brand-primary);

  &__title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--spacing-3);
  }

  &__list {
    list-style: none;
  }

  &__item {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-2);
    cursor: pointer;

    &:hover {
      color: var(--color-brand-primary);
    }

    &--level-3 {
      padding-left: var(--spacing-4);
    }
  }
}

// CREATE scss/pages/_post.scss
.post-page {
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding: var(--spacing-8) var(--spacing-6);
}

.post-container {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-12);
  border: 1px solid var(--color-border-primary);
}

.post-header {
  margin-bottom: var(--spacing-6);
}

.post-title {
  font-size: var(--article-title-size);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-4);
  color: var(--color-text-primary);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-4);
}

.post-content {
  font-size: var(--article-paragraph-size);
  line-height: var(--article-line-height);

  h2 {
    font-size: var(--article-heading-1);
    font-weight: var(--font-weight-semibold);
    margin: var(--spacing-8) 0 var(--spacing-4);
  }

  h3 {
    font-size: var(--article-heading-2);
    font-weight: var(--font-weight-semibold);
    margin: var(--spacing-6) 0 var(--spacing-3);
  }

  p {
    margin-bottom: var(--spacing-4);
  }

  pre {
    background-color: var(--color-bg-code);
    border-radius: var(--radius-base);
    padding: var(--spacing-4);
    overflow-x: auto;
    margin: var(--spacing-4) 0;

    code {
      color: var(--color-text-code);
      font-family: var(--font-mono);
      font-size: var(--font-size-sm);
    }
  }
}

.post-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-12);
  padding-top: var(--spacing-6);
  border-top: 2px solid var(--color-border-primary);

  a {
    background-color: var(--color-bg-card);
    border: 1px solid var(--color-border-primary);
    padding: var(--spacing-3) var(--spacing-6);
    border-radius: var(--radius-base);
    text-decoration: none;
    color: var(--color-text-primary);

    &:hover {
      border-color: var(--color-brand-primary);
    }
  }
}
```

## Task List (Implementation Order)

```yaml
Task 1: Create Post Detail Page
  File: app/posts/[slug]/page.tsx
  Dependencies: lib/posts.ts (already exists)
  Actions:
    - CREATE new file
    - IMPLEMENT generateStaticParams() for static generation
    - IMPLEMENT generateMetadata() for SEO
    - IMPLEMENT PostPage component with header, content, navigation
    - USE getPostBySlug() from lib/posts.ts
    - ADD prev/next post logic using getSortedPosts()
  Validation:
    - npm run dev
    - Navigate to http://localhost:3000
    - Click on article card
    - Should see post detail page (not 404)

Task 2: Create TOC Component
  File: components/article/TOC.tsx
  Actions:
    - CREATE new file
    - IMPLEMENT extractHeadings() helper function
    - PARSE HTML to find h2, h3 elements
    - GENERATE IDs for anchor links
    - RENDER navigable list
  Validation:
    - TOC appears on post detail page
    - Clicking TOC item scrolls to heading
    - Headings have proper nesting

Task 3: Create TOC Styles
  File: scss/components/_toc.scss
  Actions:
    - CREATE new file
    - USE BEM naming: .toc, .toc__title, .toc__item
    - USE CSS variables from _variables.scss
    - ADD hover effects
    - ADD level-based indentation
  Validation:
    - TOC matches design prototype
    - Hover effects work
    - Responsive on mobile

Task 4: Create Post Page Styles
  File: scss/pages/_post.scss
  Actions:
    - CREATE new file
    - STYLE .post-container, .post-header, .post-content
    - STYLE code blocks with dark background
    - STYLE prev/next navigation
    - ADD responsive breakpoints
  Validation:
    - Post page matches design prototype
    - Code blocks have proper styling
    - Responsive on mobile/tablet

Task 5: Create Sidebar Component
  File: components/layout/Sidebar.tsx
  Actions:
    - CREATE new file
    - IMPLEMENT collapsible state with useState
    - ACCEPT tags and recommendedPosts props
    - RENDER hot tags section
    - RENDER recommended posts section
    - ADD toggle button with fixed positioning
  Validation:
    - Sidebar appears on home page
    - Toggle button collapses/expands sidebar
    - Links work correctly

Task 6: Create Sidebar Styles
  File: scss/components/_sidebar.scss
  Actions:
    - CREATE new file
    - USE BEM naming
    - IMPLEMENT sticky positioning
    - ADD collapse animation
    - HIDE on mobile (display: none @media)
  Validation:
    - Sidebar sticky when scrolling
    - Collapse animation smooth
    - Hidden on mobile

Task 7: Create Hero Banner Component
  File: components/home/HeroBanner.tsx
  Actions:
    - CREATE new file
    - IMPLEMENT simple presentational component
    - USE Button component for CTA
    - MATCH design prototype text
  Validation:
    - Hero banner appears on home page
    - Gradient background renders

Task 8: Create Hero Banner Styles
  File: scss/components/_hero-banner.scss
  Actions:
    - CREATE new file
    - ADD gradient background
    - STYLE title and subtitle
    - ADD responsive breakpoints
  Validation:
    - Matches design prototype
    - Gradient correct colors
    - Responsive on mobile

Task 9: Update Home Page
  File: app/page.tsx
  Actions:
    - IMPORT HeroBanner and Sidebar components
    - ADD Sidebar with tags and recommended posts
    - ADD container layout with sidebar + main content
    - FETCH tags using getAllTags()
    - SELECT top 3 featured posts for recommendations
  Validation:
    - Home page shows hero banner
    - Sidebar appears with real data
    - Layout matches design prototype

Task 10: Implement Theme Switcher
  File: components/layout/ThemeSwitcher.tsx
  Actions:
    - MODIFY existing file
    - IMPLEMENT useState for theme
    - ADD useEffect to load from localStorage
    - IMPLEMENT toggleTheme function
    - SET [data-theme] attribute on <html>
    - RENDER Moon/Sun icon based on theme
  Validation:
    - Theme toggle button works
    - Dark mode applies correctly
    - Preference persists on reload

Task 11: Update Root Layout
  File: app/layout.tsx
  Actions:
    - IMPORT ThemeSwitcher
    - ADD ThemeSwitcher to Navbar
    - ENSURE proper positioning
  Validation:
    - Theme switcher appears in navbar
    - Works across all pages

Task 12: Create Tags List Page
  File: app/tags/page.tsx
  Actions:
    - CREATE new file
    - USE getAllTags() to get all tags
    - USE getAllPosts() to count articles per tag
    - RENDER grid of tag cards
    - MATCH design prototype
  Validation:
    - /tags page renders
    - Shows all tags with counts
    - Matches design

Task 13: Create Tag Filter Page
  File: app/tags/[tag]/page.tsx
  Actions:
    - CREATE new file
    - IMPLEMENT generateStaticParams for all tags
    - FILTER posts by tag
    - RENDER ArticleList with filtered posts
    - ADD back link to /tags
  Validation:
    - /tags/React page renders
    - Shows only React posts
    - generateStaticParams generates all tag pages

Task 14: Create About Page
  File: app/about/page.tsx
  Actions:
    - CREATE new file
    - ADD profile section with avatar
    - ADD tech stack grid
    - ADD social links
    - MATCH design prototype
  Validation:
    - /about page renders
    - Matches design prototype

Task 15: Create Contact Page
  File: app/contact/page.tsx
  Actions:
    - CREATE new file
    - ADD contact form (name, email, subject, message)
    - ADD direct contact info
    - MATCH design prototype
    - NOTE: Form submission not implemented (future feature)
  Validation:
    - /contact page renders
    - Form fields present
    - Matches design

Task 16: Create Page Styles
  Files:
    - scss/pages/_tags.scss
    - scss/pages/_about.scss
    - scss/pages/_contact.scss
  Actions:
    - CREATE new files for each page
    - USE CSS variables
    - MATCH design prototype
    - ADD responsive breakpoints
  Validation:
    - All pages match design
    - Responsive on all devices

Task 17: Update Main SCSS Import
  File: scss/styles.scss
  Actions:
    - IMPORT all new SCSS files
    - ENSURE proper order (variables → components → pages)
  Validation:
    - npm run build succeeds
    - All styles apply correctly

Task 18: Final Build & Test
  Actions:
    - RUN npm run build
    - FIX any TypeScript errors
    - FIX any build errors
    - TEST all pages manually
    - CHECK responsive design
    - VERIFY theme switcher
    - VERIFY all links work
  Validation:
    - Build succeeds with no errors
    - All pages render correctly
    - All functionality works
```

## Integration Points

```yaml
ROUTING:
  - ADD /posts/[slug] route with generateStaticParams
  - ADD /tags route for all tags
  - ADD /tags/[tag] route with generateStaticParams
  - ADD /about route
  - ADD /contact route

COMPONENTS:
  - INTEGRATE Sidebar into home page layout
  - INTEGRATE HeroBanner into home page
  - INTEGRATE TOC into post detail page
  - INTEGRATE ThemeSwitcher into Navbar

STYLING:
  - IMPORT all new SCSS files in scss/styles.scss
  - ENSURE all use CSS variables from _variables.scss
  - VERIFY dark mode works across all pages

DATA FLOW:
  - Home page: getAllTags(), getSortedPosts() for sidebar
  - Post page: getPostBySlug(), getSortedPosts() for nav
  - Tags page: getAllTags(), getAllPosts()
  - Tag filter page: getAllPosts() then filter by tag
```

## Validation Loop

### Level 1: Syntax & Style
```bash
# TypeScript compilation
npm run build

# Expected: No TypeScript errors
# If errors: Fix type definitions, check Next.js 15 params Promise
```

### Level 2: Development Server
```bash
# Start dev server
npm run dev

# Navigate to http://localhost:3000
# Test all pages:
# - Home page: Hero banner, sidebar, article list
# - Click article: Should navigate to /posts/[slug]
# - Post page: Header, TOC, content, prev/next nav
# - /tags: All tags list
# - /tags/React: Filtered articles
# - /about: Profile and tech stack
# - /contact: Contact form
# - Theme switcher: Toggle light/dark mode

# Expected: All pages render, all links work, no console errors
```

### Level 3: Build Validation
```bash
# Production build
npm run build

# Expected output:
# - ✓ Generating static pages (X/X)
# - ✓ Collecting page data
# - ✓ Finalizing page optimization
# - Route (app) Size First Load JS
#   ○ /                           XXX kB       XXX kB
#   ● /posts/[slug]               XXX kB       XXX kB
#   ● /tags/[tag]                 XXX kB       XXX kB
#   ...

# If errors: Check for missing imports, incorrect paths
```

### Level 4: Manual Testing Checklist
```yaml
Home Page:
  - [ ] Hero banner displays with gradient
  - [ ] Sidebar shows hot tags and recommended posts
  - [ ] Sidebar toggle button works
  - [ ] Article cards display correctly
  - [ ] Clicking article navigates to detail page

Post Detail Page:
  - [ ] Post header shows title, date, tags, read time
  - [ ] TOC displays and links work
  - [ ] Markdown content renders correctly
  - [ ] Code blocks have dark background
  - [ ] Prev/next navigation shows and works
  - [ ] Comment section placeholder displays

Tags Page:
  - [ ] All tags display with article counts
  - [ ] Clicking tag navigates to filter page

Tag Filter Page:
  - [ ] Shows only articles with selected tag
  - [ ] Article list works

About Page:
  - [ ] Profile section displays
  - [ ] Tech stack grid displays
  - [ ] Social links present

Contact Page:
  - [ ] Form fields present
  - [ ] Layout matches design

Theme Switcher:
  - [ ] Icon changes (Moon ↔ Sun)
  - [ ] Dark mode applies correctly
  - [ ] All pages support dark mode
  - [ ] Preference persists on reload

Responsive Design:
  - [ ] Mobile: Sidebar hidden, layout stacks
  - [ ] Tablet: Layout adjusts appropriately
  - [ ] Desktop: Full layout with sidebar
```

## Final Validation Checklist
- [ ] All TypeScript errors resolved: `npm run build`
- [ ] Development server runs without errors: `npm run dev`
- [ ] Production build succeeds: `npm run build && npm start`
- [ ] Article cards navigate to detail pages (Bug #1 FIXED)
- [ ] Implementation matches design prototype (Bug #2 FIXED)
- [ ] All new pages created and functional
- [ ] Theme switcher works across all pages
- [ ] Sidebar collapsible and responsive
- [ ] TOC generates and links work
- [ ] All SCSS uses CSS variables
- [ ] Dark mode works on all pages
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] All links and navigation work
- [ ] No console errors or warnings
- [ ] Code follows CLAUDE.md conventions
- [ ] Components under 300 lines each
- [ ] BEM naming in SCSS
- [ ] JSDoc comments on all components

---

## Anti-Patterns to Avoid
- ❌ Don't use inline styles - use CSS variables
- ❌ Don't skip generateStaticParams - needed for static generation
- ❌ Don't forget [data-theme] attribute for theme switching
- ❌ Don't use onClick on ArticleCard - Link already handles navigation
- ❌ Don't hardcode colors/spacing - use CSS variables
- ❌ Don't forget responsive breakpoints
- ❌ Don't skip TypeScript interfaces
- ❌ Don't create files over 300 lines
- ❌ Don't forget to await params in Next.js 15
- ❌ Don't skip accessibility attributes (aria-label, etc.)

---

## PRP Confidence Score: 9/10

### Why 9/10:
**Strengths:**
- ✅ Complete context provided (design prototype, existing code, conventions)
- ✅ All necessary documentation URLs included
- ✅ Existing patterns identified and documented
- ✅ Clear task breakdown with dependencies
- ✅ Validation steps at multiple levels
- ✅ Gotchas and library quirks documented
- ✅ Code examples with inline comments
- ✅ SCSS patterns with BEM naming
- ✅ TypeScript interfaces defined
- ✅ Next.js 15 specifics noted (params Promise)

**Minor Risk (-1 point):**
- TOC component may need refinement for client-side vs server-side rendering
- Some styling details may need adjustment to perfectly match prototype
- Contact form submission logic not implemented (noted as future feature)

**Mitigation:**
- Validation loop catches these issues
- Multiple test checkpoints before completion
- Can iterate on TOC implementation based on results

This PRP should enable one-pass implementation with high success rate. Any issues will be caught in validation loops and can be fixed iteratively.
