/**
 * Tag Filter Page
 *
 * Displays articles filtered by a specific tag.
 *
 * Features:
 * - generateStaticParams for all tags
 * - Filtered article list
 * - Back link to tags page
 * - SEO metadata
 *
 * Reason: Allow users to view all articles with a specific tag
 */

import type { Metadata } from 'next'
import { getAllTags, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { ArticleList } from '@/components/article/ArticleList'
import { TagBadge } from '@/components/ui/TagBadge'
import Link from 'next/link'

interface TagPageProps {
  params: Promise<{ tag: string }>
}

/**
 * Generate static params for all tags
 *
 * CRITICAL: URL encode tags to handle spaces and special characters
 * Reason: Pre-render all tag pages at build time
 */
export function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

/**
 * Generate metadata for SEO
 *
 * CRITICAL: Decode tag for display in metadata
 * Reason: Dynamic metadata for tag pages
 */
export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag: encodedTag } = await params
  const tag = decodeURIComponent(encodedTag)

  return {
    title: `標籤: ${tag}`,
    description: `瀏覽所有標記為「${tag}」的文章`,
  }
}

// CRITICAL: Enable static generation
// Reason: Pre-render all tag pages at build time for instant page loads
export const dynamic = 'force-static'

export default async function TagPage({ params }: TagPageProps) {
  const { tag: encodedTag } = await params

  // CRITICAL: Decode URL-encoded tag to match original tag names
  // Reason: Tags with spaces are URL-encoded (e.g., "Claude Code" -> "Claude%20Code")
  const tag = decodeURIComponent(encodedTag)

  const allPosts = getAllPosts()

  // Reason: Filter posts by decoded tag
  const filteredPosts = allPosts.filter((post) => post.tags.includes(tag))

  // Reason: Sort by date
  const sortedPosts = filteredPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // Reason: Show 404 if tag has no posts
  if (sortedPosts.length === 0) {
    notFound()
  }

  return (
    <div className="tag-page">
      <div className="tag-container">
        <header className="tag-header">
          <Link href="/tags" className="tag-back-link">
            ← 返回所有標籤
          </Link>
          <div className="tag-info">
            <h1 className="tag-title">
              <TagBadge tag={tag} />
            </h1>
            <p className="tag-count">{sortedPosts.length} 篇文章</p>
          </div>
        </header>

        <section className="tag-articles">
          <ArticleList posts={sortedPosts} />
        </section>
      </div>
    </div>
  )
}
