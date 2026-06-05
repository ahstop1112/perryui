import React, { useRef, useState } from 'react'
import {
  Button,
  Popper,
  Paper,
  MenuList,
  MenuItem as MuiMenuItem,
  ClickAwayListener,
  Grow,
} from '@mui/material'
import styles from './MenuItem.module.css'

export interface MenuSubItem {
  key: string
  label: string
  onClick?: () => void
  href?: string
}

export interface MenuItemDef {
  key: string
  label: string
  type: 'LINK' | 'GROUP'
  icon?: React.ReactNode
  onClick?: () => void
  href?: string
  subMenus?: MenuSubItem[]
}

export interface MenuItemProps {
  menuItem: MenuItemDef
}

export function MenuItem({ menuItem }: MenuItemProps) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen((prev) => !prev)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }
    setOpen(false)
  }

  const handleLinkClick = () => {
    if (menuItem.onClick) {
      menuItem.onClick()
    } else if (menuItem.href) {
      window.location.href = menuItem.href
    }
  }

  if (menuItem.type === 'LINK') {
    return (
      <div className={styles.root}>
        <Button onClick={handleLinkClick} startIcon={menuItem.icon}>
          {menuItem.label}
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <Button
        ref={anchorRef}
        onClick={handleToggle}
        startIcon={menuItem.icon}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {menuItem.label}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        style={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open}>
                  {menuItem.subMenus?.map((subItem) => (
                    <MuiMenuItem
                      key={subItem.key}
                      onClick={(e) => {
                        handleClose(e)
                        if (subItem.onClick) {
                          subItem.onClick()
                        } else if (subItem.href) {
                          window.location.href = subItem.href
                        }
                      }}
                    >
                      {subItem.label}
                    </MuiMenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
