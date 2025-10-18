/**
 * Next.js Configuration with Contentlayer Integration
 *
 * CRITICAL: Uses withContentlayer from next-contentlayer2 (fork)
 * - Hooks Contentlayer into Next.js build process
 * - Auto-generates types and content data before build/dev
 * - Enables hot-reload for content changes in development
 */

import { withContentlayer } from 'next-contentlayer2'

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./scss'],
  },
}

// Wrap Next.js config with Contentlayer
// Reason: Integrates content processing into build pipeline
export default withContentlayer(nextConfig)
