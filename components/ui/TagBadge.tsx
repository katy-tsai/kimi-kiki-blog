/**
 * TagBadge Component
 *
 * Badge component for displaying tags with optional color variants.
 * Can be rendered as a link or plain span.
 *
 * Features:
 * - Optional link to tag filter page
 * - URL encoding for tags with spaces
 * - Consistent styling
 *
 * Reason: Pure UI component for consistent tag styling
 */

import React from 'react'
import Link from 'next/link'

interface TagBadgeProps {
  tag: string
  className?: string
  asLink?: boolean
}

export const TagBadge: React.FC<TagBadgeProps> = ({
  tag,
  className = '',
  asLink = false,
}) => {
  // Reason: Map tag names to color classes based on design tokens
  // Currently all tags use default color, but can be extended in the future
  const colorClass = 'tag-badge--default'
  const tagClassName = `tag-badge ${colorClass} ${className}`
  const tagContent = `#${tag}`

  // CRITICAL: If asLink is true, render as Link with URL-encoded href
  if (asLink) {
    return (
      <Link
        href={`/tags/${encodeURIComponent(tag)}`}
        className={tagClassName}
      >
        {tagContent}
      </Link>
    )
  }

  // Reason: Render as span for non-clickable tags
  return <span className={tagClassName}>{tagContent}</span>
}
