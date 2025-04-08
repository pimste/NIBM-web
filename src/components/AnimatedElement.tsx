'use client'

import { ReactNode, useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'

// Define types
type AnimationVariant = 'fadeIn' | 'slideUp' | 'slideIn' | 'scale' | 'bounce'

interface AnimatedElementProps {
  children: ReactNode
  className?: string
  animationVariant?: AnimationVariant
  delay?: number
  duration?: number
  threshold?: number
}

// Static component for when motion is loading or unavailable
function StaticElement({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

// Main AnimatedElement component
export function AnimatedElement({
  children,
  className = '',
  animationVariant = 'fadeIn',
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
}: AnimatedElementProps) {
  // Use ref to detect when element is in viewport
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  })

  // Track if motion component is loaded
  const [MotionDiv, setMotionDiv] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Dynamically import the motion component
    import('framer-motion').then((mod) => {
      setMotionDiv(mod.motion.div)
      setIsLoaded(true)
    }).catch((err) => {
      console.error('Failed to load framer-motion:', err)
    })
  }, [])

  // Return static version if motion isn't loaded yet
  if (!isLoaded || !MotionDiv) {
    return <StaticElement className={className}>{children}</StaticElement>
  }

  // Animation variants
  const variants = {
    hidden: {
      opacity: 0,
      y: animationVariant === 'slideUp' ? 50 : 0,
      x: animationVariant === 'slideIn' ? 50 : 0,
      scale: animationVariant === 'scale' ? 0.8 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: animationVariant === 'bounce' ? 'backOut' : 'easeOut',
      },
    },
  }

  // Render the motion component
  return (
    <MotionDiv
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </MotionDiv>
  )
} 