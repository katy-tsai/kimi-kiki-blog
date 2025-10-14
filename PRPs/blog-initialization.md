name: "kimi-kiki Blog Platform Initialization"
description: |

## Goal
Initialize a complete technical blog platform following Next.js 14+ App Router architecture with TypeScript, SCSS, and CSS Variables. This includes setting up the project structure, core components, and layout system as specified in CLAUDE.md documentation.

The end state should be a fully functional blog platform with:
- Properly initialized Next.js 14+ project with App Router
- Complete folder structure matching CLAUDE.md specifications
- SCSS architecture with CSS Variables
- Basic layout components (Navbar, Footer, Theme Switcher)
- Markdown content support with frontmatter
- Home page with article listing capability
- Type-safe TypeScript interfaces

## Why
- **User Impact**: Provides a professional technical blog platform for sharing knowledge and learning experiences
- **Integration**: Establishes the foundation for all future blog features (tags, comments, search, etc.)
- **Problems Solved**:
  - Creates a maintainable, scalable blog architecture
  - Implements design system with dark/light theme support
  - Provides type-safe development environment
  - Establishes consistent code organization patterns

## What
A Next.js 14+ blog platform with:

### User-Visible Behavior
1. **Homepage**: Displays article cards in a grid layout with sidebar
2. **Navigation**: Fixed navbar with theme switcher
3. **Responsive Design**: Mobile-friendly layout
4. **Theme Support**: Light/dark mode with smooth transitions
5. **Articles**: Markdown-based content with frontmatter support

### Technical Requirements
1. Next.js 14+ with App Router and TypeScript
2. SCSS with CSS Variables (design tokens already provided)
3. Markdown parsing with gray-matter and remark
4. Component architecture following BEM naming
5. Type-safe interfaces for posts and metadata

### Success Criteria
- [x] Next.js project initialized with TypeScript and SCSS support
- [x] Complete folder structure matching CLAUDE.md specifications
- [x] Design tokens integrated into global styles
- [x] Layout components (Navbar, Footer, ThemeSwitcher) created
- [x] Post parsing utilities implemented
- [x] Home page rendering with sample posts
- [x] Theme switching functionality working
- [x] TypeScript compilation with no errors
- [x] SCSS compiles correctly
- [x] Project runs successfully with `npm run dev`

## All Needed Context

### Documentation & References
```yaml
# MUST READ - Include these in your context window

- file: /Users/katy/06.作品/kimi-kiki-blog/CLAUDE.md
  why: Complete project specifications, architecture, design system, naming conventions, and coding standards

- file: /Users/katy/06.作品/kimi-kiki-blog/blog-design-tokens.ts
  why: CSS Variables defining the entire design system (colors, typography, spacing, etc.)

- url: https://nextjs.org/docs/app/getting-started/installation
  why: Official Next.js 14+ installation and setup guide
  critical: Use App Router, TypeScript, and ESLint

- url: https://nextjs.org/docs/app/guides/sass
  why: Official SCSS integration guide for Next.js
  critical: Install sass package, use .module.scss for components

- url: https://nextjs.org/docs/app/guides/mdx
  section: MDX setup and configuration
  critical: Use @next/mdx or gray-matter + remark for markdown parsing

- url: https://nextjs.org/learn-pages-router/basics/dynamic-routes/render-markdown
  why: Pattern for parsing markdown with gray-matter and remark
  critical: Shows complete implementation of markdown parsing utility

- url: https://www.npmjs.com/package/gray-matter
  why: Frontmatter parsing library documentation
  critical: Understand how to parse YAML frontmatter from markdown files

- url: https://www.npmjs.com/package/lucide-react
  why: Icon library for UI components
  critical: Use Lucide icons for navbar, theme switcher, and UI elements
```

### Current Codebase Tree
```bash
kimi-kiki-blog/
├── .claude/
│   ├── commands/
│   └── settings.local.json
├── PRPs/
│   ├── templates/
│   │   └── prp_base.md
│   └── EXAMPLE_multi_agent_prp.md
├── examples/
├── CLAUDE.md                  # Complete project specifications
├── INITIAL.md                 # Feature request
├── README.md                  # Context engineering template
├── blog-design-tokens.ts      # CSS Variables (complete design system)
└── blog-design-prototype.html # Design reference
```

