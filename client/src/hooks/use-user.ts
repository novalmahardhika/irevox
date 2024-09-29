import { useQuery } from '@tanstack/react-query'
import { useAuth } from './use-auth'
import { URL } from '@/lib/url'

export function useUser() {
  const { token } = useAuth()

  const fetchUser = async () => {
    const response = await fetch(`${URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data.data
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUser,
    enabled: !!token,
  })

  return { data, error, isLoading }
}
