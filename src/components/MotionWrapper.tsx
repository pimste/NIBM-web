'use client'

import { motion } from 'motion/react'
import React from 'react'

type MotionDivProps = {
  children: React.ReactNode
  className?: string
  initial?: any
  whileInView?: any
  transition?: any
  viewport?: any
}

export function MotionDiv({
  children,
  className = '',
  initial,
  whileInView,
  transition,
  viewport,
  ...props
}: MotionDivProps) {
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      viewport={viewport}
      {...props}
    >
      {children}
    </motion.div>
  )
} 