### Desired Codebase Tree (After Implementation)
```bash
kimi-kiki-blog/
├── app/
│   ├── layout.tsx                    # Root layout with Navbar, Footer, Theme Provider
│   ├── page.tsx                      # Home page with article list
│   ├── globals.scss                  # Global styles importing design tokens
│   ├── tags/
│   │   └── [tag]/page.tsx           # Tag filtering page (future)
│   ├── posts/
│   │   └── [slug]/page.tsx          # Single post page (future)
│   ├── about/page.tsx               # About page (future)
│   └── contact/page.tsx             # Contact page (future)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx               # Navigation bar
│   │   ├── Footer.tsx               # Footer
│   │   └── ThemeSwitcher.tsx        # Theme toggle button
│   ├── article/
│   │   ├── ArticleCard.tsx          # Article preview card
│   │   ├── ArticleList.tsx          # Article list container
│   │   └── TOC.tsx                  # Table of contents (future)
│   ├── ui/
│   │   ├── Button.tsx               # Reusable button
│   │   ├── Card.tsx                 # Reusable card wrapper
│   │   ├── TagBadge.tsx             # Tag badge component
│   │   └── Input.tsx                # Input component (future)
│   └── markdown/
│       └── MarkdownRenderer.tsx     # Markdown to HTML renderer (future)
│
├── content/
│   └── posts/
│       ├── hello-world.md           # Sample blog post 1
│       └── nextjs-intro.md          # Sample blog post 2
│
├── lib/
│   ├── markdown.ts                  # Markdown parsing utilities
│   ├── posts.ts                     # Post fetching and sorting
│   └── utils.ts                     # General utility functions
│
├── hooks/
│   ├── useTheme.ts                  # Theme management hook
│   └── usePosts.ts                  # Posts data hook (future)
│
├── scss/
│   ├── components/                  # Component-specific styles
│   │   ├── _navbar.scss
│   │   ├── _footer.scss
│   │   ├── _article-card.scss
│   │   ├── _button.scss
│   │   ├── _card.scss
│   │   └── _tag-badge.scss
│   ├── core/                        # Core styles
│   │   ├── theme/
│   │   │   ├── _variables.scss     # Import design tokens
│   │   │   ├── _light-theme.scss   # Light theme overrides
│   │   │   └── _dark-theme.scss    # Dark theme overrides
│   │   ├── _reset.scss              # CSS reset
│   │   ├── _typography.scss         # Typography styles
│   │   └── _global.scss             # Global styles
│   └── styles.scss                  # Main SCSS entry point
│
├── types/
│   └── post.ts                      # Post and metadata types
│
├── public/
│   ├── images/                      # Image assets
│   └── fonts/                       # Custom fonts
│
├── next.config.js                   # Next.js configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies
├── .eslintrc.json                   # ESLint configuration
├── CLAUDE.md                        # Project documentation
└── blog-design-tokens.ts            # Design system tokens
```

### Known Gotchas & Library Quirks

```typescript
// CRITICAL: Next.js 14+ App Router specifics

// 1. Server Components by default
// All components in app/ directory are Server Components unless marked with 'use client'
// Client components needed for: theme switcher, interactive UI

// 2. SCSS Module imports
// Use .module.scss extension for component-scoped styles
import styles from './Component.module.scss'

// 3. Metadata export for SEO
// Each page must export metadata object
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Description'
}

// 4. File-based routing
// app/posts/[slug]/page.tsx creates route /posts/:slug
// Dynamic params accessed via props: { params: { slug: string } }

// 5. CSS Variables with SCSS
// Don't use SCSS variables - use CSS Variables instead
// ✅ color: var(--color-brand-primary);
// ❌ color: $brand-primary;

// 6. Theme switching
// Use data attribute: document.documentElement.setAttribute('data-theme', 'dark')
// Or class: document.documentElement.classList.add('dark')

// 7. Gray-matter frontmatter parsing
// Returns { data: {...}, content: string }
const { data, content } = matter(fileContents)

// 8. Lucide React icons
// Import individual icons, not the whole library
import { Moon, Sun, Menu } from 'lucide-react'

// 9. TypeScript strict mode
// All types must be defined - no implicit any
// Post interfaces must match frontmatter structure

// 10. SCSS @import in Next.js
// Global SCSS must be imported in app/layout.tsx or app/globals.scss
// Component SCSS modules imported directly in components
```

