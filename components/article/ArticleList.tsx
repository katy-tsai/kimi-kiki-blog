/**
 * ArticleList Component
 *
 * Container component that displays a grid of article cards.
 *
 * Features:
 * - Grid layout with responsive columns
 * - Empty state handling
 * - Maps posts to ArticleCard components
 *
 * Reason: Pure display component for organizing article previews
 */

import { ArticleCard } from './ArticleCard'
import type { Post } from '@contentlayer/generated'

interface ArticleListProps {
  posts: Post[]
}

export const ArticleList: React.FC<ArticleListProps> = ({ posts }) => {
  // Reason: Handle empty state
  if (posts.length === 0) {
    return (
      <div className="article-list article-list--empty">
        <p className="article-list__empty-message">尚無文章</p>
      </div>
    )
  }

  return (
    <div className="article-list">
      {posts.map((post) => (
        <ArticleCard key={post.slug} post={post} featured={post.featured} />
      ))}
    </div>
  )
}
