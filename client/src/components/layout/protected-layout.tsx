import { Navigate, Outlet } from 'react-router-dom'
import Header from '../header/header'
import { useAuth } from '@/hooks/use-auth'

export default function ProtectedLayout() {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to='/sign-in' />
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
