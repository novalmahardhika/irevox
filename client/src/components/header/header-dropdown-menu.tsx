import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CircleUser } from 'lucide-react'

export function HeaderDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CircleUser className='h-8 w-8' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='font-medium'>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
