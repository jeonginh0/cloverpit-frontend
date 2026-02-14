'use client'

import { motion } from 'framer-motion'
import { Trophy, TrendingUp, Users, Target } from 'lucide-react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import RankCard from '@/components/RankCard'
import StatsCard from '@/components/StatsCard'
import RecentMatchCard from '@/components/RecentMatchCard'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import type { Player, Match, ClanStats } from '@/types'

export default function HomePage() {
  const { data: stats, isLoading: statsLoading } = useQuery<ClanStats>({
    queryKey: ['clan-stats'],
    queryFn: () => api.getClanStats(),
  })

  const { data: topPlayers, isLoading: rankingLoading } = useQuery<Player[]>({
    queryKey: ['top-rankings'],
    queryFn: () => api.getRankings('score', 'desc'),
  })

  // Top 5만 표시
  const top5Players = topPlayers?.slice(0, 5)

  const { data: recentMatches, isLoading: matchesLoading } = useQuery<Match[]>({
    queryKey: ['recent-matches'],
    queryFn: () => api.getRecentMatches(3),
  })

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          CloverPit
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          PUBG 클랜 전용 전적 관리 시스템
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/apply">
            <button className="gradient-button">
              가입 신청
            </button>
          </Link>
          <Link href="/ranking">
            <button className="bg-white/20 backdrop-blur-lg hover:bg-white/30 text-purple-900 font-semibold py-3 px-6 rounded-xl border border-white/40 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              랭킹 보기
            </button>
          </Link>
        </div>
      </motion.section>

      {/* Stats Overview */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">클랜 통계</h2>
        {statsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <LoadingSkeleton key={i} className="h-32" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              icon={<Users className="w-8 h-8" />}
              label="총 클랜원"
              value={stats?.totalMembers || 0}
              color="purple"
            />
            <StatsCard
              icon={<Trophy className="w-8 h-8" />}
              label="평균 K/D"
              value={stats?.avgKD?.toFixed(2) || '0.00'}
              color="blue"
            />
            <StatsCard
              icon={<Target className="w-8 h-8" />}
              label="평균 데미지"
              value={stats?.avgDamage?.toFixed(0) || '0'}
              color="green"
            />
            <StatsCard
              icon={<TrendingUp className="w-8 h-8" />}
              label="총 플레이"
              value={stats?.totalMatches || 0}
              color="orange"
            />
          </div>
        )}
      </motion.section>

      {/* Top 5 Ranking */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-16"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">TOP 5 랭킹</h2>
          <Link href="/ranking">
            <button className="text-purple-600 hover:text-purple-700 font-semibold">
              전체 보기 →
            </button>
          </Link>
        </div>
        {rankingLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <LoadingSkeleton key={i} className="h-48" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {top5Players?.map((player: Player, index: number) => (
              <RankCard key={player.id} player={player} rank={index + 1} />
            ))}
          </div>
        )}
      </motion.section>

      {/* Recent Matches */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">최근 전적</h2>
        {matchesLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <LoadingSkeleton key={i} className="h-24" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {recentMatches?.map((match) => (
              <RecentMatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </motion.section>
    </div>
  )
}
