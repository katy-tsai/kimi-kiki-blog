# PRP: Header Search Bar and RWD Mobile Navigation

**Feature**: Header UI調整及優化 - Search functionality and Responsive Mobile Navigation
**Created**: 2025-10-16
**Confidence Score**: 8/10

---

## Goal

Implement a keyword search bar in the header and create a responsive mobile navigation drawer that provides seamless search and navigation experience across all device sizes.

**Specific End State:**
1. Desktop (≥768px): Search bar visible left of theme switcher, full navigation visible
2. Mobile (<768px): Search bar and navigation hidden, replaced by hamburger menu button
3. Mobile drawer: Sliding panel containing navigation links and search functionality
4. Search: Real-time keyword filtering of blog posts with debouncing
5. Accessibility: Full keyboard navigation and screen reader support

---

## Why

- **User Experience**: Users need quick access to content through search without scrolling through all articles
- **Mobile Usability**: Current navbar clutters small screens; drawer pattern is standard for mobile navigation
- **Content Discovery**: Search complements existing tag-based filtering for better content discoverability
- **Modern UX Standards**: Responsive navigation with search is expected in modern blog platforms
- **Integration**: Builds on existing tag filtering and article listing infrastructure

---

## What

### User-Visible Behavior

#### Desktop View (≥768px)
- Search input appears in navbar between navigation links and theme switcher
- Typing in search bar shows filtered article results
- Search has debounce delay (500ms) to avoid excessive filtering
- Search results displayed similar to tag-filtered article list
- Navbar maintains current fixed positioning and styling

#### Mobile View (<768px)
- Navigation links and search bar hidden
- Hamburger menu button appears right of theme switcher
- Tapping hamburger opens slide-in drawer from right side
- Drawer contains:
  - Vertical navigation menu (same links as desktop)
  - Search input field
  - Close button
- Selecting navigation or searching closes the drawer
- Backdrop overlay dims main content when drawer open

#### Search Functionality (All Devices)
- Searches post titles, excerpts, and content
- Case-insensitive keyword matching
- Shows article count in results
- Displays "沒有找到相關文章" if no matches
- Pressing Escape clears search
- URL updates with search query parameter for shareability

### Success Criteria

- [x] Desktop search bar integrated into existing navbar
- [x] Search filters posts by keyword in real-time
- [x] Mobile hamburger menu button appears <768px
- [x] Mobile drawer slides in/out smoothly with animation
- [x] Drawer contains navigation and search
- [x] Drawer closes on navigation selection or search
- [x] Keyboard navigation works (Tab, Enter, Escape)
- [x] ARIA attributes for screen reader accessibility
- [x] No layout shift between desktop/mobile breakpoints
- [x] Maintains existing design system (CSS variables, BEM)
- [x] TypeScript types for all new components
- [x] No console errors or warnings

---

## All Needed Context

### Documentation & References

```yaml
# Next.js 15 Search Patterns
- url: https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
  why: Official Next.js guide for implementing search with URL params
  critical: Use useSearchParams, useRouter, usePathname for client-side search

- url: https://strapi.io/blog/epic-next-js-15-tutorial-part-8-search-and-pagination-in-next-js
  why: Comprehensive search implementation with debouncing pattern
  critical: Use useDebouncedCallback to prevent API calls on every keystroke

- url: https://medium.com/@somasuryadev6/searchparams-in-next-js-15-6841726ee2cb
  why: Next.js 15 searchParams async transition handling
  critical: Next.js 15 is transitioning searchParams to async (breaking change)

# Mobile Drawer Patterns
- url: https://mui.com/material-ui/react-drawer/
  why: Industry-standard drawer patterns and variants
  critical: Temporary drawer for mobile (overlay with backdrop), use fixed positioning

- url: https://jfelix.info/blog/create-a-mobile-friendly-navigation-with-react
  why: React mobile navigation best practices
  critical: Drawer should close on backdrop click, use CSS transforms for smooth animation

- url: https://academind.com/tutorials/reactjs-navbar-side-drawer
  why: React navbar with side drawer implementation pattern
  critical: Use state to control drawer open/close, prevent body scroll when open

# Accessibility (WCAG 2.1 Compliant)
- url: https://a11ymatters.com/pattern/accessible-search/
  why: ARIA attributes and keyboard navigation for search
  critical: Use aria-label="Search", role="search", support Enter for submit and Escape for clear

- url: https://www.algolia.com/blog/ux/web-content-accessibility-guidelines-wcag-how-to-make-site-search-work-for-people-with-disabilities
  why: Complete accessible search implementation guide
  critical: Keyboard focus management, aria-live regions for result counts, aria-expanded for drawer state

- url: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
  why: W3C keyboard interface patterns
  critical: Tab navigation, focus trap in drawer, restore focus on close

# Existing Codebase Patterns
- file: components/layout/Navbar.tsx
  why: Current navbar structure, usePathname pattern, active link detection
  critical: Navbar is client component with 'use client', maintains pattern

- file: components/layout/ThemeSwitcher.tsx
  why: Client component pattern, localStorage usage, hydration handling
  critical: Use mounted state to prevent hydration mismatch

- file: components/layout/Sidebar.tsx
  why: Collapsible component pattern with toggle state
  critical: Use useState for collapsed state, CSS transitions for animation

- file: components/article/ArticleList.tsx
  why: Article display pattern for search results
  critical: Reuse ArticleList component for search results display

- file: lib/posts.ts
  why: Post fetching and filtering utilities
  critical: getAllPosts() returns all posts, implement search filtering client-side

- file: app/tags/[tag]/page.tsx
  why: Tag filtering pattern, similar to search filtering
  critical: Filter posts array with .filter(), sort by date descending

- file: scss/components/_navbar.scss
  why: Current navbar styling, responsive breakpoints
  critical: Uses BEM naming, @media (max-width: 768px) for mobile

- file: scss/core/theme/_variables.scss
  why: Design system tokens (colors, spacing, shadows, transitions)
  critical: Use CSS variables for consistency: --color-*, --spacing-*, --shadow-*, --transition-*

- docfile: CLAUDE.md
  why: Project conventions, naming standards, code organization rules
  critical: BEM naming, <300 lines per file, TypeScript required, no console.log
```

