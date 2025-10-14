'use client'

/**
 * useTheme Hook
 *
 * Manages theme state (light/dark mode) with localStorage persistence
 * and system preference detection.
 *
 * Features:
 * - Persists theme preference in localStorage
 * - Detects system color scheme preference
 * - Applies theme via data-theme attribute on html element
 * - Provides toggle function for theme switching
 */

import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Read theme from localStorage or detect system preference
    const storedTheme = localStorage.getItem('theme') as Theme | null

    if (storedTheme) {
      setTheme(storedTheme)
      document.documentElement.setAttribute('data-theme', storedTheme)
    } else {
      // Detect system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const systemTheme = prefersDark ? 'dark' : 'light'
      setTheme(systemTheme)
      document.documentElement.setAttribute('data-theme', systemTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return {
    theme,
    toggleTheme,
    mounted, // Used to prevent hydration mismatch
  }
}
