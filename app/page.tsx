/**
 * Home Page
 *
 * Main landing page displaying article list with sidebar and hero banner.
 *
 * Features:
 * - Hero banner
 * - Sidebar with hot tags and recommended posts
 * - Article list with search functionality
 * - Responsive layout
 *
 * Reason: Server component that fetches data and passes to client components
 */

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { HomeContent } from '@/components/home/HomeContent'
import { getAllTags, getSortedPosts, getRecommendedPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Home',
  description: '技術部落格 - 分享程式開發與學習心得',
}

export default async function HomePage() {
  const allTags = await getAllTags()
  const posts = await getSortedPosts()
  const recommendedPosts = getRecommendedPosts(posts)


  return (
    <Suspense fallback={<div>載入中...</div>}>
      <HomeContent
        initialPosts={posts}
        allTags={allTags}
        recommendedPosts={recommendedPosts}
      />
    </Suspense>
  )
}