---

### Current Codebase Structure

```
kimi-kiki-blog/
├── app/
│   ├── layout.tsx                    # Root layout with Navbar
│   ├── page.tsx                      # Home page with article list
│   ├── posts/[slug]/page.tsx        # Single post page
│   ├── tags/[tag]/page.tsx          # Tag filtered articles
│   └── ...
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx               # Current navbar (modify)
│   │   ├── ThemeSwitcher.tsx        # Theme toggle button
│   │   ├── Sidebar.tsx              # Desktop sidebar (collapsible pattern)
│   │   ├── Footer.tsx
│   │   └── View.tsx
│   ├── article/
│   │   ├── ArticleList.tsx          # Reuse for search results
│   │   ├── ArticleCard.tsx
│   │   └── TOC.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── TagBadge.tsx
│       └── Input.tsx                # Existing input component
├── lib/
│   ├── posts.ts                     # getAllPosts(), filtering utilities
│   └── utils.ts
├── hooks/
│   ├── useTheme.ts
│   └── usePosts.ts
├── types/
│   └── post.ts                      # Post, PostMetadata interfaces
├── scss/
│   ├── components/
│   │   ├── _navbar.scss             # Modify for search bar
│   │   └── ...
│   └── core/theme/_variables.scss   # Design tokens
└── CLAUDE.md                        # Project guidelines
```

---

### Desired Codebase Structure (New Files)

```
kimi-kiki-blog/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx               # MODIFY: Add search bar, hamburger button logic
│   │   ├── SearchBar.tsx            # CREATE: Search input with debouncing
│   │   └── MobileDrawer.tsx         # CREATE: Mobile navigation drawer
│   └── search/
│       └── SearchResults.tsx        # CREATE: Display filtered articles
├── hooks/
│   └── useSearch.ts                 # CREATE: Search logic and state management
├── scss/
│   └── components/
│       ├── _navbar.scss             # MODIFY: Add search bar styles
│       ├── _search-bar.scss         # CREATE: Search input styles
│       ├── _mobile-drawer.scss      # CREATE: Drawer animation and layout
│       └── _search-results.scss     # CREATE: Search results display
└── types/
    └── search.ts                    # CREATE: Search-related type definitions
```

**File Responsibilities:**
- `SearchBar.tsx`: Controlled input with debouncing, keyboard events, ARIA attributes
- `MobileDrawer.tsx`: Slide-in panel, backdrop, navigation links, search integration, focus management
- `SearchResults.tsx`: Display filtered articles using ArticleList pattern, result count, empty state
- `useSearch.ts`: Search state, filtering logic, debouncing, URL param synchronization
- `_mobile-drawer.scss`: Transform animations, backdrop overlay, z-index layering
- `search.ts`: TypeScript interfaces for search state and result types

---

### Known Gotchas & Library Quirks

