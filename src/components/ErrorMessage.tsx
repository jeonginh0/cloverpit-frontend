'use client'

import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card text-center max-w-md mx-auto"
    >
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
          <XCircle className="w-10 h-10 text-white" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">오류 발생</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="gradient-button">
          다시 시도
        </button>
      )}
    </motion.div>
  )
}
