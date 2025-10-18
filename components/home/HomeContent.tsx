'use client'

import { Post } from '@contentlayer/generated'
import { ArticleList } from '@/components/article/ArticleList'
import { HeroBanner } from '@/components/home/HeroBanner'
import { Sidebar } from '@/components/layout/Sidebar'
import { SearchResults } from '@/components/search/SearchResults'
import { useSearch } from '@/hooks/useSearch'

interface HomeContentProps {
  initialPosts: Post[]
  allTags: string[]
  recommendedPosts: Post[]
}

export const HomeContent: React.FC<HomeContentProps> = ({
  initialPosts,
  allTags,
  recommendedPosts,
}) => {
  const { query, results, isSearching } = useSearch(initialPosts)

  if (isSearching) {
    return (
      <main className="home">
        <Sidebar tags={allTags} recommendedPosts={recommendedPosts} />
        <div className="home__content-wrapper">
          <div className="home__content">
            <SearchResults
              query={query}
              results={results}
              isSearching={isSearching}
            />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="home">
      <Sidebar tags={allTags} recommendedPosts={recommendedPosts} />
      <div className="home__content-wrapper">
        <div className="home__hero-container">
          <HeroBanner />
        </div>
        <div className="home__content">
          <section className="home__articles">
            <h2 className="home__articles-title">📝 最新文章</h2>
            <ArticleList posts={initialPosts} />
          </section>
        </div>
      </div>
    </main>
  )
}
