/**
 * Post Utility Functions
 *
 * Functions for reading, parsing, and processing blog posts from markdown files.
 *
 * Reason: Server-side functions for fetching post data from content/posts directory
 */

import fs from 'fs'
import path from 'path'
import { parseMarkdown } from './markdown'
import type { Post } from '@/types/post'

// Reason: Define posts directory path relative to project root
const postsDirectory = path.join(process.cwd(), 'content/posts')

/**
 * Get all posts from content/posts directory
 *
 * @returns Array of all posts with parsed content
 */
export async function getAllPosts(): Promise<Post[]> {
  try {
    // Reason: Check if directory exists before reading
    if (!fs.existsSync(postsDirectory)) {
      console.warn('Posts directory does not exist:', postsDirectory)
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)

    const posts = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, '')
          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = fs.readFileSync(fullPath, 'utf8')

          const { frontmatter, content, html } = await parseMarkdown(fileContents)

          // Reason: Calculate reading time (200 words per minute average)
          const wordCount = content.split(/\s+/).length
          const readTime = Math.ceil(wordCount / 200)

          return {
            slug,
            ...frontmatter,
            content: html,
            readTime,
          } as Post
        })
    )

    return posts
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

/**
 * Get a single post by slug
 *
 * @param slug - Post slug (filename without .md extension)
 * @returns Single post or null if not found
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { frontmatter, content, html } = await parseMarkdown(fileContents)

    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)

    return {
      slug,
      ...frontmatter,
      content: html,
      readTime,
    } as Post
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

/**
 * Get all posts sorted by date (newest first)
 *
 * @returns Array of posts sorted by date
 */
export async function getSortedPosts(): Promise<Post[]> {
  const posts = await getAllPosts()

  // Reason: Sort posts by date descending (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })
}

/**
 * Get all unique tags from all posts
 *
 * @returns Array of unique tags
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = posts.flatMap((post) => post.tags)

  // Reason: Return unique tags, sorted alphabetically
  return Array.from(new Set(tags)).sort()
}

export function getRecommendedPosts(allPosts: Post[]): Post[] {
  console.log('allPosts', allPosts.length);
  if (allPosts.length <= 3) {
    return allPosts;
  }
  const recommendedPosts = allPosts.filter((post) => post.featured).slice(0, 3)

  const finalRecommendedPosts =
    recommendedPosts.length >= 3
      ? recommendedPosts
      : [...recommendedPosts, ...allPosts.slice(0, 3 - recommendedPosts.length)]


  return finalRecommendedPosts;

}