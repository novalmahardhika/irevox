import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Ellipsis } from 'lucide-react'
import { User } from '@/lib/type'
import { URL } from '@/lib/url'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/use-auth'
import { AdminFormUpdateUser } from './admin-form-update-user'

export function AdminRowAction({ user }: { user: User }) {
  const { token } = useAuth()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Delete Fail')
      }

      const data = await response.json()

      return data.data
    },
    onSuccess: () => {
      toast.success('Deleted user successfully')

      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (err) => {
      toast.success(err.message)
    },
  })

  const deleteHandler = () => {
    mutation.mutate(user.id)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className='w-8 h-8 p-1' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='text-white bg-transparent border-gray-800 hover:border-gray-800 backdrop-blur-md'>
        <AdminFormUpdateUser user={user} />
        <DropdownMenuItem onClick={deleteHandler}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
