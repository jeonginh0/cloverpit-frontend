import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 토큰 인터셉터
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export const api = {
  // 클랜 통계
  getClanStats: async () => {
    const { data } = await axiosInstance.get('/stats/clan')
    return data
  },

  // 랭킹
  getTopRankings: async (limit: number) => {
    const { data } = await axiosInstance.get(`/players/rankings?limit=${limit}`)
    return data
  },

  getRankings: async (sortBy: string, sortOrder: string) => {
    const { data } = await axiosInstance.get(
      `/players/rankings?sortBy=${sortBy}&sortOrder=${sortOrder}`
    )
    return data
  },

  // 플레이어 상세
  getPlayerDetail: async (id: string) => {
    const { data } = await axiosInstance.get(`/players/${id}`)
    return data
  },

  getPlayerMatches: async (id: string) => {
    const { data } = await axiosInstance.get(`/players/${id}/matches`)
    return data
  },

  // 최근 전적
  getRecentMatches: async (limit: number) => {
    const { data } = await axiosInstance.get(`/matches/recent?limit=${limit}`)
    return data
  },

  // 가입 신청
  submitApplication: async (applicationData: any) => {
    const { data } = await axiosInstance.post('/applications', applicationData)
    return data
  },

  // 관리자 - 로그인
  adminLogin: async (username: string, password: string) => {
    const { data } = await axiosInstance.post('/auth/login', { username, password })
    return data
  },

  // 관리자 - 신청 목록
  getApplications: async () => {
    const { data } = await axiosInstance.get('/applications')
    return data
  },

  // 관리자 - 신청 삭제
  deleteApplication: async (id: string) => {
    const { data } = await axiosInstance.delete(`/applications/${id}`)
    return data
  },

  // 관리자 - 클랜원 추가
  addPlayer: async (playerData: any) => {
    const { data } = await axiosInstance.post('/players', playerData)
    return data
  },

  // 관리자 - 클랜원 삭제
  deletePlayer: async (id: string) => {
    const { data } = await axiosInstance.delete(`/players/${id}`)
    return data
  },

  // 관리자 - 전적 갱신
  refreshStats: async () => {
    const { data } = await axiosInstance.post('/stats/refresh')
    return data
  },

  // 관리자 - 개별 플레이어 전적 갱신
  refreshPlayerStats: async (playerId: string) => {
    const { data } = await axiosInstance.post(`/stats/refresh/${playerId}`)
    return data
  },
}
