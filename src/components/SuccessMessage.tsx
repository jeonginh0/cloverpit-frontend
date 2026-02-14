'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface SuccessMessageProps {
  message: string
  onClose?: () => void
}

export default function SuccessMessage({ message, onClose }: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed top-4 right-4 z-50 glass-card max-w-sm"
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-6 h-6 text-white" />
        </div>
        <p className="text-gray-800 font-semibold flex-1">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </motion.div>
  )
}
