/**
 * Post Detail Page
 *
 * Displays full blog post with:
 * - Post header (title, date, tags, read time)
 * - Table of contents (TOC)
 * - Markdown content rendered as HTML
 * - Prev/Next post navigation
 * - Comment section placeholder
 *
 * Uses generateStaticParams for static generation
 *
 * Reason: Dynamic route for individual blog posts
 */

import { getPostBySlug, getAllPosts, getSortedPosts, getAllTags, getRecommendedPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import Link from 'next/link'
import type { Metadata } from 'next'
import { TagBadge } from '@/components/ui/TagBadge'
import { TOC } from '@/components/article/TOC'
import { Clock } from 'lucide-react'
import { Sidebar } from '@/components/layout/Sidebar'
import GiscusBoard from '@/components/giscus/GiscusBoard';


// CRITICAL: Next.js 15 - params is a Promise
interface PostPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate static params for all posts
 *
 * Reason: Pre-render all blog posts at build time for optimal performance
 */
export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

/**
 * Generate metadata for SEO
 *
 * Reason: Dynamic metadata for better SEO and social sharing
 */
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
  }
}

/**
 * Post Detail Page Component
 *
 * Reason: Displays full blog post with all details and navigation
 */
export default async function PostPage({ params }: PostPageProps) {
  let { slug } = await params

  // Reason: Get data for sidebar
  const allTags = getAllTags()
  const allPosts = getSortedPosts()

  const recommendedPosts = getRecommendedPosts(allPosts)

  if (slug === "lastest") {
    slug = allPosts[0].slug
  }

  let post = getPostBySlug(slug)

  // Reason: Show 404 if post not found
  // CRITICAL: getPostBySlug now returns undefined (not null)
  if (!post) {
    notFound()
  }

  // Reason: Get prev/next posts for navigation

  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  // Reason: Format date in Chinese format
  const formattedDate = format(new Date(post.date), 'yyyy年MM月dd日')

  return (
    <div className="post-page">
      <Sidebar tags={allTags} recommendedPosts={recommendedPosts} />
      <article className="post-container">
        {/* Post Header */}
        <header className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <time className="post-meta__date">{formattedDate}</time>
            {post.readTime && (
              <span className="post-meta__read-time">
                <Clock size={14} />
                {post.readTime} 分鐘閱讀
              </span>
            )}
          </div>
          <div className="post-tags">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </header>

        {/* TOC Component */}
        <TOC content={post.body.html} />

        {/* Post Content */}
        {/* CRITICAL: post.body.html contains processed HTML from Contentlayer */}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />

        {/* Prev/Next Navigation */}
        <nav className="post-navigation">
          {prevPost && (
            <Link href={`/posts/${prevPost.slug}`} className="post-navigation__prev">
              <span className="post-navigation__label">← 上一篇</span>
              <span className="post-navigation__title">{prevPost.title}</span>
            </Link>
          )}
          {nextPost && (
            <Link href={`/posts/${nextPost.slug}`} className="post-navigation__next">
              <span className="post-navigation__label">下一篇 →</span>
              <span className="post-navigation__title">{nextPost.title}</span>
            </Link>
          )}
        </nav>

        {/* Comments Placeholder */}
        <GiscusBoard slug={slug} />
      </article>
    </div>
  )


}
{/* <Giscus
      id="comments"
      repo="giscus/giscus-component"
      repoId="MDEwOlJlcG9zaXRvcnkzOTEzMTMwMjA="
      category="Announcements"
      categoryId="DIC_kwDOF1L2fM4B-hVS"
      mapping="specific"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="en"
      loading="lazy"
    /> */}
{/* <script src="https://giscus.app/client.js"
        data-repo="katy-tsai/kimi-kiki-blog"
        data-repo-id="R_kgDOQCGfTQ"
        data-category="General"
        data-category-id="DIC_kwDOQCGfTc4Cwtjr"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="zh-TW"
        crossorigin="anonymous"
        async>
</script> */}