/**
 * TagBadge Component
 *
 * Badge component for displaying tags with optional color variants.
 *
 * Reason: Pure UI component for consistent tag styling
 */

import React from 'react'

interface TagBadgeProps {
  tag: string
  className?: string
}

export const TagBadge: React.FC<TagBadgeProps> = ({ tag, className = '' }) => {
  // Reason: Map tag names to color classes based on design tokens
  const getTagColorClass = (tagName: string): string => {
    return 'tag-badge--default'
  }

  const colorClass = getTagColorClass(tag)

  return (
    <span className={`tag-badge ${colorClass} ${className}`}>
      {`#${tag}`}
    </span>
  )
}
