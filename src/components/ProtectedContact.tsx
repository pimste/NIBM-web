'use client'

import { useState, ReactNode } from 'react'
import { FaPhone, FaEnvelope } from 'react-icons/fa'

type ContactType = 'email' | 'phone'

interface ProtectedContactProps {
  type?: ContactType
  value?: string
  displayValue?: string
  className?: string
  linkClassName?: string
  iconClassName?: string
  children?: ReactNode
}

export function ProtectedContact({
  type,
  value,
  displayValue,
  className = 'inline-flex items-center',
  linkClassName = 'hover:text-primary transition-colors',
  iconClassName = 'mr-2',
  children
}: ProtectedContactProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  
  // If children are provided, render them directly
  if (children) {
    return <div className={className}>{children}</div>
  }
  
  // Ensure value is provided when type is specified
  if (!value) {
    console.error('ProtectedContact: value prop is required when type is specified')
    return null
  }
  
  // Obfuscate the contact information
  const obfuscatedValue = type === 'email' 
    ? value.replace(/(.{2})(.*)(@.*)/, '$1***$3')
    : value.replace(/(.{3})(.*)(.{3})/, '$1 *** $3')
  
  // Display value to show (if not provided, use the obfuscated value)
  const displayText = displayValue || obfuscatedValue
  
  // Determine icon to use
  const Icon = type === 'email' ? FaEnvelope : FaPhone
  
  // Handle reveal click
  const handleReveal = (e: React.MouseEvent) => {
    if (!isRevealed) {
      e.preventDefault()
      setIsRevealed(true)
    }
  }
  
  return (
    <div className={className}>
      <Icon className={iconClassName} aria-hidden="true" />
      {isRevealed ? (
        <a 
          href={type === 'email' ? `mailto:${value}` : `tel:${value}`}
          className={linkClassName}
          aria-label={type === 'email' ? 'Email us' : 'Call us'}
        >
          {value}
        </a>
      ) : (
        <button
          onClick={handleReveal}
          className={linkClassName}
          aria-label={type === 'email' ? 'Reveal email address' : 'Reveal phone number'}
        >
          {displayText}
        </button>
      )}
    </div>
  )
} 