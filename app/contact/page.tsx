/**
 * Contact Page
 *
 * Displays contact form and direct contact information.
 *
 * Features:
 * - Contact form (UI only, no submission logic)
 * - Direct contact info
 * - Responsive design
 * - Form validation attributes
 *
 * Reason: Provide users with multiple ways to contact the author
 *
 * Note: Form submission logic not implemented (future feature)
 */

import type { Metadata } from 'next'
import { Sidebar } from '@/components/layout/Sidebar'
import { getAllTags, getSortedPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Contact',
  description: '聯絡 kimi-kiki - 合作洽詢與交流',
}

export default async function ContactPage() {
  // Reason: Get data for sidebar
  const allTags = await getAllTags()
  const posts = await getSortedPosts()
  const recommendedPosts = posts.filter((post) => post.featured).slice(0, 3)
  const finalRecommendedPosts =
    recommendedPosts.length >= 3
      ? recommendedPosts
      : [...recommendedPosts, ...posts.slice(0, 3 - recommendedPosts.length)]

  return (
    <div className="contact-page">
      <Sidebar tags={allTags} recommendedPosts={finalRecommendedPosts} />
      <div className="contact-container">
        <header className="contact-header">
          <h1 className="contact-title">📬 聯絡我</h1>
          <p className="contact-subtitle">
            有任何問題或合作機會歡迎聯繫我！
          </p>
        </header>

        <div className="contact-content">
          {/* Contact Form */}
          <section className="contact-form-section">
            <form className="contact-form">
              <div className="contact-form__field">
                <label htmlFor="name" className="contact-form__label">
                  姓名
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="contact-form__input"
                  placeholder="請輸入你的姓名"
                  required
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="email" className="contact-form__label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="contact-form__input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="subject" className="contact-form__label">
                  主旨
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="contact-form__input"
                  placeholder="關於..."
                  required
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="message" className="contact-form__label">
                  訊息內容
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="contact-form__textarea"
                  placeholder="請輸入你想說的話..."
                  required
                />
              </div>

              <button type="submit" className="contact-form__submit">
                送出訊息
              </button>
            </form>
          </section>

          {/* Direct Contact Info */}
          <section className="contact-direct">
            <h3 className="contact-direct__title">或直接透過以下方式聯繫</h3>
            <div className="contact-direct__info">
              <p className="contact-direct__item">
                📧 contact@kimi-kiki.dev
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
