/**
 * SearchWrapper Component (Progressive Enhancement)
 *
 * Client component that provides search functionality as progressive enhancement.
 * When JavaScript loads, users can search. When JavaScript is disabled, they still
 * see the full article list (rendered on server).
 *
 * Features:
 * - Progressive enhancement approach
 * - Search input with debounce
 * - Shows/hides based on search state
 * - Preserves SEO with fallback content
 *
 * Reason: Separates interactive search from static content for better SEO
 */

'use client'

import { Post } from '@contentlayer/generated'
import { SearchResults } from '@/components/search/SearchResults'
import { useSearch } from '@/hooks/useSearch'

interface SearchWrapperProps {
  initialPosts: Post[]
}

export const SearchWrapper: React.FC<SearchWrapperProps> = ({ initialPosts }) => {
  const { query, results, isSearching } = useSearch(initialPosts)

  // Reason: Only show search results when actively searching
  // This keeps the static article list visible for SEO
  if (!isSearching) {
    return null
  }

  return (
    <SearchResults
      query={query}
      results={results}
      isSearching={isSearching}
    />
  )
}