## Implementation Blueprint

### Phase 1: Project Initialization

Create the Next.js 14+ project with all required dependencies.

```bash
# Initialize Next.js project
npx create-next-app@latest kimi-kiki-blog
# Prompts:
# - TypeScript: Yes
# - ESLint: Yes
# - Tailwind CSS: No (using SCSS)
# - src/ directory: No (use app/ directly)
# - App Router: Yes
# - Turbopack: Yes
# - Import alias: @/*

# Install SCSS
npm install --save-dev sass

# Install Markdown dependencies
npm install gray-matter remark remark-html

# Install icon library
npm install lucide-react

# Install additional utilities
npm install date-fns
```

### Phase 2: Data Models and Types

Define all TypeScript interfaces for type safety.

```typescript
// types/post.ts

export interface PostMetadata {
  title: string
  excerpt: string
  date: string
  tags: string[]
  author: {
    name: string
    avatar?: string
  }
  featured?: boolean
}

export interface Post extends PostMetadata {
  slug: string
  content: string
  readTime?: number
}

export interface PostFrontmatter {
  title: string
  excerpt: string
  date: string
  tags: string[]
  author: {
    name: string
    avatar?: string
  }
  featured?: boolean
}
```

### Implementation Tasks (In Order)

```yaml
Task 1: Initialize Next.js Project and Dependencies
  description: Create new Next.js 14+ project with required packages
  actions:
    - Run npx create-next-app@latest with TypeScript and App Router
    - Install sass, gray-matter, remark, remark-html, lucide-react, date-fns
    - Verify package.json includes all dependencies
    - Run npm run dev to confirm basic setup works

  validation:
    - Project runs without errors
    - TypeScript compilation succeeds
    - All dependencies installed correctly

Task 2: Create Folder Structure
  description: Set up complete project folder structure
  actions:
    - Create all directories: components/, lib/, hooks/, types/, scss/, content/posts/, public/images/
    - Create subdirectories following CLAUDE.md structure
    - Add .gitkeep files to empty directories

  validation:
    - All directories exist
    - Structure matches CLAUDE.md specifications

Task 3: Implement TypeScript Types
  description: Define all type interfaces
  actions:
    - CREATE types/post.ts
    - Define PostMetadata interface
    - Define Post interface extending PostMetadata
    - Define PostFrontmatter interface
    - Export all types

  validation:
    - No TypeScript errors
    - All interfaces properly defined

Task 4: Integrate Design Tokens into SCSS
  description: Convert CSS Variables file to SCSS and create core styles
  actions:
    - CREATE scss/core/theme/_variables.scss
    - Copy content from blog-design-tokens.ts and convert to SCSS format
    - CREATE scss/core/_reset.scss (CSS reset)
    - CREATE scss/core/_typography.scss (base typography)
    - CREATE scss/core/_global.scss (global styles)
    - CREATE scss/styles.scss (main import file)
    - Import design tokens in styles.scss

  validation:
    - SCSS compiles without errors
    - CSS Variables available globally
    - Design tokens properly organized

Task 5: Create Global Layout and Styles
  description: Set up root layout with global styles
  actions:
    - CREATE app/globals.scss
    - Import scss/styles.scss in globals.scss
    - MODIFY app/layout.tsx to include:
      - Import globals.scss
      - Set html lang="zh-TW"
      - Add data-theme attribute support
      - Include metadata export
      - Structure with <html>, <body>, Navbar, {children}, Footer

  validation:
    - Global styles apply correctly
    - Theme attribute structure in place
    - No console errors

Task 6: Implement Theme Hook
  description: Create custom hook for theme management
  actions:
    - CREATE hooks/useTheme.ts
    - Implement useState for theme state
    - Implement useEffect for localStorage persistence
    - Implement theme toggle function
    - Handle system preference detection
    - Export useTheme hook

  pattern: |
    'use client'
    // Must be client component for localStorage and DOM access
    export function useTheme() {
      const [theme, setTheme] = useState<'light' | 'dark'>('light')

      useEffect(() => {
        // Read from localStorage or system preference
        // Apply data-theme attribute to document.documentElement
      }, [])

      const toggleTheme = () => {
        // Toggle theme state
        // Update localStorage
        // Update data-theme attribute
      }

      return { theme, toggleTheme }
    }

  validation:
    - Hook compiles without TypeScript errors
    - Theme persists across page reloads
    - System preference detected correctly

Task 7: Create Theme Switcher Component
  description: Build theme toggle button component
  actions:
    - CREATE components/layout/ThemeSwitcher.tsx
    - Mark as 'use client' directive
    - Import useTheme hook
    - Import Moon and Sun icons from lucide-react
    - Implement button with icon toggle
    - CREATE scss/components/_theme-switcher.scss
    - Style with BEM naming convention

  pattern: |
    'use client'

    import { Moon, Sun } from 'lucide-react'
    import { useTheme } from '@/hooks/useTheme'

    export const ThemeSwitcher = () => {
      const { theme, toggleTheme } = useTheme()

      return (
        <button
          className="theme-switcher"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon /> : <Sun />}
        </button>
      )
    }

  validation:
    - Component renders correctly
    - Theme toggles on click
    - Icons change based on theme
    - Accessible with aria-label

Task 8: Create Navbar Component
  description: Build navigation bar with logo and theme switcher
  actions:
    - CREATE components/layout/Navbar.tsx
    - Import ThemeSwitcher component
    - Import Link from next/link
    - Structure with logo, nav links, theme switcher
    - CREATE scss/components/_navbar.scss
    - Style with fixed position, CSS Variables
    - Use BEM naming: .navbar, .navbar__logo, .navbar__nav, etc.

  pattern: |
    import Link from 'next/link'
    import { ThemeSwitcher } from './ThemeSwitcher'

    export const Navbar = () => {
      return (
        <nav className="navbar">
          <div className="navbar__container">
            <Link href="/" className="navbar__logo">
              kimi-kiki Blog
            </Link>

            <ul className="navbar__nav">
              <li><Link href="/tags">Tags</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>

            <ThemeSwitcher />
          </div>
        </nav>
      )
    }

  validation:
    - Navbar renders at top
    - Links navigate correctly
    - Theme switcher integrated
    - Responsive styling applied
    - Fixed positioning works

Task 9: Create Footer Component
  description: Build footer with copyright and social links
  actions:
    - CREATE components/layout/Footer.tsx
    - Add copyright text
    - Add social media links (optional placeholder)
    - CREATE scss/components/_footer.scss
    - Style with BEM naming
    - Use CSS Variables for colors

  pattern: |
    import { Github, Twitter, Linkedin } from 'lucide-react'

    export const Footer = () => {
      const currentYear = new Date().getFullYear()

      return (
        <footer className="footer">
          <div className="footer__container">
            <p className="footer__copyright">
              © {currentYear} kimi-kiki. All rights reserved.
            </p>

            <div className="footer__social">
              {/* Placeholder social links */}
            </div>
          </div>
        </footer>
      )
    }

  validation:
    - Footer renders at bottom
    - Copyright year dynamic
    - Styling matches design system

Task 10: Create UI Components
  description: Build reusable UI components
  actions:
    - CREATE components/ui/Button.tsx
    - Define ButtonProps interface
    - Implement button with variant and size props
    - CREATE scss/components/_button.scss
    - CREATE components/ui/Card.tsx
    - Define CardProps interface
    - CREATE scss/components/_card.scss
    - CREATE components/ui/TagBadge.tsx
    - Define TagBadgeProps interface
    - CREATE scss/components/_tag-badge.scss

  pattern: |
    // Button.tsx
    interface ButtonProps {
      variant?: 'primary' | 'secondary' | 'outline'
      size?: 'sm' | 'md' | 'lg'
      children: React.ReactNode
      onClick?: () => void
      className?: string
    }

    export const Button: React.FC<ButtonProps> = ({
      variant = 'primary',
      size = 'md',
      children,
      onClick,
      className = ''
    }) => {
      return (
        <button
          className={`button button--${variant} button--${size} ${className}`}
          onClick={onClick}
        >
          {children}
        </button>
      )
    }

  validation:
    - All components compile without errors
    - Props interfaces properly typed
    - BEM naming applied consistently
    - CSS Variables used for styling

Task 11: Create Markdown Parsing Utilities
  description: Implement markdown file reading and parsing
  actions:
    - CREATE lib/markdown.ts
    - Import fs, path, matter, remark, remark-html
    - Implement parseMarkdown(content: string): { data, content, html }
    - Handle frontmatter parsing with gray-matter
    - Convert markdown to HTML with remark
    - Add error handling

  pattern: |
    import matter from 'gray-matter'
    import { remark } from 'remark'
    import html from 'remark-html'
    import type { PostFrontmatter } from '@/types/post'

    export async function parseMarkdown(content: string) {
      // Parse frontmatter
      const { data, content: markdownContent } = matter(content)

      // Convert markdown to HTML
      const processedContent = await remark()
        .use(html)
        .process(markdownContent)

      const htmlContent = processedContent.toString()

      return {
        frontmatter: data as PostFrontmatter,
        content: markdownContent,
        html: htmlContent
      }
    }

  validation:
    - Function parses frontmatter correctly
    - Markdown converts to HTML
    - TypeScript types match
    - Error handling in place

Task 12: Create Post Utility Functions
  description: Implement post fetching and processing utilities
  actions:
    - CREATE lib/posts.ts
    - Import fs, path, parseMarkdown
    - Implement getAllPosts(): Promise<Post[]>
    - Implement getPostBySlug(slug: string): Promise<Post | null>
    - Implement getSortedPosts(): Promise<Post[]>
    - Calculate reading time
    - Add error handling

  pattern: |
    import fs from 'fs'
    import path from 'path'
    import { parseMarkdown } from './markdown'
    import type { Post } from '@/types/post'

    const postsDirectory = path.join(process.cwd(), 'content/posts')

    export async function getAllPosts(): Promise<Post[]> {
      // Read all markdown files from content/posts
      const fileNames = fs.readdirSync(postsDirectory)

      const posts = await Promise.all(
        fileNames
          .filter(fileName => fileName.endsWith('.md'))
          .map(async (fileName) => {
            const slug = fileName.replace(/\.md$/, '')
            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')

            const { frontmatter, content, html } = await parseMarkdown(fileContents)

            // Calculate read time (200 words per minute)
            const wordCount = content.split(/\s+/).length
            const readTime = Math.ceil(wordCount / 200)

            return {
              slug,
              ...frontmatter,
              content: html,
              readTime
            } as Post
          })
      )

      return posts
    }

    export async function getSortedPosts(): Promise<Post[]> {
      const posts = await getAllPosts()
      return posts.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    }

  validation:
    - Functions read files correctly
    - Posts parsed with all metadata
    - Sorting works by date
    - Read time calculated
    - TypeScript types correct

Task 13: Create Article Card Component
  description: Build article preview card component
  actions:
    - CREATE components/article/ArticleCard.tsx
    - Define ArticleCardProps interface
    - Import Post type
    - Display title, excerpt, date, tags, read time
    - Import TagBadge component
    - Link to post page
    - CREATE scss/components/_article-card.scss
    - Style with card styles, hover effects
    - Use BEM naming

  pattern: |
    import Link from 'next/link'
    import { format } from 'date-fns'
    import { TagBadge } from '@/components/ui/TagBadge'
    import type { Post } from '@/types/post'

    interface ArticleCardProps {
      post: Post
      featured?: boolean
    }

    export const ArticleCard: React.FC<ArticleCardProps> = ({
      post,
      featured = false
    }) => {
      return (
        <article className={`article-card ${featured ? 'article-card--featured' : ''}`}>
          <Link href={`/posts/${post.slug}`} className="article-card__link">
            <header className="article-card__header">
              <h2 className="article-card__title">{post.title}</h2>
              <div className="article-card__meta">
                <time>{format(new Date(post.date), 'yyyy年MM月dd日')}</time>
                {post.readTime && <span>{post.readTime} min read</span>}
              </div>
            </header>

            <p className="article-card__excerpt">{post.excerpt}</p>

            <footer className="article-card__footer">
              <div className="article-card__tags">
                {post.tags.map(tag => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            </footer>
          </Link>
        </article>
      )
    }

  validation:
    - Card displays all post metadata
    - Date formatted correctly
    - Tags render as badges
    - Hover effects work
    - Link navigates correctly

Task 14: Create Article List Component
  description: Build article list container
  actions:
    - CREATE components/article/ArticleList.tsx
    - Define ArticleListProps interface
    - Accept posts array
    - Map posts to ArticleCard components
    - Handle empty state
    - CREATE scss/components/_article-list.scss
    - Create grid layout
    - Responsive styling

  pattern: |
    import { ArticleCard } from './ArticleCard'
    import type { Post } from '@/types/post'

    interface ArticleListProps {
      posts: Post[]
    }

    export const ArticleList: React.FC<ArticleListProps> = ({ posts }) => {
      if (posts.length === 0) {
        return (
          <div className="article-list article-list--empty">
            <p>尚無文章</p>
          </div>
        )
      }

      return (
        <div className="article-list">
          {posts.map((post) => (
            <ArticleCard
              key={post.slug}
              post={post}
              featured={post.featured}
            />
          ))}
        </div>
      )
    }

  validation:
    - List renders all posts
    - Grid layout applied
    - Empty state handled
    - Responsive on mobile

Task 15: Create Sample Blog Posts
  description: Add sample markdown posts for testing
  actions:
    - CREATE content/posts/hello-world.md
    - Add frontmatter with title, excerpt, date, tags, author
    - Add markdown content
    - CREATE content/posts/nextjs-intro.md
    - Add complete frontmatter
    - Add markdown content with headings, code blocks

  pattern: |
    ---
    title: Hello World - 我的第一篇文章
    excerpt: 歡迎來到我的技術部落格！這是我的第一篇文章，分享我開始寫作的初衷。
    date: 2024-10-14
    tags:
      - General
      - Blog
    author:
      name: kimi-kiki
      avatar: /images/avatar.jpg
    featured: true
    ---

    # Hello World

    歡迎來到我的技術部落格！

    ## 為什麼開始寫作？

    這裡會記錄我的學習歷程與技術分享...

  validation:
    - Files created in correct location
    - Frontmatter valid YAML
    - Markdown renders correctly
    - Metadata matches Post type

Task 16: Implement Home Page
  description: Build home page with article listing
  actions:
    - MODIFY app/page.tsx
    - Import getSortedPosts from lib/posts
    - Import ArticleList component
    - Fetch posts in server component
    - Pass posts to ArticleList
    - Add page metadata
    - CREATE scss/pages/_home.scss (if needed)

  pattern: |
    import { getSortedPosts } from '@/lib/posts'
    import { ArticleList } from '@/components/article/ArticleList'
    import type { Metadata } from 'next'

    export const metadata: Metadata = {
      title: 'Home | kimi-kiki Blog',
      description: '技術部落格 - 分享程式開發與學習心得'
    }

    export default async function HomePage() {
      const posts = await getSortedPosts()

      return (
        <main className="home">
          <section className="home__hero">
            <h1>歡迎來到 kimi-kiki Blog</h1>
            <p>分享技術與學習的旅程</p>
          </section>

          <section className="home__articles">
            <h2>最新文章</h2>
            <ArticleList posts={posts} />
          </section>
        </main>
      )
    }

  validation:
    - Home page renders without errors
    - Posts display correctly
    - Metadata set for SEO
    - Server-side data fetching works

Task 17: Update Root Layout
  description: Integrate Navbar and Footer into root layout
  actions:
    - MODIFY app/layout.tsx
    - Import Navbar and Footer components
    - Wrap children with layout structure
    - Add proper HTML structure
    - Set metadata
    - Import global styles

  pattern: |
    import type { Metadata } from 'next'
    import { Navbar } from '@/components/layout/Navbar'
    import { Footer } from '@/components/layout/Footer'
    import './globals.scss'

    export const metadata: Metadata = {
      title: {
        default: 'kimi-kiki Blog | 技術分享',
        template: '%s | kimi-kiki Blog'
      },
      description: '分享程式開發、AI 技術與學習心得',
      keywords: ['技術部落格', 'React', 'TypeScript', 'AI']
    }

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode
    }) {
      return (
        <html lang="zh-TW">
          <body>
            <Navbar />
            <main className="main-content">
              {children}
            </main>
            <Footer />
          </body>
        </html>
      )
    }

  validation:
    - Layout renders correctly
    - Navbar fixed at top
    - Footer at bottom
    - Content area styled properly
    - Metadata configured

Task 18: Configure Next.js for SCSS
  description: Ensure Next.js config supports SCSS properly
  actions:
    - CHECK next.config.js exists
    - MODIFY next.config.js if needed
    - Add sassOptions if custom configurations needed
    - Verify module exports

  pattern: |
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      sassOptions: {
        includePaths: ['./scss'],
      },
    }

    module.exports = nextConfig

  validation:
    - Config file valid
    - SCSS compiles correctly
    - No configuration errors

Task 19: Create Utility Functions
  description: Add common utility functions
  actions:
    - CREATE lib/utils.ts
    - Implement cn() for className merging
    - Implement formatDate()
    - Implement calculateReadTime()
    - Implement getAllTags()
    - Export all utilities

  pattern: |
    import { clsx, type ClassValue } from 'clsx'

    // Utility for merging classNames
    export function cn(...inputs: ClassValue[]) {
      return clsx(inputs)
    }

    // Format date to readable string
    export function formatDate(date: string | Date): string {
      const d = typeof date === 'string' ? new Date(date) : date
      return d.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    // Calculate reading time in minutes
    export function calculateReadTime(content: string): number {
      const wordsPerMinute = 200
      const wordCount = content.trim().split(/\s+/).length
      return Math.ceil(wordCount / wordsPerMinute)
    }

  validation:
    - All functions export correctly
    - TypeScript types correct
    - Functions work as expected

Task 20: Final Testing and Validation
  description: Test complete application
  actions:
    - Run npm run dev
    - Visit http://localhost:3000
    - Verify home page loads
    - Verify articles display
    - Test theme switcher
    - Check navigation links
    - Test responsive design
    - Run TypeScript check: npm run build
    - Check for console errors

  validation:
    - Application runs without errors
    - All features work correctly
    - TypeScript compilation succeeds
    - No console warnings
    - Responsive design functions
```

