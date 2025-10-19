/**
 * Table of Contents Component
 *
 * Extracts headings from HTML content and renders navigable TOC.
 *
 * Features:
 * - Parses HTML to find h2, h3 headings
 * - Generates unique IDs for anchor links
 * - Renders hierarchical list
 * - Smooth scroll to sections
 * - Collapsible/expandable toggle
 *
 * Reason: Helps users navigate long articles efficiently
 */

'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface TOCProps {
  content: string // HTML string
}

interface Heading {
  id: string
  text: string
  level: number
}

/**
 * Extract headings from HTML content
 *
 * Reason: Parse HTML to find all h2 and h3 elements for TOC generation
 */
function extractHeadings(html: string): Heading[] {
  const headings: Heading[] = []

  // Reason: Match headings with or without id attributes
  // Pattern: <h2 id="some-id">text</h2> OR <h2>text</h2>
  const headingRegex = /<h([23])(?:\s+id="([^"]*)")?[^>]*>(.*?)<\/h\1>/gi
  let match

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const id = match[2] // ID from rehypeSlug (if present)
    const text = match[3].replace(/<[^>]*>/g, '') // Strip HTML tags from text

    // Reason: Use existing ID from rehypeSlug, or generate one if missing
    const finalId = id || text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u4e00-\u9fa5\-]/g, '') // Support Chinese characters
      .substring(0, 50) // Limit length

    if (text && finalId) {
      headings.push({ id: finalId, text, level })
    }
  }

  return headings
}

/**
 * TOC Component
 *
 * Reason: Display navigable table of contents for blog posts with collapse/expand
 */
export const TOC: React.FC<TOCProps> = ({ content }) => {
  // Reason: Use useMemo to avoid re-parsing on every render
  const headings = useMemo(() => extractHeadings(content), [content])

  // Reason: Track collapse/expand state (default: expanded)
  const [isExpanded, setIsExpanded] = useState(true)

  // Reason: Don't render TOC if no headings found
  if (headings.length === 0) {
    return null
  }

  // Reason: Toggle function for collapse/expand
  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <nav className="toc" aria-label="Table of Contents">
      <div className="toc__header">
        <h3 className="toc__title">📑 目錄</h3>
        <button
          className="toc__toggle"
          onClick={toggleExpand}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? '收合目錄' : '展開目錄'}
        >
          {isExpanded ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </button>
      </div>

      {isExpanded && (
        <ul className="toc__list">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`toc__item toc__item--level-${heading.level}`}
            >
              <a href={`#${heading.id}`} className="toc__link">
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