```typescript
// CRITICAL: Next.js 15 searchParams transition to async
// Our implementation uses client components with useSearchParams hook (synchronous)
// This is the recommended approach for client-side search
// Reference: https://medium.com/@somasuryadev6/searchparams-in-next-js-15-6841726ee2cb

// CRITICAL: Hydration mismatch prevention
// Pattern from ThemeSwitcher.tsx - use mounted state
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
if (!mounted) return null // Prevents server/client mismatch

// CRITICAL: Prevent body scroll when drawer open
// Must add/remove 'no-scroll' class to body element
useEffect(() => {
  if (isOpen) {
    document.body.classList.add('no-scroll')
  } else {
    document.body.classList.remove('no-scroll')
  }
  return () => document.body.classList.remove('no-scroll')
}, [isOpen])

// CRITICAL: Debouncing for search performance
// Use 500ms delay to prevent excessive re-renders
// Pattern: import { useDebouncedCallback } from 'use-debounce'
const debouncedSearch = useDebouncedCallback((value) => {
  // Search logic here
}, 500)

// CRITICAL: BEM naming convention (from CLAUDE.md)
// Block: .search-bar, .mobile-drawer
// Element: .search-bar__input, .mobile-drawer__nav
// Modifier: .mobile-drawer--open, .search-bar--focused

// CRITICAL: CSS Variables usage (from design system)
// Always use var(--token-name), never hardcode values
// Example: color: var(--color-text-primary)
//          padding: var(--spacing-4)
//          transition: all var(--transition-base)

// CRITICAL: File size limit (from CLAUDE.md)
// No file should exceed 300 lines of code
// If exceeding, split into sub-components or extract hooks

// CRITICAL: Focus management in drawer
// Trap focus inside drawer when open
// Return focus to hamburger button when closed
// Use ref to store trigger element

// CRITICAL: lucide-react icons available
// Use existing icons: Menu (hamburger), X (close), Search
// Import: import { Menu, X, Search } from 'lucide-react'

// CRITICAL: Responsive breakpoint from variables
// Mobile: < 768px (--breakpoint-md)
// Use consistent breakpoint in both TS and SCSS

// CRITICAL: Z-index layering (from design system)
// Navbar: --z-index-fixed (50)
// Drawer: --z-index-modal (100)
// Backdrop: --z-index-modal - 1 (99)
```

---

## Implementation Blueprint

### Data Models and Structure

```typescript
// types/search.ts - CREATE
export interface SearchState {
  query: string
  results: Post[]
  isSearching: boolean
  resultCount: number
}

export interface SearchBarProps {
  onSearch: (query: string) => void
  initialValue?: string
  placeholder?: string
  className?: string
}

export interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export interface SearchResultsProps {
  query: string
  results: Post[]
  isSearching: boolean
}

// Existing types from types/post.ts - REFERENCE
interface Post {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  tags: string[]
  author: { name: string; avatar?: string }
  featured?: boolean
  readTime?: number
  views?: number
}
```

---

### Implementation Tasks (In Order)

#### Task 1: Create Search Logic Hook

**CREATE** `hooks/useSearch.ts`

```typescript
// PATTERN: Custom hook for search state and filtering logic
// MIRROR: useTheme.ts pattern for state management
// DEPENDENCY: lib/posts.ts for getAllPosts()

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Post } from '@/types/post'
import { getAllPosts } from '@/lib/posts'

export function useSearch() {
  // Read URL search params
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Initialize query from URL or empty
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [allPosts, setAllPosts] = useState<Post[]>([])

  // CRITICAL: Load posts on mount
  useEffect(() => {
    const posts = getAllPosts()
    setAllPosts(posts)
  }, [])

  // CRITICAL: Debounced URL update (500ms delay)
  const debouncedUpdateURL = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 500)

  // Handle query change
  const handleSearch = (value: string) => {
    setQuery(value)
    debouncedUpdateURL(value)
  }

  // CRITICAL: Filter posts by query (case-insensitive)
  // Search in: title, excerpt, content, tags
  const results = useMemo(() => {
    if (!query.trim()) return allPosts

    const lowerQuery = query.toLowerCase()
    return allPosts.filter(post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }, [query, allPosts])

  // Clear search
  const clearSearch = () => {
    setQuery('')
    const params = new URLSearchParams(searchParams.toString())
    params.delete('q')
    router.replace(`${pathname}?${params.toString()}`)
  }

  return {
    query,
    results,
    isSearching: query.length > 0,
    resultCount: results.length,
    handleSearch,
    clearSearch,
  }
}
```

**VALIDATION:**
```bash
# Type check
npx tsc --noEmit hooks/useSearch.ts
```

---

#### Task 2: Create SearchBar Component

**CREATE** `components/layout/SearchBar.tsx`

