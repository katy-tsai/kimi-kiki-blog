/**
 * Navbar Component
 *
 * Fixed navigation bar with logo, navigation links, and theme switcher.
 *
 * Features:
 * - Fixed positioning at top of page
 * - Responsive design
 * - Theme switcher integration
 * - Navigation links for Tags, About, Contact pages
 */

import Link from 'next/link'
import { ThemeSwitcher } from './ThemeSwitcher'

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link href="/" className="navbar__logo">
          kimi-kiki Blog
        </Link>

        <ul className="navbar__nav">
          <li className="navbar__nav-item">
            <Link href="/tags" className="navbar__nav-link">
              Tags
            </Link>
          </li>
          <li className="navbar__nav-item">
            <Link href="/about" className="navbar__nav-link">
              About
            </Link>
          </li>
          <li className="navbar__nav-item">
            <Link href="/contact" className="navbar__nav-link">
              Contact
            </Link>
          </li>
        </ul>

        <ThemeSwitcher />
      </div>
    </nav>
  )
}
