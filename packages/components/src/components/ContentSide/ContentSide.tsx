import React from 'react'
import { Box } from '@mui/material'
import styles from './ContentSide.module.css'

export interface ContentSideProps {
  children: React.ReactNode
  className?: string
  width?: string | number
}

export function ContentSide({ children, className, width = 280 }: ContentSideProps) {
  return (
    <Box
      className={`${styles.root} ${className ?? ''}`}
      sx={{
        width,
        flexShrink: 0,
        bgcolor: 'grey.50',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </Box>
  )
}
