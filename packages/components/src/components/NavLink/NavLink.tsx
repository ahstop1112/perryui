import React from 'react'
import styles from './NavLink.module.scss'

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  activeClassName?: string
  children?: React.ReactNode
  className?: string
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, activeClassName, children, className, ...rest }, ref) => {
    const isActive =
      typeof window !== 'undefined' && window.location.pathname === href

    const combinedClassName = [
      styles.link,
      className,
      isActive && activeClassName ? activeClassName : '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <a ref={ref} href={href} className={combinedClassName} {...rest}>
        {children}
      </a>
    )
  }
)

NavLink.displayName = 'NavLink'

export default NavLink
