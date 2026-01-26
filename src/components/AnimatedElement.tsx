'use client'

import { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'motion/react'

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

// Main AnimatedElement component using Motion library
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

  // Define animation based on variant
  const getAnimation = () => {
    const baseAnimation = { opacity: 1 }
    
    switch (animationVariant) {
      case 'slideUp':
        return { ...baseAnimation, y: 0 }
      case 'slideIn':
        return { ...baseAnimation, x: 0 }
      case 'scale':
        return { ...baseAnimation, scale: 1 }
      default:
        return baseAnimation
    }
  }

  const getInitial = () => {
    const baseInitial = { opacity: 0 }
    
    switch (animationVariant) {
      case 'slideUp':
        return { ...baseInitial, y: 50 }
      case 'slideIn':
        return { ...baseInitial, x: 50 }
      case 'scale':
        return { ...baseInitial, scale: 0.8 }
      default:
        return baseInitial
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitial()}
      animate={inView ? getAnimation() : getInitial()}
      transition={{
        duration,
        delay,
        ease: animationVariant === 'bounce' ? 'backOut' : 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
} 