```typescript
// PATTERN: Controlled input with keyboard events and ARIA
// REFERENCE: components/ui/Input.tsx for base input patterns
// CRITICAL: Implement keyboard navigation (Enter, Escape)
// CRITICAL: ARIA attributes for accessibility

'use client'

import { useState, KeyboardEvent, ChangeEvent } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
  onClear?: () => void
  initialValue?: string
  placeholder?: string
  className?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onClear,
  initialValue = '',
  placeholder = '搜尋文章關鍵字...',
  className = '',
}) => {
  const [value, setValue] = useState(initialValue)
  const [isFocused, setIsFocused] = useState(false)

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    onSearch(newValue)
  }

  // CRITICAL: Keyboard event handling
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      handleClear()
    }
    // Enter is default form submission behavior
  }

  // Clear search
  const handleClear = () => {
    setValue('')
    onSearch('')
    onClear?.()
  }

  return (
    <div
      className={`search-bar ${isFocused ? 'search-bar--focused' : ''} ${className}`}
      role="search"
    >
      <Search className="search-bar__icon" aria-hidden="true" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="search-bar__input"
        aria-label="搜尋文章"
        aria-describedby="search-description"
      />
      <span id="search-description" className="sr-only">
        輸入關鍵字搜尋文章標題、內容或標籤
      </span>
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="search-bar__clear"
          aria-label="清除搜尋"
        >
          <X aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
```

**CREATE** `scss/components/_search-bar.scss`

```scss
// PATTERN: BEM naming with CSS variables
// REFERENCE: _navbar.scss for input styling patterns

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base) var(--transition-timing-ease);

  // Elements
  &__icon {
    width: 20px;
    height: 20px;
    color: var(--color-text-secondary);
    flex-shrink: 0;
  }

  &__input {
    flex: 1;
    border: none;
    background: transparent;
    color: var(--color-text-primary);
    font-size: var(--font-size-base);
    outline: none;

    &::placeholder {
      color: var(--color-text-tertiary);
    }
  }

  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-text-primary);
    }
  }

  // Modifiers
  &--focused {
    border-color: var(--color-brand-primary);
    box-shadow: 0 0 0 3px var(--color-brand-light);
  }

  // Responsive
  @media (max-width: 768px) {
    width: 100%;
  }
}

// Screen reader only utility class
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**IMPORT** in `scss/styles.scss`:
```scss
@import 'components/search-bar';
```

**VALIDATION:**
```bash
# Type check
npx tsc --noEmit components/layout/SearchBar.tsx

# Build check
npm run build
```

---

#### Task 3: Create MobileDrawer Component

**CREATE** `components/layout/MobileDrawer.tsx`

```typescript
// PATTERN: Modal overlay with focus trap
// REFERENCE: Sidebar.tsx for toggle pattern
// CRITICAL: Prevent body scroll when open
// CRITICAL: Focus management (trap and restore)
// CRITICAL: Close on backdrop click and Escape key

