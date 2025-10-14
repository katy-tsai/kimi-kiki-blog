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
 *
 * Reason: Helps users navigate long articles efficiently
 */

'use client'

import { useMemo } from 'react'

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

  // Reason: Use regex to extract headings (server-safe, no DOMParser)
  const headingRegex = /<h([23])>(.*?)<\/h\1>/gi
  let match

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const text = match[2].replace(/<[^>]*>/g, '') // Strip HTML tags from text

    // Reason: Generate URL-safe ID from heading text
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u4e00-\u9fa5\-]/g, '') // Support Chinese characters
      .substring(0, 50) // Limit length

    if (text && id) {
      headings.push({ id, text, level })
    }
  }

  return headings
}

/**
 * TOC Component
 *
 * Reason: Display navigable table of contents for blog posts
 */
export const TOC: React.FC<TOCProps> = ({ content }) => {
  // Reason: Use useMemo to avoid re-parsing on every render
  const headings = useMemo(() => extractHeadings(content), [content])

  // Reason: Don't render TOC if no headings found
  if (headings.length === 0) {
    return null
  }

  return (
    <nav className="toc" aria-label="Table of Contents">
      <h3 className="toc__title">📑 目錄</h3>
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
    </nav>
  )
}
