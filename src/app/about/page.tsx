'use client'

import { motion } from 'framer-motion'
import { Shield, Users, Trophy, Target } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          CloverPit 소개
        </h1>

        <div className="glass-card mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">클랜 개요</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            CloverPit은 한국 PUBG 커뮤니티의 열정적인 플레이어들로 구성된 클랜입니다.
            실력 향상과 팀워크를 중시하며, 함께 성장하는 것을 목표로 합니다.
          </p>
          <p className="text-gray-600 leading-relaxed">
            우리는 단순히 게임을 즐기는 것을 넘어, 전략적인 플레이와 커뮤니케이션을 통해
            최고의 팀 플레이를 추구합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="glass-card"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">우리의 가치</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• 팀워크와 소통</li>
              <li>• 상호 존중</li>
              <li>• 지속적인 성장</li>
              <li>• 페어 플레이</li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="glass-card"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">활동 내용</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• 정기 스쿼드 훈련</li>
              <li>• 클랜 대항전 참여</li>
              <li>• 전략 연구 및 공유</li>
              <li>• 커뮤니티 이벤트</li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="glass-card"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">가입 조건</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• 만 18세 이상</li>
              <li>• 디스코드 필수</li>
              <li>• 주 3회 이상 활동 가능</li>
              <li>• 긍정적인 마인드</li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="glass-card"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">목표</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• 클랜 랭킹 상위권 진입</li>
              <li>• 대회 참가 및 입상</li>
              <li>• 건강한 커뮤니티 형성</li>
              <li>• 신규 멤버 육성</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass-card text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-800">함께 하고 싶으신가요?</h3>
          <p className="text-gray-600 mb-6">
            우리와 함께 성장하고 싶다면 지금 바로 가입 신청해주세요!
          </p>
          <a href="/apply">
            <button className="gradient-button">
              가입 신청하기
            </button>
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}
