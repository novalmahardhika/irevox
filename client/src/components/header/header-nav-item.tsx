import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type NavItemProps = {
  pathName: string
  href: string
  children: ReactNode
}

export function NavItem({ children, href, pathName }: NavItemProps) {
  return (
    <Link
      to={href}
      className={`${
        pathName === href ? 'text-white' : 'opacity-50 duration-300'
      } `}
    >
      {children}
    </Link>
  )
}
