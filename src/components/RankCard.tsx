'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Trophy, TrendingUp, Crosshair } from 'lucide-react'
import type { Player } from '@/types'

interface RankCardProps {
  player: Player
  rank: number
}

const rankColors = {
  1: 'from-yellow-400 to-yellow-600',
  2: 'from-gray-300 to-gray-500',
  3: 'from-orange-400 to-orange-600',
}

const rankBorderColors = {
  1: 'border-yellow-400 shadow-yellow-400/50',
  2: 'border-gray-400 shadow-gray-400/50',
  3: 'border-orange-400 shadow-orange-400/50',
}

const rankBgGlow = {
  1: 'bg-yellow-50',
  2: 'bg-gray-50',
  3: 'bg-orange-50',
}

export default function RankCard({ player, rank }: RankCardProps) {
  const isTopThree = rank <= 3
  const gradientClass = isTopThree ? rankColors[rank as keyof typeof rankColors] : 'from-purple-400 to-purple-600'
  const borderClass = isTopThree ? rankBorderColors[rank as keyof typeof rankBorderColors] : ''
  const bgGlowClass = isTopThree ? rankBgGlow[rank as keyof typeof rankBgGlow] : ''

  return (
    <Link href={`/player/${player.id}`}>
      <motion.div
        whileHover={{ scale: 1.03, y: -8 }}
        className={`glass-card cursor-pointer relative overflow-hidden group ${
          isTopThree ? `border-2 ${borderClass} shadow-xl ${bgGlowClass}` : ''
        }`}
      >
        {/* Rank Badge */}
        <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${gradientClass} flex items-center justify-center ${
          isTopThree ? 'shadow-lg' : ''
        }`}
          style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
        >
          <span className="text-white font-bold text-lg absolute top-2 right-2">
            {rank === 1 && '👑'}
            {rank}
          </span>
        </div>

        {/* Player Info */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {player.pubgName}
          </h3>
          <p className="text-sm text-gray-500">{player.discordName}</p>
          <div className="mt-2 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-purple-600" />
            <span className="text-lg font-bold text-purple-600">{player.score.toFixed(1)}</span>
            <span className="text-xs text-gray-500">점수</span>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Crosshair className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-600">K/D</span>
            </div>
            <span className="font-bold text-gray-800">{player.stats.kd.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-600">평균 데미지</span>
            </div>
            <span className="font-bold text-gray-800">{player.stats.averageDamage.toFixed(0)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-600">플레이 수</span>
            </div>
            <span className="font-bold text-gray-800">{player.stats.totalMatches}</span>
          </div>
        </div>

        {/* Score */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-600">종합 점수</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              {player.score.toFixed(1)}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
