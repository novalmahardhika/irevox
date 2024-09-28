import { User } from '@/lib/type'
import { URL } from '@/lib/url'
import { createContext, useState, useEffect, ReactNode } from 'react'

export type AuthContextType = {
  token: string | null
  login: (newToken: string) => void
  logout: () => void
  user: User | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token') || null
  })

  const login = (newToken: string) => {
    setToken(newToken)
    localStorage.setItem('token', newToken)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
    setUser(null)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return

      try {
        const response = await fetch(`${URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }

        const data = await response.json()
        setUser(data.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
        logout()
      }
    }

    fetchUserData()
  }, [token])

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
