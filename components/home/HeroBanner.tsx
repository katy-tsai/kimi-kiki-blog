/**
 * Hero Banner Component
 *
 * Eye-catching banner for home page with gradient background.
 *
 * Features:
 * - Gradient background
 * - Title and subtitle
 * - Call-to-action button
 * - Responsive design
 *
 * Reason: Creates engaging first impression on home page
 */

import { Button } from '@/components/ui/Button'
import Image from 'next/image'
/**
 * Hero Banner Component
 *
 * Reason: Display welcoming banner on home page matching design prototype
 */
export const HeroBanner: React.FC = () => {
  return (
    <section className="hero-banner">
      <div className="hero-banner__content">
        <h1 className="hero-banner__title">歡迎來到 kimi-kiki 的技術部落格</h1>
        <p className="hero-banner__subtitle">分享程式開發、AI 技術與學習心得</p>
        <Button variant="secondary" size="lg">
          開始閱讀 →
        </Button>
      </div>
      <Image
        src="/images/banner.png"
        alt="kimi-kiki 技術部落格橫幅圖片"
        width={400}
        height={300}
        priority
        className="hero-banner__image"
      />
    </section>
  )
}
