'use client'
/**
 * Navbar Component
 *
 * Fixed navigation bar with logo, navigation links, search bar, and theme switcher.
 *
 * Features:
 * - Fixed positioning at top of page
 * - Responsive design with mobile drawer
 * - Search functionality integrated via URL params
 * - Theme switcher integration
 * - Navigation links for Tags, About, Contact pages
 *
 * PATTERN: URL as single source of truth
 * Reason: Navbar only updates URL, HomeContent reads URL and performs search
 */

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Menu } from 'lucide-react'
import { ThemeSwitcher } from './ThemeSwitcher'
import { SearchBar } from './SearchBar'
import { MobileDrawer } from './MobileDrawer'


export const Navbar = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // CRITICAL: Read query from URL, don't maintain local state
  const currentQuery = searchParams.get('q') || ''

  // Reason: Update URL when search changes
  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value.trim()) {
      params.set('q', value)
    } else {
      params.delete('q')
    }

    // GOTCHA: Navigate to home page if not already there
    // Reason: Search only works on home page where posts are available
    const targetPath = pathname === '/' ? '/' : '/'
    router.push(`${targetPath}?${params.toString()}`)
  }

  // Reason: Clear search by removing query param
  const clearSearch = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('q')
    router.push(`${pathname}?${params.toString()}`)
  }

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
              initialValue={currentQuery}
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
            initialValue={currentQuery}
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
