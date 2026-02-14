'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { CheckCircle2 } from 'lucide-react'

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    pubgName: '',
    discordName: '',
    age: '',
    introduction: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const applyMutation = useMutation({
    mutationFn: (data: typeof formData) => api.submitApplication(data),
    onSuccess: () => {
      setIsSubmitted(true)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    applyMutation.mutate(formData)
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">신청이 완료되었습니다!</h2>
          <p className="text-gray-600 mb-6">
            관리자가 검토 후 디스코드로 연락드리겠습니다.
          </p>
          <a href="/">
            <button className="gradient-button">
              홈으로 돌아가기
            </button>
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          가입 신청
        </h1>

        <form onSubmit={handleSubmit} className="glass-card">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                PUBG 닉네임 *
              </label>
              <input
                type="text"
                required
                value={formData.pubgName}
                onChange={(e) => setFormData({ ...formData, pubgName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder="PUBG 닉네임을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Discord 닉네임 *
              </label>
              <input
                type="text"
                required
                value={formData.discordName}
                onChange={(e) => setFormData({ ...formData, discordName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder="Discord#1234"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                나이 *
              </label>
              <input
                type="number"
                required
                min="18"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder="만 18세 이상"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                자기소개 *
              </label>
              <textarea
                required
                value={formData.introduction}
                onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none resize-none"
                placeholder="간단한 자기소개와 가입 동기를 작성해주세요"
              />
            </div>

            <button
              type="submit"
              disabled={applyMutation.isPending}
              className="w-full gradient-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {applyMutation.isPending ? '제출 중...' : '신청하기'}
            </button>

            {applyMutation.isError && (
              <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                신청 중 오류가 발생했습니다. 다시 시도해주세요.
              </div>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  )
}
