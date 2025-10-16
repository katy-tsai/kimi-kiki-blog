/**
 * Root Layout
 *
 * Main layout wrapping all pages with Navbar and Footer.
 *
 * Reason: Root layout provides consistent structure across all pages
 */

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import View from '@/components/layout/View'
import './globals.scss'

export const metadata: Metadata = {
  title: {
    default: 'kimi-kiki Blog | 技術分享',
    template: '%s | kimi-kiki Blog',
  },
  description: '分享程式開發、AI 技術與學習心得',
  keywords: ['技術部落格', 'React', 'TypeScript', 'AI', 'Next.js'],
  authors: [{ name: 'kimi-kiki' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Suspense fallback={<div style={{ height: 'var(--navbar-height)' }} />}>
          <Navbar />
        </Suspense>
        <main className="main-content">
          <View>
            {children}
          </View>
        </main>
        <Footer />
      </body>
    </html>
  )
}
