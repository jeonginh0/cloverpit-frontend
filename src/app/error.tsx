'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">오류가 발생했습니다</h2>
        <p className="text-gray-600 mb-6">
          {error.message || '예기치 않은 오류가 발생했습니다.'}
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="gradient-button">
            다시 시도
          </button>
          <Link href="/">
            <button className="bg-white/20 backdrop-blur-lg hover:bg-white/30 text-purple-900 font-semibold py-3 px-6 rounded-xl border border-white/40 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              홈으로 돌아가기
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
