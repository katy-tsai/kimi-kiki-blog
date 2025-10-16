import { Post } from './post'

export interface SearchState {
  query: string
  results: Post[]
  isSearching: boolean
  resultCount: number
}

export interface SearchBarProps {
  onSearch: (query: string) => void
  onClear?: () => void
  initialValue?: string
  placeholder?: string
  className?: string
}

export interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export interface SearchResultsProps {
  query: string
  results: Post[]
  isSearching: boolean
}
