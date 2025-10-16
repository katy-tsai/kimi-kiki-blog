'use client'
/**
 * Navbar Component
 *
 * Fixed navigation bar with logo, navigation links, search bar, and theme switcher.
 *
 * Features:
 * - Fixed positioning at top of page
 * - Responsive design with mobile drawer
 * - Search functionality integrated
 * - Theme switcher integration
 * - Navigation links for Tags, About, Contact pages
 */

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { ThemeSwitcher } from './ThemeSwitcher'
import { SearchBar } from './SearchBar'
import { MobileDrawer } from './MobileDrawer'
import { useSearch } from '@/hooks/useSearch'


export const Navbar = () => {
  const pathname = usePathname()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { query, handleSearch, clearSearch } = useSearch([])

  const navItems = [
    { href: '/', label: '首頁' },
    { href: '/posts/lastest', label: '文章頁' },
    { href: '/tags', label: '標籤頁' },
    // { href: '/about', label: '關於我' },
    // { href: '/contact', label: '聯絡我' },
  ]

  return (
    <>
      <header className="navbar">
        <div className="navbar__container">
          <Link href="/" className="navbar__logo">
            kimi-kiki
          </Link>

          <nav className="navbar__nav">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? 'active' : ''}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="navbar__actions">
            <SearchBar
              onSearch={handleSearch}
              onClear={clearSearch}
              initialValue={query}
              className="navbar__search"
            />

            <ThemeSwitcher />

            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="navbar__menu-button"
              aria-label="開啟選單"
              aria-expanded={isDrawerOpen}
            >
              <Menu aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="mobile-drawer__search">
          <SearchBar
            onSearch={(value) => {
              handleSearch(value)
              if (value) {
                setIsDrawerOpen(false)
              }
            }}
            onClear={clearSearch}
            initialValue={query}
          />
        </div>

        <nav className="mobile-drawer__nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
              onClick={() => setIsDrawerOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </MobileDrawer>
    </>
  )
}
