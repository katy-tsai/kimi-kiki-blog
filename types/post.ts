/**
 * Post Type Definitions
 *
 * Defines all TypeScript interfaces for blog posts and metadata
 */

export interface PostMetadata {
  title: string
  excerpt: string
  date: string
  tags: string[]
  author: {
    name: string
    avatar?: string
  }
  featured?: boolean
}

export interface Post extends PostMetadata {
  slug: string
  content: string
  readTime?: number
  views?: number // Reason: Track article view count for display
}

export interface PostFrontmatter {
  title: string
  excerpt: string
  date: string
  tags: string[]
  author: {
    name: string
    avatar?: string
  }
  featured?: boolean
  views?: number // Reason: Optional view count for articles
}
