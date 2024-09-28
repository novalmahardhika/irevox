import { useLocation } from 'react-router-dom'
import { NavItem } from './header-nav-item'
import { HeaderDropdownMenu } from './header-dropdown-menu'

export default function Header() {
  const location = useLocation()
  const pathName = location.pathname

  return (
    <header className='h-16 border-b border-gray-800 '>
      <nav className='h-full container flex justify-between items-center'>
        <span className='flex items-center space-x-4 tracking-wide '>
          <NavItem href='/' pathName={pathName}>
            Account
          </NavItem>
          <NavItem href='/admin' pathName={pathName}>
            Admin
          </NavItem>
        </span>

        <span className='flex items-center'>
          <HeaderDropdownMenu />
        </span>
      </nav>
    </header>
  )
}
