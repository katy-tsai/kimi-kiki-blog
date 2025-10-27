/**
 * Home Page (SSG/SSR Optimized)
 *
 * Main landing page displaying article list with sidebar and hero banner.
 *
 * Features:
 * - Hero banner (static)
 * - Sidebar with hot tags and recommended posts (static)
 * - Article list rendered on server (SEO-friendly)
 * - Search functionality as progressive enhancement
 * - Responsive layout
 *
 * Reason: Server component with static content for better SEO
 * Search is wrapped in client component for interactivity
 */

import type { Metadata } from 'next'
import { HeroBanner } from '@/components/home/HeroBanner'
import { Sidebar } from '@/components/layout/Sidebar'
import { ArticleList } from '@/components/article/ArticleList'
import { SearchWrapper } from '@/components/search/SearchWrapper'
import { getAllTags, getSortedPosts, getRecommendedPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Home',
  description: '技術部落格 - 分享程式開發與學習心得',
}

// CRITICAL: Enable static generation
// Reason: Pre-render at build time for instant page loads
export const dynamic = 'force-static'

export default function HomePage() {
  const allTags = getAllTags()
  const posts = getSortedPosts()
  const recommendedPosts = getRecommendedPosts(posts)

  return (
    <main className="home">
      <Sidebar tags={allTags} recommendedPosts={recommendedPosts} />
      <div className="home__content-wrapper">
        <div className="home__hero-container">
          <HeroBanner />
        </div>
        <div className="home__content">
          {/* Search functionality as progressive enhancement */}
          <SearchWrapper initialPosts={posts} />

          {/* Static article list - rendered on server for SEO */}
          <section className="home__articles">
            <h2 className="home__articles-title">📝 最新文章</h2>
            <ArticleList posts={posts} />
          </section>
        </div>
      </div>
    </main>
  )
}