'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { X } from 'lucide-react'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // CRITICAL: Prevent body scroll when drawer open
  useEffect(() => {
    if (isOpen) {
      // Store currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement

      // Prevent body scroll
      document.body.classList.add('no-scroll')

      // Focus first focusable element in drawer
      setTimeout(() => {
        const firstFocusable = drawerRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        firstFocusable?.focus()
      }, 100)
    } else {
      // Restore body scroll
      document.body.classList.remove('no-scroll')

      // Restore focus to trigger element
      previousFocusRef.current?.focus()
    }

    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [isOpen])

  // CRITICAL: Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // CRITICAL: Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="mobile-drawer-backdrop"
      onClick={handleBackdropClick}
      aria-hidden="true"
    >
      <div
        ref={drawerRef}
        className={`mobile-drawer ${isOpen ? 'mobile-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="導覽選單"
      >
        <div className="mobile-drawer__header">
          <h2 className="mobile-drawer__title">選單</h2>
          <button
            type="button"
            onClick={onClose}
            className="mobile-drawer__close"
            aria-label="關閉選單"
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <div className="mobile-drawer__content">
          {children}
        </div>
      </div>
    </div>
  )
}
```

**CREATE** `scss/components/_mobile-drawer.scss`

```scss
// PATTERN: Fixed overlay with slide-in animation
// REFERENCE: Modal patterns from web search research
// CRITICAL: Transform for smooth animation
// CRITICAL: Z-index layering (backdrop < drawer)

.mobile-drawer-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: var(--z-index-modal);
  animation: fadeIn var(--transition-base) var(--transition-timing-ease);

  @media (min-width: 769px) {
    display: none;
  }
}

.mobile-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  max-width: 400px;
  background-color: var(--color-bg-primary);
  box-shadow: var(--shadow-2xl);
  transform: translateX(100%);
  transition: transform var(--transition-slow) var(--transition-timing-ease);
  overflow-y: auto;
  z-index: calc(var(--z-index-modal) + 1);

  // Elements
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-6);
    border-bottom: 1px solid var(--color-border-primary);
  }

  &__title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin: 0;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
    border-radius: var(--radius-lg);
    transition: all var(--transition-fast);

    svg {
      width: 24px;
      height: 24px;
    }

    &:hover {
      background-color: var(--color-bg-secondary);
      color: var(--color-text-primary);
    }
  }

  &__content {
    padding: var(--spacing-6);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-6);
  }

  // Modifiers
  &--open {
    transform: translateX(0);
  }
}

// CRITICAL: Prevent body scroll when drawer open
body.no-scroll {
  overflow: hidden;
}

// Animations
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

**IMPORT** in `scss/styles.scss`:
```scss
@import 'components/mobile-drawer';
```

**VALIDATION:**
```bash
# Type check
npx tsc --noEmit components/layout/MobileDrawer.tsx

# Build check
npm run build
```

---

#### Task 4: Create SearchResults Component

**CREATE** `components/search/SearchResults.tsx`

```typescript
// PATTERN: Reuse ArticleList for display
// REFERENCE: app/tags/[tag]/page.tsx for filtered results display
// CRITICAL: Show result count with aria-live for screen readers

'use client'

import { Post } from '@/types/post'
import { ArticleList } from '@/components/article/ArticleList'

interface SearchResultsProps {
  query: string
  results: Post[]
  isSearching: boolean
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  results,
  isSearching,
}) => {
  if (!isSearching) {
    return null
  }

  return (
    <div className="search-results">
      <div className="search-results__header">
        <h2 className="search-results__title">
          搜尋結果
        </h2>
        <p
          className="search-results__count"
          role="status"
          aria-live="polite"
        >
          {query && (
            <>
              關鍵字「<span className="search-results__query">{query}</span>」
              找到 <strong>{results.length}</strong> 篇文章
            </>
          )}
        </p>
      </div>

      {results.length === 0 ? (
        <div className="search-results__empty">
          <p>沒有找到相關文章</p>
          <p className="search-results__hint">
            請嘗試其他關鍵字或瀏覽所有文章
          </p>
        </div>
      ) : (
        <ArticleList posts={results} />
      )}
    </div>
  )
}
```

**CREATE** `scss/components/_search-results.scss`

```scss
// PATTERN: Results header with count display
// REFERENCE: _article-list.scss for consistent styling

.search-results {
  margin-top: var(--spacing-8);

  // Elements
  &__header {
    margin-bottom: var(--spacing-6);
    padding-bottom: var(--spacing-4);
    border-bottom: 2px solid var(--color-border-primary);
  }

  &__title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    margin: 0 0 var(--spacing-2) 0;
  }

  &__count {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    margin: 0;
  }

  &__query {
    color: var(--color-brand-primary);
    font-weight: var(--font-weight-semibold);
  }

  &__empty {
    text-align: center;
    padding: var(--spacing-12) var(--spacing-6);

    p {
      font-size: var(--font-size-lg);
      color: var(--color-text-secondary);
      margin: 0 0 var(--spacing-4) 0;

      &:first-child {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-primary);
      }
    }
  }

  &__hint {
    font-size: var(--font-size-sm);
    color: var(--color-text-tertiary);
  }
}
```

**IMPORT** in `scss/styles.scss`:
```scss
@import 'components/search-results';
```

**VALIDATION:**
```bash
# Type check
npx tsc --noEmit components/search/SearchResults.tsx

# Build check
npm run build
```

---

#### Task 5: Update Navbar for Search and Mobile

**MODIFY** `components/layout/Navbar.tsx`

Key Changes:
1. Add SearchBar component to desktop view
2. Add hamburger menu button for mobile
3. Add MobileDrawer with navigation and search
4. Manage drawer open/close state
5. Update responsive behavior

```typescript
// FIND: Existing imports
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeSwitcher } from './ThemeSwitcher'

// ADD: New imports
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { SearchBar } from './SearchBar'
import { MobileDrawer } from './MobileDrawer'
import { useSearch } from '@/hooks/useSearch'