## Validation Loop

### Level 1: TypeScript & Linting
```bash
# Run these FIRST - fix any errors before proceeding

# TypeScript compilation check
npx tsc --noEmit

# ESLint check
npm run lint

# Expected: No errors. If errors exist, READ and FIX them.
```

### Level 2: Build Validation
```bash
# Build the project
npm run build

# Expected: Build succeeds without errors
# If build fails: Check error messages and fix issues
```

### Level 3: Development Server
```bash
# Start development server
npm run dev

# Expected: Server starts on http://localhost:3000
# Open browser and verify:
# - Home page loads
# - Articles display
# - Theme switcher works
# - Navigation functions
# - No console errors
```

### Level 4: Feature Validation
Manual testing checklist:

1. **Theme Switching**
   - Click theme switcher
   - Verify colors change
   - Refresh page - theme persists
   - Check localStorage has theme value

2. **Article Listing**
   - Home page shows sample posts
   - Article cards display title, excerpt, date, tags
   - Featured posts have different styling
   - Cards are clickable links

3. **Navigation**
   - Navbar fixed at top
   - Logo links to home
   - Nav links present (even if not functional yet)
   - Theme switcher accessible

4. **Responsive Design**
   - Resize browser window
   - Check mobile breakpoint
   - Verify layout adapts
   - Test on actual mobile device if possible

