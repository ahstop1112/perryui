import React from 'react'
import { Box, Typography } from '@mui/material'
import MenuItem from '../MenuItem/MenuItem'
import type { MenuItemDef } from '../MenuItem'
import styles from './MenuHorizontal.module.scss'

export interface MenuHorizontalProps {
  items: MenuItemDef[]
  separator?: string
}

const MenuHorizontal = ({ items, separator = ' | ' }: MenuHorizontalProps) => {
  return (
    <Box className={styles.root} display="flex" alignItems="center" flexWrap="wrap">
      {items.map((item, index) => (
        <React.Fragment key={item.key}>
          <MenuItem menuItem={item} />
          {index < items.length - 1 && (
            <Typography
              component="span"
              variant="body2"
              sx={{ color: 'text.secondary', userSelect: 'none' }}
              aria-hidden="true"
            >
              {separator}
            </Typography>
          )}
        </React.Fragment>
      ))}
    </Box>
  )
}

export default MenuHorizontal
