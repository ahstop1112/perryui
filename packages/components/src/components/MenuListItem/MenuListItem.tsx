import React, { useState } from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItemButton,
} from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styles from './MenuListItem.module.scss'

export interface SideNavSubItem {
  key: string
  label: string
  icon?: React.ReactNode
  href?: string
  onClick?: () => void
  active?: boolean
}

export interface SideNavItem {
  key: string
  label: string
  type: 'GROUP' | 'LINK'
  icon?: React.ReactNode
  href?: string
  onClick?: () => void
  active?: boolean
  subMenus?: SideNavSubItem[]
}

export interface MenuListItemProps {
  menuItem: SideNavItem
  defaultExpanded?: boolean
}

const MenuListItem = ({ menuItem, defaultExpanded = false }: MenuListItemProps) => {
  const [open, setOpen] = useState(defaultExpanded)

  const handleToggle = () => {
    setOpen((prev) => !prev)
  }

  if (menuItem.type === 'LINK') {
    return (
      <ListItem disablePadding className={styles.item}>
        <ListItemButton
          component="a"
          href={menuItem.href}
          onClick={menuItem.onClick}
          selected={menuItem.active}
          sx={menuItem.active ? { bgcolor: 'action.selected' } : undefined}
        >
          {menuItem.icon && <ListItemIcon>{menuItem.icon}</ListItemIcon>}
          <ListItemText primary={menuItem.label} />
        </ListItemButton>
      </ListItem>
    )
  }

  return (
    <>
      <ListItem disablePadding className={styles.item}>
        <ListItemButton onClick={handleToggle} aria-expanded={open}>
          {menuItem.icon && <ListItemIcon>{menuItem.icon}</ListItemIcon>}
          <ListItemText primary={menuItem.label} />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {menuItem.subMenus?.map((subItem) => (
            <ListItem key={subItem.key} disablePadding className={styles.item}>
              <ListItemButton
                component="a"
                href={subItem.href}
                onClick={subItem.onClick}
                selected={subItem.active}
                className={`${styles.subItem} ${subItem.active ? styles.activeItem : ''}`}
                sx={subItem.active ? { bgcolor: 'action.selected' } : undefined}
              >
                {subItem.icon && (
                  <ListItemIcon sx={{ minWidth: 36 }}>{subItem.icon}</ListItemIcon>
                )}
                <ListItemText primary={subItem.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  )
}

export default MenuListItem
