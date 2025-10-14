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

export const metadata: Metadata = {
  title: 'About',
  description: '關於 kimi-kiki - 技術分享與學習',
}

export default function AboutPage() {
  const techStack = [
    'React',
    'TypeScript',
    'Next.js',
    'Node.js',
    'Python',
    'Docker',
    'AWS',
    'Git',
  ]

  const socialLinks = [
    { name: 'GitHub', icon: '📱', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
  ]

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Profile Section */}
        <section className="about-profile">
          <div className="about-profile__avatar">👩‍💻</div>
          <h1 className="about-profile__title">Hi, 我是 kimi-kiki</h1>
          <p className="about-profile__description">
            一位熱愛學習與分享的全端工程師，專注於 Web 開發、AI
            技術與開發者體驗優化
          </p>
        </section>

        {/* Tech Stack Section */}
        <section className="about-section">
          <h2 className="about-section__title">💼 技能</h2>
          <div className="about-tech-stack">
            {techStack.map((tech) => (
              <div key={tech} className="about-tech-item">
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* Social Links Section */}
        <section className="about-section">
          <h2 className="about-section__title">🔗 社群連結</h2>
          <div className="about-social">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="about-social__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="about-social__icon">{link.icon}</span>
                <span className="about-social__name">{link.name}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
