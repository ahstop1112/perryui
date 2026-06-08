import React from 'react'
import { List } from '@mui/material'
import MenuListItem from '../MenuListItem/MenuListItem'
import type { SideNavItem } from '../MenuListItem'
import styles from './MenuVertical.module.scss'

export interface MenuVerticalProps {
  items: SideNavItem[]
}

const MenuVertical = ({ items }: MenuVerticalProps) => {
  return (
    <List className={styles.root} disablePadding>
      {items.map((item) => (
        <MenuListItem key={item.key} menuItem={item} />
      ))}
    </List>
  )
}

export default MenuVertical
