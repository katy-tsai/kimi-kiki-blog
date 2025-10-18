/**
 * useSearch Hook
 *
 * Client-side search functionality for blog posts.
 *
 * PATTERN: URL as single source of truth
 * - Reads query from URL search params
 * - Filters posts based on query
 * - No local state for query (read from URL only)
 *
 * Features:
 * - Full-text search across title, excerpt, content, and tags
 * - Case-insensitive search
 * - Returns filtered results
 *
 * Usage:
 * ```tsx
 * const { query, results, isSearching } = useSearch(posts)
 * ```
 *
 * Reason: Separates search logic from UI components
 */

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Post } from '@contentlayer/generated'

export function useSearch(initialPosts: Post[] = []) {
  const searchParams = useSearchParams()

  // CRITICAL: Read query from URL, not from local state
  // Reason: URL is the single source of truth
  const query = searchParams.get('q') || ''

  // Reason: Filter posts based on query
  // GOTCHA: useMemo prevents re-filtering on every render
  const results = useMemo(() => {
    if (!query.trim()) return initialPosts

    const lowerQuery = query.toLowerCase()

    return initialPosts.filter(post => {
      // Search in title, excerpt, content body, and tags
      return (
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.body.raw.toLowerCase().includes(lowerQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
    })
  }, [query, initialPosts])

  return {
    query,
    results,
    isSearching: query.length > 0,
    resultCount: results.length,
  }
}