5. **SCSS & Design Tokens**
   - Inspect element styles
   - Verify CSS Variables applied
   - Check color values match design tokens
   - Verify spacing uses design tokens

## Final Validation Checklist

- [ ] TypeScript compiles: `npx tsc --noEmit` passes
- [ ] ESLint passes: `npm run lint` passes
- [ ] Build succeeds: `npm run build` completes
- [ ] Dev server runs: `npm run dev` works
- [ ] Home page loads at http://localhost:3000
- [ ] Sample posts display correctly
- [ ] Theme switcher toggles between light/dark
- [ ] Theme persists on page reload
- [ ] Navbar renders with all elements
- [ ] Footer renders at bottom
- [ ] Article cards styled correctly
- [ ] Tags display with proper colors
- [ ] Responsive layout works on mobile
- [ ] No console errors in browser
- [ ] No TypeScript errors
- [ ] All components use CSS Variables
- [ ] BEM naming convention followed
- [ ] File structure matches CLAUDE.md
- [ ] Code organized following specifications
- [ ] Comments added for complex logic

---

## Anti-Patterns to Avoid

### Code Organization
- ❌ Don't create components over 300 lines
- ❌ Don't mix UI and business logic in components
- ❌ Don't use default exports for components
- ❌ Don't skip TypeScript types