// FIND: Navbar component export
export const Navbar = () => {
  const pathname = usePathname()

// INJECT AFTER: Add state and search hook
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { query, handleSearch, clearSearch } = useSearch()

// FIND: const navItems = [...]
// KEEP: Existing navItems array

// MODIFY: Return JSX - Add search bar and mobile menu
// PATTERN: Desktop shows search bar, mobile shows hamburger
// STRUCTURE:
// <header className="navbar">
//   <div className="navbar__container">
//     <Logo />
//     <nav className="navbar__nav"> {/* Hide on mobile */}
//       {navItems}
//     </nav>
//     <div className="navbar__actions">
//       <SearchBar className="navbar__search" /> {/* Hide on mobile */}
//       <ThemeSwitcher />
//       <button className="navbar__menu-button"> {/* Show on mobile */}
//         <Menu />
//       </button>
//     </div>
//   </div>
// </header>
// <MobileDrawer isOpen={isDrawerOpen}>
//   <SearchBar />
//   <nav className="mobile-drawer__nav">
//     {navItems with onClick to close drawer}
//   </nav>
// </MobileDrawer>

  return (
    <>
      <header className="navbar">
        <div className="navbar__container">
          <Link href="/" className="navbar__logo">
            kimi-kiki
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="navbar__nav">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? 'active' : ''}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="navbar__actions">
            {/* Desktop Search - Hidden on mobile */}
            <SearchBar
              onSearch={handleSearch}
              onClear={clearSearch}
              initialValue={query}
              className="navbar__search"
            />

            <ThemeSwitcher />

            {/* Mobile Menu Button - Hidden on desktop */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="navbar__menu-button"
              aria-label="開啟選單"
              aria-expanded={isDrawerOpen}
            >
              <Menu aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        {/* Mobile Search */}
        <div className="mobile-drawer__search">
          <SearchBar
            onSearch={(value) => {
              handleSearch(value)
              if (value) {
                setIsDrawerOpen(false)
              }
            }}
            onClear={clearSearch}
            initialValue={query}
          />
        </div>

        {/* Mobile Navigation */}
        <nav className="mobile-drawer__nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
              onClick={() => setIsDrawerOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </MobileDrawer>
    </>
  )
}
```

**MODIFY** `scss/components/_navbar.scss`

```scss
// ADD: Desktop search bar styles
.navbar {
  // ... existing styles ...

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
  }

  &__search {
    // Show on desktop only
    display: flex;
    width: 280px;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__menu-button {
    // Hide on desktop, show on mobile
    display: none;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--color-text-primary);
    cursor: pointer;
    border-radius: var(--radius-lg);
    transition: background-color var(--transition-fast);

    svg {
      width: 24px;
      height: 24px;
    }

    &:hover {
      background-color: var(--color-bg-secondary);
    }

    @media (max-width: 768px) {
      display: flex;
    }
  }

  &__nav {
    // Hide navigation on mobile
    @media (max-width: 768px) {
      display: none;
    }
  }
}

// ADD: Mobile drawer navigation styles
.mobile-drawer {
  &__search {
    margin-bottom: var(--spacing-4);
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);

    a {
      display: block;
      padding: var(--spacing-4);
      color: var(--color-text-primary);
      text-decoration: none;
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-medium);
      border-radius: var(--radius-lg);
      transition: background-color var(--transition-fast);

      &:hover {
        background-color: var(--color-bg-secondary);
      }

      &.active {
        background-color: var(--color-brand-light);
        color: var(--color-brand-primary);
        font-weight: var(--font-weight-semibold);
      }
    }
  }
}
```

**VALIDATION:**
```bash
# Type check
npx tsc --noEmit components/layout/Navbar.tsx

# Build check
npm run build
```

---

#### Task 6: Update Home Page to Show Search Results

**MODIFY** `app/page.tsx`

```typescript
// FIND: Existing imports
// ADD: SearchResults component and useSearchParams

'use client'

import { useSearchParams } from 'next/navigation'
import { ArticleList } from '@/components/article/ArticleList'
import { Sidebar } from '@/components/layout/Sidebar'
import { SearchResults } from '@/components/search/SearchResults'
import { useSearch } from '@/hooks/useSearch'
// ... other imports

// MODIFY: Home component to check for search query
export default function Home() {
  const { query, results, isSearching } = useSearch()

  // If searching, show search results instead of default article list
  if (isSearching) {
    return (
      <div className="home">
        <div className="home__content">
          <SearchResults
            query={query}
            results={results}
            isSearching={isSearching}
          />
        </div>
        <Sidebar />
      </div>
    )
  }

  // Default home page with all articles
  return (
    // ... existing home page JSX
  )
}
```

**VALIDATION:**
```bash
# Type check
npx tsc --noEmit app/page.tsx

# Build check
npm run build
```

---

#### Task 7: Install Required Dependencies

**RUN** in terminal:

```bash
# Install use-debounce for search debouncing
npm install use-debounce

# Install types
npm install --save-dev @types/use-debounce
```

**VALIDATION:**
```bash
# Check package.json updated
cat package.json | grep use-debounce
```

---

#### Task 8: Add TypeScript Type Definitions

**CREATE** `types/search.ts`

```typescript
import { Post } from './post'

export interface SearchState {
  query: string
  results: Post[]
  isSearching: boolean
  resultCount: number
}

export interface SearchBarProps {
  onSearch: (query: string) => void
  onClear?: () => void
  initialValue?: string
  placeholder?: string
  className?: string
}

export interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export interface SearchResultsProps {
  query: string
  results: Post[]
  isSearching: boolean
}
```

**VALIDATION:**
```bash
# Type check all new files
npx tsc --noEmit
```

---

### Integration Points

```yaml
HOOKS:
  - create: hooks/useSearch.ts
    exports: useSearch hook with query, results, handleSearch, clearSearch
    imports: getAllPosts from lib/posts.ts

