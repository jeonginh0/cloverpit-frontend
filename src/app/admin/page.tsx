'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { Trash2, UserPlus, RefreshCw, LogOut } from 'lucide-react'

export default function AdminPage() {
  const { isAuthenticated, logout } = useAuthStore()
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [newPlayer, setNewPlayer] = useState({ pubgName: '', discordName: '' })
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: (data: typeof loginData) => api.adminLogin(data.username, data.password),
    onSuccess: (data) => {
      useAuthStore.getState().login(data.token)
    },
  })

  const { data: applications } = useQuery({
    queryKey: ['applications'],
    queryFn: () => api.getApplications(),
    enabled: isAuthenticated,
  })

  const { data: players } = useQuery({
    queryKey: ['admin-players'],
    queryFn: () => api.getRankings('score', 'desc'),
    enabled: isAuthenticated,
  })

  const addPlayerMutation = useMutation({
    mutationFn: (data: typeof newPlayer) => api.addPlayer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-players'] })
      setNewPlayer({ pubgName: '', discordName: '' })
    },
  })

  const deletePlayerMutation = useMutation({
    mutationFn: (id: string) => api.deletePlayer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-players'] })
    },
  })

  const deleteApplicationMutation = useMutation({
    mutationFn: (id: string) => api.deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
  })

  const refreshStatsMutation = useMutation({
    mutationFn: () => api.refreshStats(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-players'] })
    },
  })

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">관리자 로그인</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              loginMutation.mutate(loginData)
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">아이디</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">비밀번호</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
              />
            </div>
            <button type="submit" className="w-full gradient-button">
              로그인
            </button>
            {loginMutation.isError && (
              <p className="text-red-500 text-sm text-center">로그인 실패</p>
            )}
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            관리자 대시보드
          </h1>
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            <LogOut size={18} />
            <span>로그아웃</span>
          </button>
        </div>

        {/* Add Player */}
        <div className="glass-card mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">클랜원 추가</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              addPlayerMutation.mutate(newPlayer)
            }}
            className="flex gap-4"
          >
            <input
              type="text"
              placeholder="PUBG 닉네임"
              value={newPlayer.pubgName}
              onChange={(e) => setNewPlayer({ ...newPlayer, pubgName: e.target.value })}
              className="flex-1 px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:border-purple-500 outline-none"
            />
            <input
              type="text"
              placeholder="Discord 닉네임"
              value={newPlayer.discordName}
              onChange={(e) => setNewPlayer({ ...newPlayer, discordName: e.target.value })}
              className="flex-1 px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:border-purple-500 outline-none"
            />
            <button type="submit" className="gradient-button flex items-center space-x-2">
              <UserPlus size={18} />
              <span>추가</span>
            </button>
          </form>
        </div>

        {/* Refresh Stats */}
        <div className="glass-card mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">전적 갱신</h2>
              <p className="text-gray-600 text-sm">PUBG API에서 최신 전적을 가져옵니다</p>
            </div>
            <button
              onClick={() => refreshStatsMutation.mutate()}
              disabled={refreshStatsMutation.isPending}
              className="gradient-button flex items-center space-x-2 disabled:opacity-50"
            >
              <RefreshCw size={18} className={refreshStatsMutation.isPending ? 'animate-spin' : ''} />
              <span>{refreshStatsMutation.isPending ? '갱신 중...' : '전적 갱신'}</span>
            </button>
          </div>
        </div>

        {/* Player Management */}
        <div className="glass-card mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">클랜원 관리</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600">PUBG 닉네임</th>
                  <th className="text-left py-3 px-4 text-gray-600">Discord</th>
                  <th className="text-center py-3 px-4 text-gray-600">K/D</th>
                  <th className="text-center py-3 px-4 text-gray-600">점수</th>
                  <th className="text-center py-3 px-4 text-gray-600">작업</th>
                </tr>
              </thead>
              <tbody>
                {players?.map((player) => (
                  <tr key={player.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-semibold text-gray-700">{player.pubgName}</td>
                    <td className="py-3 px-4 text-gray-600">{player.discordName}</td>
                    <td className="text-center py-3 px-4 text-gray-700">{player.stats.kd.toFixed(2)}</td>
                    <td className="text-center py-3 px-4 font-bold text-purple-600">
                      {player.score.toFixed(1)}
                    </td>
                    <td className="text-center py-3 px-4">
                      <button
                        onClick={() => deletePlayerMutation.mutate(player.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Applications */}
        <div className="glass-card">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">가입 신청 목록</h2>
          {applications && applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((app: any) => (
                <div key={app.id} className="p-4 bg-white/20 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{app.pubgName}</h3>
                      <p className="text-sm text-gray-600">{app.discordName}</p>
                      <p className="text-sm text-gray-600 mt-2">{app.introduction}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">
                        {new Date(app.createdAt).toLocaleDateString('ko-KR')}
                      </span>
                      <button
                        onClick={() => deleteApplicationMutation.mutate(app.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">새로운 신청이 없습니다.</p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
