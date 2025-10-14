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
    const tagLower = tagName.toLowerCase()
    if (tagLower.includes('react')) return 'tag-badge--react'
    if (tagLower.includes('typescript')) return 'tag-badge--typescript'
    if (tagLower.includes('javascript')) return 'tag-badge--javascript'
    if (tagLower.includes('ai')) return 'tag-badge--ai'
    if (tagLower.includes('frontend')) return 'tag-badge--frontend'
    if (tagLower.includes('backend')) return 'tag-badge--backend'
    if (tagLower.includes('devops')) return 'tag-badge--devops'
    if (tagLower.includes('ui') || tagLower.includes('ux')) return 'tag-badge--uiux'
    return 'tag-badge--default'
  }

  const colorClass = getTagColorClass(tag)

  return (
    <span className={`tag-badge ${colorClass} ${className}`}>
      {tag}
    </span>
  )
}
