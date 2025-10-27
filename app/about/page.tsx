/**
 * About Page
 *
 * Displays profile, tech stack, and social links.
 *
 * Features:
 * - Profile section with avatar
 * - Tech stack grid
 * - Social links
 * - Responsive design
 *
 * Reason: Provide information about the blog author
 */

import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import { Sidebar } from '@/components/layout/Sidebar'
import { getAllTags, getSortedPosts, getRecommendedPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'About',
  description: '關於 kimi-kiki - 技術分享與學習',
}

// CRITICAL: Enable static generation
// Reason: Pre-render at build time for instant page loads
export const dynamic = 'force-static'

export default function AboutPage() {
  // Reason: Get data for sidebar
  const allTags = getAllTags()
  const posts = getSortedPosts()
  const recommendedPosts = getRecommendedPosts(posts)
  const techStack = [
    'React',
    'TypeScript',
    'Next.js',
    'Node.js',
    'SCSS',
    'Git',
  ]


  return (
    <div className="about-page">
      <Sidebar tags={allTags} recommendedPosts={recommendedPosts} />
      <div className="about-container">
        {/* Profile Section */}
        <section className="about__profile">
          <div className="about__avatar-circle">
            <div className="about__avatar-emoji">👩‍💻</div>
          </div>
          <h1 className="about__name">Hi, 我是 kimi-kiki</h1>
          <p className="about__bio">
            一位熱愛學習與分享的全端工程師，專注於 Web 開發、AI
            技術與開發者體驗優化
          </p>
        </section>

        {/* Tech Stack Section */}
        <section className="about__section">
          <h2 className="about__section-title">🏠 技能</h2>
          <div className="about__tech-stack">
            {techStack.map((tech) => (
              <div key={tech} className="about__tech-card">
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* Social Links Section */}
        <section className="about__section">
          <h2 className="about__section-title">🔗 社群連結</h2>
          <div className="about__social-buttons">
            <a
              href="https://github.com/kimi-kiki"
              className="about__social-btn about__social-btn--github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>🐙 GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/kimi-kiki"
              className="about__social-btn about__social-btn--linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>💼 LinkedIn</span>
            </a>
            <a
              href="mailto:contact@kimi-kiki.dev"
              className="about__social-btn about__social-btn--email"
              rel="noopener noreferrer"
            >
              <Mail size={20} />
              <span>Email</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
