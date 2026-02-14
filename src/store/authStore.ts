import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      login: (token: string) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth-token', token)
        }
        set({ isAuthenticated: true, token })
      },
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-token')
        }
        set({ isAuthenticated: false, token: null })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