### Styling
- ❌ Don't use inline styles
- ❌ Don't use SCSS variables instead of CSS Variables
- ❌ Don't skip BEM naming convention
- ❌ Don't hardcode colors/spacing values

### Next.js Patterns
- ❌ Don't use 'use client' on Server Components unnecessarily
- ❌ Don't fetch data in Client Components
- ❌ Don't import Server Components in Client Components
- ❌ Don't use useEffect for data fetching (use Server Components)

### File Organization
- ❌ Don't put utilities in component files
- ❌ Don't skip creating types/interfaces
- ❌ Don't leave console.log statements
- ❌ Don't commit commented-out code

### Best Practices to Follow
- ✅ Use Server Components by default
- ✅ Mark Client Components with 'use client'
- ✅ Extract reusable logic to custom hooks
- ✅ Use CSS Variables for all styling values
- ✅ Follow BEM naming for CSS classes
- ✅ Add TypeScript interfaces for all data
- ✅ Write descriptive component documentation
- ✅ Use meaningful variable names
- ✅ Keep components focused and single-purpose
- ✅ Add error boundaries for error handling

---

## Implementation Notes

### Order of Implementation
The tasks are designed to be completed sequentially because:
1. **Foundation First**: Project setup before code
2. **Types Early**: Define data structures before using them
3. **Bottom-Up**: Build small components before complex features
4. **Integration Last**: Connect everything after parts work

