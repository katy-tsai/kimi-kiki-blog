import { useState, useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Post } from '@/types/post'

export function useSearch(initialPosts: Post[] = []) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [query, setQuery] = useState(searchParams.get('q') || '')

  const debouncedUpdateURL = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 500)

  const handleSearch = (value: string) => {
    setQuery(value)
    debouncedUpdateURL(value)
  }

  const results = useMemo(() => {
    if (!query.trim()) return initialPosts

    const lowerQuery = query.toLowerCase()
    return initialPosts.filter(post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }, [query, initialPosts])

  const clearSearch = () => {
    setQuery('')
    const params = new URLSearchParams(searchParams.toString())
    params.delete('q')
    router.replace(`${pathname}?${params.toString()}`)
  }

  return {
    query,
    results,
    isSearching: query.length > 0,
    resultCount: results.length,
    handleSearch,
    clearSearch,
  }
}
