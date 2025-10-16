'use client'

import { useState, KeyboardEvent, ChangeEvent } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
  onClear?: () => void
  initialValue?: string
  placeholder?: string
  className?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onClear,
  initialValue = '',
  placeholder = '搜尋文章關鍵字...',
  className = '',
}) => {
  const [value, setValue] = useState(initialValue)
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    onSearch(newValue)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      handleClear()
    }
  }

  const handleClear = () => {
    setValue('')
    onSearch('')
    onClear?.()
  }

  return (
    <div
      className={`search-bar ${isFocused ? 'search-bar--focused' : ''} ${className}`}
      role="search"
    >
      <Search className="search-bar__icon" aria-hidden="true" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="search-bar__input"
        aria-label="搜尋文章"
        aria-describedby="search-description"
      />
      <span id="search-description" className="sr-only">
        輸入關鍵字搜尋文章標題、內容或標籤
      </span>
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="search-bar__clear"
          aria-label="清除搜尋"
        >
          <X aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
