import React from 'react'
import { List } from '@mui/material'
import { MenuListItem } from '../MenuListItem'
import type { SideNavItem } from '../MenuListItem'
import styles from './MenuVertical.module.css'

export interface MenuVerticalProps {
  items: SideNavItem[]
}

export function MenuVertical({ items }: MenuVerticalProps) {
  return (
    <List className={styles.root} disablePadding>
      {items.map((item) => (
        <MenuListItem key={item.key} menuItem={item} />
      ))}
    </List>
  )
}
