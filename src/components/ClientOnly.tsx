'use client'

import { useEffect, useState, Fragment } from 'react'

export default function ClientOnly({ children, fallback = null }: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [hasMounted, setHasMounted] = useState(false)
  
  useEffect(() => {
    // Set hasMounted to true after component mounts on client
    setHasMounted(true)
  }, [])
  
  // Use Fragment to avoid adding extra DOM nodes
  // If not mounted, either show fallback or nothing
  if (!hasMounted) {
    return <Fragment>{fallback ?? null}</Fragment>
  }
  
  // After client-side hydration completes, render the children
  return <Fragment>{children}</Fragment>
} 