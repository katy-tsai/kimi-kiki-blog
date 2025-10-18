/**
 * Contentlayer Configuration
 *
 * Defines content schema and processing pipeline for blog posts.
 *
 * Features:
 * - Type-safe content with auto-generated TypeScript types
 * - GitHub Flavored Markdown support (tables, strikethrough, task lists)
 * - PlantUML diagram rendering
 * - Automatic image path transformation
 * - Heading IDs for table of contents
 *
 * CRITICAL: Uses contentlayer2 (fork) for Next.js 15 + React 19 compatibility
 */

import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkPlantUML from './lib/remark-plantuml'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeImagePath from './lib/rehype-image-path'
import rehypeStringify from 'rehype-stringify'

/**
 * Post Document Type
 *
 * Mirrors the structure from types/post.ts
 * Contentlayer will auto-generate TypeScript types from this schema
 */
export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  contentType: 'markdown', // Using markdown (not mdx)
  fields: {
    title: {
      type: 'string',
      required: true,
      description: 'Post title',
    },
    excerpt: {
      type: 'string',
      required: true,
      description: 'Short summary of the post',
    },
    date: {
      type: 'date', // Auto-parses ISO date strings to Date objects
      required: true,
      description: 'Publication date (ISO format)',
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: true,
      description: 'Array of tags for categorization',
    },
    author: {
      type: 'json',
      description: 'Post author information',
    },
    featured: {
      type: 'boolean',
      default: false,
      description: 'Whether this post is featured',
    },
    views: {
      type: 'number',
      required: false,
      description: 'View count (optional)',
    },
  },
  computedFields: {
    /**
     * Slug - derived from filename
     *
     * Example: "hello-world.md" → "hello-world"
     */
    slug: {
      type: 'string',
      resolve: (post) => post._raw.sourceFileName.replace(/\.md$/, ''),
    },
    /**
     * Read Time - calculated from word count
     *
     * Assumes 200 words per minute reading speed
     */
    readTime: {
      type: 'number',
      resolve: (post) => {
        const wordCount = post.body.raw.split(/\s+/).length
        return Math.ceil(wordCount / 200)
      },
    },
  },
}))

/**
 * Contentlayer Source Configuration
 *
 * CRITICAL: Plugin order matters!
 * - remarkPlugins run BEFORE HTML conversion (MDAST phase)
 * - rehypePlugins run AFTER HTML conversion (HAST phase)
 *
 * GOTCHA: Must use builder function to enable allowDangerousHtml
 * Reason: PlantUML plugin generates <img> HTML tags that must be preserved
 * Reference: https://contentlayer.dev/docs/reference/source-files/make-source-a5ba4922
 */
export default makeSource({
  contentDirPath: 'content/posts',
  documentTypes: [Post],
  markdown: (builder) => {
    // Remark plugins (markdown → MDAST)
    builder.use(remarkFrontmatter) // Parse frontmatter
    builder.use(remarkParse) // Parse markdown to MDAST
    builder.use(remarkGfm) // GitHub Flavored Markdown
    builder.use(remarkPlantUML) // Transform PlantUML code blocks to HTML img tags

    // CRITICAL: Allow HTML nodes to pass through to rehype
    // Reason: PlantUML plugin generates <img> HTML nodes
    builder.use(remarkRehype, { allowDangerousHtml: true })

    // Rehype plugins (MDAST → HAST → HTML)
    builder.use(rehypeRaw) // Parse raw HTML nodes into the tree
    builder.use(rehypeSlug) // Add IDs to headings
    builder.use(rehypeImagePath) // Transform image paths

    // Convert HAST to HTML string
    builder.use(rehypeStringify)
  },
})