COMPONENTS:
  - modify: components/layout/Navbar.tsx
    adds: SearchBar, MobileDrawer, hamburger button
    state: isDrawerOpen, search query

  - modify: app/page.tsx
    conditional: Show SearchResults when query exists, else default ArticleList

SCSS:
  - modify: scss/components/_navbar.scss
    adds: navbar__search, navbar__menu-button responsive styles

  - import in: scss/styles.scss
    new files: _search-bar.scss, _mobile-drawer.scss, _search-results.scss

TYPES:
  - create: types/search.ts
    exports: SearchState, SearchBarProps, MobileDrawerProps, SearchResultsProps

DEPENDENCIES:
  - add: use-debounce (for search input debouncing)
```

---

## Validation Loop

### Level 1: TypeScript & Linting

```bash
# Type check all files
npx tsc --noEmit

# Expected: No type errors
# If errors: Read the error message, identify the issue, fix it, re-run

# Lint check (if ESLint configured)
npm run lint

# Expected: No linting errors
# If errors: Auto-fix with npm run lint -- --fix
```

---

### Level 2: Build Test

```bash
# Build the Next.js application
npm run build

# Expected: Build succeeds without errors
# If failing: Check error logs, common issues:
#   - Missing imports
#   - Type errors in components
#   - SCSS syntax errors
#   - Missing CSS variable definitions

# Start development server
npm run dev

# Expected: Server starts on http://localhost:3000
# If failing: Check port availability, dependency issues
```

---

### Level 3: Manual Feature Testing

**Desktop Testing (≥768px):**

```bash
# 1. Open http://localhost:3000 in browser (width ≥ 768px)
# Expected:
#   - Search bar visible in navbar (left of theme switcher)
#   - Navigation links visible
#   - No hamburger menu button

# 2. Type "React" in search bar
# Expected:
#   - Input value updates as you type
#   - After 500ms, URL updates with ?q=React
#   - Article list filters to show only React-related posts
#   - Result count displays: "關鍵字「React」找到 X 篇文章"

# 3. Press Escape key while focused on search
# Expected:
#   - Search input clears
#   - URL parameter ?q removed
#   - All articles displayed again

# 4. Click X button in search bar
# Expected: Same as Escape key behavior

# 5. Test keyboard navigation
# Tab to search bar → Type → Tab through results
# Expected: Focus visible at each step
```

**Mobile Testing (<768px):**

```bash
# 1. Resize browser to width < 768px (or use DevTools mobile view)
# Expected:
#   - Navigation links hidden
#   - Search bar hidden
#   - Hamburger menu button visible (right of theme switcher)

# 2. Click hamburger menu button
# Expected:
#   - Drawer slides in from right
#   - Backdrop appears (dimmed overlay)
#   - Body scroll disabled
#   - Focus moves to drawer

# 3. Verify drawer contents
# Expected:
#   - Header with "選單" title and close button
#   - Search bar at top
#   - Vertical navigation links below

# 4. Type search query in drawer search
# Expected:
#   - Search filters articles
#   - Drawer closes after search
#   - Results display on page

# 5. Click backdrop (outside drawer)
# Expected:
#   - Drawer closes
#   - Body scroll re-enabled
#   - Focus returns to hamburger button

# 6. Press Escape key with drawer open
# Expected: Same as clicking backdrop

# 7. Click navigation link in drawer
# Expected:
#   - Navigate to selected page
#   - Drawer closes
```

---

### Level 4: Accessibility Testing

```bash
# Keyboard Navigation Test
# 1. Tab through all interactive elements
# Expected: Visible focus indicator on each element

# 2. Open mobile drawer with keyboard
# Tab to hamburger button → Press Enter
# Expected: Drawer opens, focus moves inside

# 3. Tab through drawer contents
# Expected: Focus cycles through search, nav links, close button

# 4. Press Escape with drawer open
# Expected: Drawer closes, focus returns to hamburger button

# Screen Reader Test (macOS VoiceOver or similar)
# 1. Navigate to search bar
# Expected: Announces "搜尋文章" and description

# 2. Type in search and wait for results
# Expected: Result count announced via aria-live

# 3. Navigate to mobile drawer button
# Expected: Announces "開啟選單" and expanded state

# 4. Open drawer
# Expected: Announces "導覽選單" dialog role

# Color Contrast Test
# Use browser extension (axe DevTools or Lighthouse)
# Expected: All text meets WCAG AA contrast ratio (4.5:1)
```

---

### Level 5: Responsive Breakpoint Testing

```bash
# Test at different viewport widths:
# - 320px (iPhone SE)
# - 375px (iPhone 12)
# - 768px (iPad)
# - 1024px (Desktop)
# - 1440px (Large Desktop)

