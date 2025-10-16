/**
 * ArticleCard Component
 *
 * Displays a preview of a blog post with title, excerpt, date, tags, and read time.
 *
 * Features:
 * - Links to full post
 * - Displays metadata (date, read time)
 * - Shows tags as badges
 * - Featured post variant
 *
 * Reason: Pure display component for article previews
 */

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
  featured = false,
}) => {
  // Reason: Format date in Chinese format
  const formattedDate = format(new Date(post.date), 'yyyy年MM月dd日')

  const featuredClass = featured || post.featured ? 'article-card--featured' : ''

  return (
    <article className={`article-card ${featuredClass}`}>
      <Link href={`/posts/${post.slug}`} className="article-card__link">
        <h2 className="article-card__title">{post.title}</h2>
        <p className="article-card__excerpt">{post.excerpt}</p>

        <div className="article-card__meta">
          <div className="article-card__tags">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
          <div className="article-card__info">

            <time className="article-card__date">{formattedDate}</time>
          </div>
        </div>
      </Link>
    </article>
  )
}
