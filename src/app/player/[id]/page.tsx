'use client'

import { motion } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useParams } from 'next/navigation'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Trophy, Crosshair, Activity, TrendingUp, RefreshCw } from 'lucide-react'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { useState } from 'react'

export default function PlayerDetailPage() {
  const params = useParams()
  const playerId = params.id as string
  const [showAllMatches, setShowAllMatches] = useState(false)
  const queryClient = useQueryClient()

  const { data: player, isLoading } = useQuery({
    queryKey: ['player', playerId],
    queryFn: () => api.getPlayerDetail(playerId),
  })

  const refreshMutation = useMutation({
    mutationFn: () => api.refreshPlayerStats(playerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['player', playerId] })
      queryClient.invalidateQueries({ queryKey: ['player-matches', playerId] })
      alert('전적이 갱신되었습니다!')
    },
    onError: (error: any) => {
      alert('전적 갱신에 실패했습니다: ' + (error.response?.data?.message || error.message))
    },
  })

  const { data: matches, isLoading: matchesLoading } = useQuery({
    queryKey: ['player-matches', playerId],
    queryFn: () => api.getPlayerMatches(playerId),
  })

  // 그래프 데이터 준비 (최근 10개를 시간순으로 표시)
  const chartData = matches?.slice(0, 10).reverse().map((match, index) => ({
    name: `게임 ${index + 1}`,
    kills: match.kills,
    damage: match.damage,
    placement: 100 - match.placement,
  })) || []

  // 표시할 매치 목록 (처음 10개 또는 전체)
  const displayedMatches = showAllMatches ? matches : matches?.slice(0, 10)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <LoadingSkeleton className="h-96" />
      </div>
    )
  }

  if (!player) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-500 text-xl">플레이어를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Player Header */}
        <div className="glass-card mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {player.pubgName}
              </h1>
              <p className="text-gray-500">{player.discordName}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => refreshMutation.mutate()}
                disabled={refreshMutation.isPending}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${refreshMutation.isPending ? 'animate-spin' : ''}`} />
                {refreshMutation.isPending ? '갱신 중...' : '전적 갱신'}
              </button>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">종합 점수</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                  {player.score.toFixed(1)}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-white/20 rounded-lg">
              <Crosshair className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-gray-800">{player.stats.kd.toFixed(2)}</div>
              <div className="text-sm text-gray-600">전체 K/D</div>
            </div>
            <div className="text-center p-4 bg-white/20 rounded-lg">
              <Activity className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-gray-800">{player.stats.averageDamage.toFixed(0)}</div>
              <div className="text-sm text-gray-600">평균 데미지</div>
            </div>
            <div className="text-center p-4 bg-white/20 rounded-lg">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold text-gray-800">{player.stats.totalMatches}</div>
              <div className="text-sm text-gray-600">총 플레이</div>
            </div>
            <div className="text-center p-4 bg-white/20 rounded-lg">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-gray-800">{player.stats.kills}</div>
              <div className="text-sm text-gray-600">총 킬</div>
            </div>
          </div>

          {/* 경쟁전/일반전 통계 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-200">
              <h3 className="text-sm font-semibold text-red-700 mb-3">🏆 경쟁전</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">매치 수</span>
                  <span className="font-bold text-gray-800">{player.stats.rankedMatches}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">K/D</span>
                  <span className="font-bold text-gray-800">{player.stats.rankedKd.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">평균 데미지</span>
                  <span className="font-bold text-gray-800">{player.stats.rankedAvgDamage.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">승리</span>
                  <span className="font-bold text-gray-800">{player.stats.rankedWins}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-700 mb-3">🎮 일반전</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">매치 수</span>
                  <span className="font-bold text-gray-800">{player.stats.normalMatches}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">K/D</span>
                  <span className="font-bold text-gray-800">{player.stats.normalKd.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">평균 데미지</span>
                  <span className="font-bold text-gray-800">{player.stats.normalAvgDamage.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">승리</span>
                  <span className="font-bold text-gray-800">{player.stats.normalWins}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 모드별 플레이 수 */}
          <div className="mt-4 flex justify-center space-x-4">
            <div className="px-4 py-2 bg-white/30 rounded-lg">
              <span className="text-xs text-gray-600">Solo:</span>
              <span className="ml-2 font-bold text-gray-800">{player.stats.soloMatches}</span>
            </div>
            <div className="px-4 py-2 bg-white/30 rounded-lg">
              <span className="text-xs text-gray-600">Duo:</span>
              <span className="ml-2 font-bold text-gray-800">{player.stats.duoMatches}</span>
            </div>
            <div className="px-4 py-2 bg-white/30 rounded-lg">
              <span className="text-xs text-gray-600">Squad:</span>
              <span className="ml-2 font-bold text-gray-800">{player.stats.squadMatches}</span>
            </div>
          </div>
        </div>

        {/* 주요 무기 Top3 */}
        {player.stats.weaponStats && Object.keys(player.stats.weaponStats).length > 0 && (
          <div className="glass-card mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">🎯 주요 무기 Top3</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(player.stats.weaponStats)
                .sort(([, a], [, b]) => b.kills - a.kills)
                .slice(0, 3)
                .map(([weapon, stats], index) => (
                  <motion.div
                    key={weapon}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-2 ${
                      index === 0 
                        ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-yellow-400' 
                        : index === 1
                        ? 'bg-gradient-to-r from-gray-300/20 to-gray-400/20 border-gray-400'
                        : 'bg-gradient-to-r from-orange-300/20 to-orange-400/20 border-orange-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </span>
                      <span className="text-xs font-bold text-gray-500">
                        #{index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">{weapon}</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">킬 수</span>
                        <span className="font-bold text-gray-800">{stats.kills}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">사용 횟수</span>
                        <span className="font-bold text-gray-800">{stats.uses}회</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">평균 킬/게임</span>
                        <span className="font-bold text-gray-800">
                          {stats.uses > 0 ? (stats.kills / stats.uses).toFixed(1) : '0.0'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* Performance Chart */}
        <div className="glass-card mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">최근 전적 그래프</h2>
          {matchesLoading ? (
            <LoadingSkeleton className="h-64" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Line type="monotone" dataKey="kills" stroke="#a855f7" strokeWidth={2} name="킬" />
                <Line type="monotone" dataKey="damage" stroke="#3b82f6" strokeWidth={2} name="데미지" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Match History */}
        <div className="glass-card">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">상세 전적</h2>
          {matchesLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <LoadingSkeleton key={i} className="h-20" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">날짜</th>
                    <th className="text-center py-3 px-4 text-gray-600 font-semibold">타입</th>
                    <th className="text-center py-3 px-4 text-gray-600 font-semibold">모드</th>
                    <th className="text-center py-3 px-4 text-gray-600 font-semibold">순위</th>
                    <th className="text-center py-3 px-4 text-gray-600 font-semibold">킬</th>
                    <th className="text-center py-3 px-4 text-gray-600 font-semibold">데미지</th>
                    <th className="text-center py-3 px-4 text-gray-600 font-semibold">생존 시간</th>
                    <th className="text-center py-3 px-4 text-gray-600 font-semibold">참가자</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedMatches?.map((match) => (
                    <motion.tr
                      key={match.id}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      className="border-b border-gray-100"
                    >
                      <td className="py-3 px-4 text-gray-700">
                        {new Date(match.createdAt).toLocaleString('ko-KR', { 
                          month: '2-digit', 
                          day: '2-digit', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          match.matchType === 'ranked' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {match.matchType === 'ranked' ? '경쟁전' : '일반전'}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          match.gameMode === 'solo' 
                            ? 'bg-purple-100 text-purple-700' 
                            : match.gameMode === 'duo'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {match.gameMode === 'solo' ? 'Solo' : match.gameMode === 'duo' ? 'Duo' : 'Squad'}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className={`font-bold ${match.placement <= 10 ? 'text-yellow-600' : 'text-gray-600'}`}>
                          #{match.placement}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">
                        {match.kills}
                      </td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-700">
                        {match.damage.toFixed(0)}
                      </td>
                      <td className="text-center py-3 px-4 text-gray-600">
                        {match.timeSurvived ? `${(match.timeSurvived / 60).toFixed(0)}분` : '-'}
                      </td>
                      <td className="text-center py-3 px-4">
                        {match.participants && match.participants.length > 0 ? (
                          <div className="flex flex-wrap gap-1 justify-center max-w-xs">
                            {match.participants.slice(0, 5).map((participant, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded"
                                title={participant}
                              >
                                {participant.length > 8 ? participant.substring(0, 8) + '...' : participant}
                              </span>
                            ))}
                            {match.participants.length > 5 && (
                              <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded font-bold">
                                +{match.participants.length - 5}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {/* 더보기 버튼 */}
              {matches && matches.length > 10 && (
                <div className="mt-6 text-center">
                  <motion.button
                    onClick={() => setShowAllMatches(!showAllMatches)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    {showAllMatches ? '접기' : `매치 정보 더보기 (${matches.length - 10}개 더 있음)`}
                  </motion.button>
                </div>
              )}
            </div>
          )}

          {!matchesLoading && (!matches || matches.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500">아직 전적이 없습니다.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
