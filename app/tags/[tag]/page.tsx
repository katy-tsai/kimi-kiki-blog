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
 * Reason: Pre-render all tag pages at build time
 */
export function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag,
  }))
}

/**
 * Generate metadata for SEO
 *
 * Reason: Dynamic metadata for tag pages
 */
export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params

  return {
    title: `標籤: ${tag}`,
    description: `瀏覽所有標記為「${tag}」的文章`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const allPosts = getAllPosts()

  // Reason: Filter posts by tag
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
