import { AuthContext, AuthContextType } from '@/context/auth-context'
import { useContext } from 'react'

export function useAuth(): AuthContextType {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  const { user, login, logout, token } = authContext

  return { user, login, logout, token }
}
