/**
 * Home Page
 *
 * Main landing page displaying article list with sidebar and hero banner.
 *
 * Features:
 * - Hero banner
 * - Sidebar with hot tags and recommended posts
 * - Article list
 * - Responsive layout
 *
 * Reason: Server component that fetches posts and displays them
 */

import type { Metadata } from 'next'

import { ArticleList } from '@/components/article/ArticleList'
import { HeroBanner } from '@/components/home/HeroBanner'
import { Sidebar } from '@/components/layout/Sidebar'
import usePostTagData from '@/hooks/usePostTagData'

export const metadata: Metadata = {
  title: 'Home',
  description: '技術部落格 - 分享程式開發與學習心得',
}

export default async function HomePage() {
  let { allTags, posts, finalRecommendedPosts } = await usePostTagData();


  return (
    <main className="home">
      {/* Hero Banner */}

      <Sidebar tags={allTags} recommendedPosts={finalRecommendedPosts} />
      {/* Main Content with Sidebar */}
      <div className="home__content-wrapper">
        <div className="home__hero-container">
          <HeroBanner />
        </div>
        <div className="home__content">
          {/* Articles Section */}
          <section className="home__articles">
            <h2 className="home__articles-title">📝 最新文章</h2>
            <ArticleList posts={posts} />
          </section>
        </div>
      </div>
    </main>
  )
}
