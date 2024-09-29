import { useQuery } from '@tanstack/react-query'
import { useAuth } from './use-auth'
import { URL } from '@/lib/url'
import { UserDetail } from '@/lib/type'

export function useUserDetail(id: string): {
  data: UserDetail
  error: unknown
  isLoading: boolean
} {
  const { token } = useAuth()

  const fetchUser = async () => {
    const response = await fetch(`${URL}/users/${id}`, {
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
    queryKey: ['user-detail'],
    queryFn: fetchUser,
    enabled: !!token,
  })

  return { data, error, isLoading }
}
