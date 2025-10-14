/**
 * Card Component
 *
 * Reusable card wrapper component.
 *
 * Reason: Pure UI component for consistent card styling
 */

import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'base' | 'lg'
  hoverable?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'base',
  hoverable = false,
}) => {
  const hoverClass = hoverable ? 'card--hoverable' : ''

  return (
    <div className={`card card--padding-${padding} ${hoverClass} ${className}`}>
      {children}
    </div>
  )
}
