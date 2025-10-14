/**
 * ThemeSwitcher Component
 *
 * Toggles between light and dark themes.
 *
 * Features:
 * - Persists theme preference in localStorage
 * - Respects system preference on first visit
 * - Smooth transition between themes
 * - Accessible with aria-label
 *
 * Reason: Provide users with light/dark mode preference
 */

'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

export const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Reason: Load theme preference on mount and avoid hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Reason: Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null

    // Reason: Check system preference if no saved theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    // Reason: Use saved theme or system preference
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')

    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  /**
   * Toggle theme between light and dark
   *
   * Reason: Update theme in state, localStorage, and HTML attribute
   */
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  // Reason: Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button className="theme-switcher" aria-label="Toggle theme">
        <Moon size={20} />
      </button>
    )
  }

  return (
    <button
      className="theme-switcher"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}
