'use client'
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
import { usePathname } from 'next/navigation'


export const Navbar = () => {
  const pathname = usePathname()
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link href="/" className="navbar__logo">
          kimi-kiki
        </Link>

        <ul className="navbar__nav ml-20">
          <li className="navbar__nav-item">
            <Link href="/" className={["navbar__nav-link", pathname === "/" ? 'active' : ""].join(" ")}>
              首頁
            </Link>
          </li>
          <li className="navbar__nav-item">
            <Link href="/posts/lastest" className={["navbar__nav-link", pathname === "/posts/lastest" ? 'active' : ""].join(" ")}>
              文章頁
            </Link>
          </li>
          <li className="navbar__nav-item">
            <Link href="/tags" className={["navbar__nav-link", pathname === "/tags" ? 'active' : ""].join(" ")}>
              標籤頁
            </Link>
          </li>
          <li className="navbar__nav-item">
            <Link href="/about" className={["navbar__nav-link", pathname === "/about" ? 'active' : ""].join(" ")}>
              關於我
            </Link>
          </li>
          <li className="navbar__nav-item">
            <Link href="/contact" className={["navbar__nav-link", pathname === "/contact" ? 'active' : ""].join(" ")}>
              聯絡我
            </Link>
          </li>
        </ul>

        <ThemeSwitcher />
      </div>
    </nav >
  )
}
