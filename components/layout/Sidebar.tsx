/**
 * Sidebar Component
 *
 * Collapsible sidebar with hot tags and recommended posts.
 *
 * Features:
 * - Sticky positioning
 * - Collapsible with toggle button
 * - Hot tags section
 * - Recommended posts section
 * - Mobile responsive (hidden on mobile)
 *
 * Reason: Provides quick navigation to popular content
 */

'use client'

import { useState } from 'react'
import { TagBadge } from '@/components/ui/TagBadge'
import Link from 'next/link'
import { format } from 'date-fns'
import type { Post } from '@contentlayer/generated'

interface SidebarProps {
  tags: string[]
  recommendedPosts: Post[]
}

/**
 * Sidebar Component
 *
 * Reason: Display hot tags and recommended posts in a collapsible sidebar
 */
export const Sidebar: React.FC<SidebarProps> = ({ tags, recommendedPosts }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Toggle Button */}
      <button
        className="sidebar-toggle"
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!collapsed}
      >
        {collapsed ? '▶' : '◀'}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
        <div className="sidebar__section">
          <h3 className="sidebar__title">🔥 熱門標籤</h3>
          <div className="sidebar__tags">
            {tags.slice(0, 8).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="sidebar__tag-link"
              >
                <TagBadge tag={tag} />
              </Link>
            ))}
          </div>
        </div>

        <div className="sidebar__section">
          <h3 className="sidebar__title">📌 推薦閱讀</h3>
          <div className="sidebar__posts">
            {recommendedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="sidebar__post"
              >
                <div className="sidebar__post-title">{post.title}</div>
                <div className="sidebar__post-date">
                  🕒 {format(new Date(post.date), 'yyyy-MM-dd')}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
