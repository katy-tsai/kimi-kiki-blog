/**
 * Footer Component
 *
 * Page footer with copyright information and optional social links.
 *
 * Features:
 * - Dynamic copyright year
 * - Responsive design
 * - Social media link placeholders
 */

import { Github, Twitter, Linkedin } from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © {currentYear} kimi-kiki. All rights reserved.
        </p>

        <div className="footer__social">
          {/* Placeholder social links - can be customized */}
          <a
            href="https://github.com"
            className="footer__social-link"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={20} />
          </a>
          <a
            href="https://twitter.com"
            className="footer__social-link"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://linkedin.com"
            className="footer__social-link"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