### Testing Strategy
After each task:
1. Check TypeScript compilation
2. Run development server
3. Manually test in browser
4. Fix any issues before next task

### Common Issues and Solutions

**Issue**: SCSS not compiling
- **Solution**: Check sass package installed, verify import paths

**Issue**: Theme not persisting
- **Solution**: Verify localStorage access in useTheme, check 'use client' directive

**Issue**: Posts not loading
- **Solution**: Check content/posts directory exists, verify markdown format, check file reading permissions

**Issue**: TypeScript errors on frontmatter
- **Solution**: Ensure PostFrontmatter type matches markdown frontmatter structure

**Issue**: CSS Variables not applying
- **Solution**: Verify globals.scss imported in layout.tsx, check :root selector

---

## Resources & Documentation

### Official Documentation
- Next.js 14 Docs: https://nextjs.org/docs
- Next.js App Router: https://nextjs.org/docs/app
- TypeScript: https://www.typescriptlang.org/docs
- SCSS: https://sass-lang.com/documentation

### Libraries
- gray-matter: https://www.npmjs.com/package/gray-matter
- remark: https://www.npmjs.com/package/remark
- remark-html: https://www.npmjs.com/package/remark-html
- lucide-react: https://lucide.dev/guide/packages/lucide-react
- date-fns: https://date-fns.org/docs

