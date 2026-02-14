'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { ArrowUpDown } from 'lucide-react'
import RankCard from '@/components/RankCard'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import type { Player } from '@/types'

type SortKey = 'score' | 'kd' | 'averageDamage' | 'totalMatches'

export default function RankingPage() {
  const [sortBy, setSortBy] = useState<SortKey>('score')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const { data: players, isLoading } = useQuery<Player[]>({
    queryKey: ['rankings', sortBy, sortOrder],
    queryFn: () => api.getRankings(sortBy, sortOrder),
  })

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(key)
      setSortOrder('desc')
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          클랜원 랭킹
        </h1>

        {/* Sort Buttons */}
        <div className="glass-card mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => handleSort('score')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                sortBy === 'score'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/20 text-gray-700 hover:bg-white/30'
              }`}
            >
              <span>종합 점수</span>
              {sortBy === 'score' && <ArrowUpDown size={16} />}
            </button>
            <button
              onClick={() => handleSort('totalMatches')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                sortBy === 'totalMatches'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/20 text-gray-700 hover:bg-white/30'
              }`}
            >
              <span>플레이 수</span>
              {sortBy === 'totalMatches' && <ArrowUpDown size={16} />}
            </button>
            <button
              onClick={() => handleSort('kd')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                sortBy === 'kd'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/20 text-gray-700 hover:bg-white/30'
              }`}
            >
              <span>K/D</span>
              {sortBy === 'kd' && <ArrowUpDown size={16} />}
            </button>
            <button
              onClick={() => handleSort('averageDamage')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                sortBy === 'averageDamage'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/20 text-gray-700 hover:bg-white/30'
              }`}
            >
              <span>평균 데미지</span>
              {sortBy === 'averageDamage' && <ArrowUpDown size={16} />}
            </button>
          </div>
        </div>

        {/* Rankings Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <LoadingSkeleton key={i} className="h-64" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players?.map((player: Player, index: number) => (
              <RankCard key={player.id} player={player} rank={index + 1} />
            ))}
          </div>
        )}

        {!isLoading && (!players || players.length === 0) && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">등록된 클랜원이 없습니다.</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
