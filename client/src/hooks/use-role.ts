import { useQuery } from '@tanstack/react-query'
import { useAuth } from './use-auth'
import { URL } from '@/lib/url'

export function useRole() {
  const { token } = useAuth()

  const fetchUser = async () => {
    const response = await fetch(`${URL}/roles`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data.data
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: fetchUser,
    enabled: !!token,
  })

  return { data, error, isLoading }
}
