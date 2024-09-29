import { useLocation } from 'react-router-dom'
import { NavItem } from './header-nav-item'
import { HeaderDropdownMenu } from './header-dropdown-menu'
import { useAuth } from '@/hooks/use-auth'

export default function Header() {
  const { user } = useAuth()
  const location = useLocation()
  const pathName = location.pathname

  return (
    <header className='h-16 border-b border-gray-800 '>
      <nav className='container flex items-center justify-between h-full'>
        <span className='flex items-center space-x-4 tracking-wide '>
          <NavItem href='/' pathName={pathName}>
            Account
          </NavItem>
          {user?.role.name === 'ADMIN' && (
            <NavItem href='/admin' pathName={pathName}>
              Admin
            </NavItem>
          )}
        </span>

        <span className='flex items-center'>
          <HeaderDropdownMenu />
        </span>
      </nav>
    </header>
  )
}
