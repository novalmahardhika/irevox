import { useAuth } from '@/hooks/use-auth'
import { Navigate } from 'react-router-dom'

export function NotFound() {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to={'/sign-in'} />
  }

  return <Navigate to={`/${token}`} />
}
