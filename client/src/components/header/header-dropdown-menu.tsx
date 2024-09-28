import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/use-auth'
import { CircleUser } from 'lucide-react'

export function HeaderDropdownMenu() {
  const { logout } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CircleUser className='w-8 h-8' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='font-medium' onClick={() => logout()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