### Tutorials
- Next.js Blog Tutorial: https://nextjs.org/learn-pages-router/basics/dynamic-routes
- Markdown Parsing: https://nextjs.org/learn-pages-router/basics/dynamic-routes/render-markdown
- SCSS with Next.js: https://nextjs.org/docs/app/guides/sass

---

## PRP Confidence Score: 9/10

### Strengths
- ✅ Complete context with all documentation links
- ✅ Detailed step-by-step implementation tasks
- ✅ Comprehensive code patterns and examples
- ✅ Clear validation gates at multiple levels
- ✅ Aligned with CLAUDE.md specifications
- ✅ TypeScript-first approach
- ✅ Follows Next.js 14+ best practices
- ✅ Includes gotchas and anti-patterns

### Minor Considerations
- ⚠️ Some components may need refinement during implementation
- ⚠️ Responsive design details may require iteration
- ⚠️ Markdown rendering styles not fully specified

### Why High Confidence
1. All required context provided with specific URLs
2. Tasks broken down into manageable, sequential steps
3. Validation loops ensure self-correction
4. Patterns follow official documentation
5. Clear success criteria defined
6. Anti-patterns explicitly documented
7. Aligns perfectly with CLAUDE.md specifications

This PRP should enable one-pass implementation with minimal clarification needed.
