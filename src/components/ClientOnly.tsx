'use client'

import { useEffect, useState } from 'react'

export default function ClientOnly({ children, fallback = null }: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [hasMounted, setHasMounted] = useState(false)
  
  useEffect(() => {
    // Set hasMounted to true after component mounts on client
    setHasMounted(true)
  }, [])
  
  // Return fallback if not mounted
  if (!hasMounted) {
    return <>{fallback}</>
  }
  
  // After hydration, render the children
  return <>{children}</>
} 