# At each breakpoint:
# 1. Check layout doesn't break
# 2. Verify search bar visibility (show ≥768px, hide <768px)
# 3. Verify hamburger button visibility (hide ≥768px, show <768px)
# 4. Verify navigation visibility (show ≥768px, hide <768px)
# 5. Test drawer animation smoothness
# 6. Verify no horizontal scroll
```

---

## Final Validation Checklist

- [ ] TypeScript compiles without errors: `npx tsc --noEmit`
- [ ] Next.js builds successfully: `npm run build`
- [ ] No console errors in browser DevTools
- [ ] Search bar visible on desktop (≥768px)
- [ ] Search filters posts by keyword in title, excerpt, content, tags
- [ ] Search debounces with 500ms delay
- [ ] Search updates URL with ?q parameter
- [ ] Escape key clears search
- [ ] X button clears search
- [ ] Hamburger menu visible on mobile (<768px)
- [ ] Navigation and search hidden on mobile
- [ ] Drawer slides in smoothly from right
- [ ] Drawer contains search and navigation
- [ ] Backdrop dims content when drawer open
- [ ] Body scroll disabled when drawer open
- [ ] Clicking backdrop closes drawer
- [ ] Pressing Escape closes drawer
- [ ] Clicking navigation link closes drawer
- [ ] Focus management works correctly
- [ ] Tab navigation cycles through focusable elements
- [ ] ARIA attributes present on all interactive elements
- [ ] Search results display with count
- [ ] Empty state shows helpful message
- [ ] All responsive breakpoints tested
- [ ] BEM naming convention followed
- [ ] CSS variables used (no hardcoded values)
- [ ] No files exceed 300 lines
- [ ] No console.log statements left in code

---

## Anti-Patterns to Avoid

- ❌ Don't hardcode colors/spacing - use CSS variables from design system
- ❌ Don't skip debouncing on search input - causes performance issues
- ❌ Don't forget to prevent body scroll when drawer is open
- ❌ Don't forget focus management (trap in drawer, restore on close)
- ❌ Don't use inline styles - use SCSS with BEM naming
- ❌ Don't forget ARIA attributes for accessibility
- ❌ Don't forget keyboard event handling (Escape, Enter, Tab)
- ❌ Don't use different breakpoint values in TS and SCSS - keep consistent (768px)
- ❌ Don't forget to update URL with search query for shareability
- ❌ Don't create new article list component - reuse ArticleList
- ❌ Don't forget backdrop overlay for mobile drawer
- ❌ Don't forget z-index layering (navbar < backdrop < drawer)
- ❌ Don't skip hydration mismatch prevention (mounted state)
- ❌ Don't forget to close drawer when navigation link clicked
- ❌ Don't forget to clean up event listeners in useEffect

---

## Testing Scenarios Summary

### Core Functionality
1. ✅ Search filters posts by keyword
2. ✅ Debouncing prevents excessive filtering
3. ✅ URL synchronization with ?q parameter
4. ✅ Clear search with Escape or X button
5. ✅ Responsive layout at all breakpoints

### Mobile Navigation
1. ✅ Drawer opens/closes smoothly
2. ✅ Backdrop click closes drawer
3. ✅ Escape key closes drawer
4. ✅ Navigation closes drawer
5. ✅ Body scroll prevention

### Accessibility
1. ✅ Keyboard navigation works
2. ✅ Focus trap in drawer
3. ✅ Focus restoration on close
4. ✅ ARIA attributes present
5. ✅ Screen reader announcements

### Edge Cases
1. ✅ Empty search results handled
2. ✅ No posts available handled
3. ✅ Rapid drawer open/close
4. ✅ Search during navigation
5. ✅ Theme switching with drawer open

---

## Documentation Updates Needed

After implementation, update:
- [ ] README.md with search feature description
- [ ] Component documentation comments
- [ ] CLAUDE.md if new patterns introduced

---

## Confidence Score: 8/10

**Reasoning:**
- **Strong foundation**: Existing codebase has clear patterns to follow
- **Comprehensive context**: All necessary documentation and examples provided
- **Proven patterns**: Using established Next.js 15 and React patterns
- **Clear validation**: Executable tests and manual testing scenarios
- **Accessibility focus**: WCAG guidelines integrated from the start

**Potential Risks (-2 points):**
- First-time implementation of drawer pattern in this codebase (may need iteration)
- Focus management complexity (need to test thoroughly across devices)

**Mitigation:**
- Extensive manual testing checklist provided
- Reference implementations from Material-UI and web research
- Clear validation gates at each level

---

**Implementation should succeed in one pass if all validation gates are followed systematically.**
