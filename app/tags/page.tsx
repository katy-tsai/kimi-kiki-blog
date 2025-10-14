/**
 * Tags List Page
 *
 * Displays all available tags with article counts.
 *
 * Features:
 * - Grid layout of tag cards
 * - Article count per tag
 * - Links to filtered tag pages
 * - Responsive design
 *
 * Reason: Allow users to browse content by tags
 */

import type { Metadata } from 'next'
import { getAllTags, getAllPosts } from '@/lib/posts'
import { TagBadge } from '@/components/ui/TagBadge'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tags',
  description: '瀏覽所有文章標籤',
}

export default async function TagsPage() {
  const allTags = await getAllTags()
  const allPosts = await getAllPosts()

  // Reason: Count articles per tag
  const tagCounts = allTags.map((tag) => {
    const count = allPosts.filter((post) => post.tags.includes(tag)).length
    return { tag, count }
  })

  return (
    <div className="tags-page">
      <div className="tags-container">
        <header className="tags-header">
          <h1 className="tags-title">🏷️ 所有標籤</h1>
          <p className="tags-description">
            瀏覽所有文章標籤，找到你感興趣的主題
          </p>
        </header>

        <div className="tags-grid">
          {tagCounts.map(({ tag, count }) => (
            <Link key={tag} href={`/tags/${tag}`} className="tag-card">
              <div className="tag-card__badge">
                <TagBadge tag={tag} />
              </div>
              <div className="tag-card__count">{count} 篇文章</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
