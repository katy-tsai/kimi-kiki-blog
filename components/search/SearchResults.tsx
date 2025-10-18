'use client'

import { Post } from '@contentlayer/generated'
import { ArticleList } from '@/components/article/ArticleList'

interface SearchResultsProps {
  query: string
  results: Post[]
  isSearching: boolean
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  results,
  isSearching,
}) => {
  if (!isSearching) {
    return null
  }

  return (
    <div className="search-results">
      <div className="search-results__header">
        <h2 className="search-results__title">
          搜尋結果
        </h2>
        <p
          className="search-results__count"
          role="status"
          aria-live="polite"
        >
          {query && (
            <>
              關鍵字「<span className="search-results__query">{query}</span>」
              找到 <strong>{results.length}</strong> 篇文章
            </>
          )}
        </p>
      </div>

      {results.length === 0 ? (
        <div className="search-results__empty">
          <p>沒有找到相關文章</p>
          <p className="search-results__hint">
            請嘗試其他關鍵字或瀏覽所有文章
          </p>
        </div>
      ) : (
        <ArticleList posts={results} />
      )}
    </div>
  )
}
