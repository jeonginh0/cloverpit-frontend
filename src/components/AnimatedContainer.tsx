'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedContainerProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  delay?: number
}

export default function AnimatedContainer({ 
  children, 
  delay = 0, 
  ...props 
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
