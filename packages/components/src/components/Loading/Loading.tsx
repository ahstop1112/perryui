import React from 'react'
import { CircularProgress, Box } from '@mui/material'
import styles from './Loading.module.css'

export interface LoadingProps {
  /** Diameter of the spinner in px */
  size?: number
  /** Colour token */
  color?: 'primary' | 'secondary' | 'inherit'
  /** Fills the full viewport height when true */
  fullPage?: boolean
}

export function Loading({ size = 40, color = 'primary', fullPage = false }: LoadingProps) {
  return (
    <Box
      className={fullPage ? styles.fullPage : styles.container}
      role="status"
      aria-label="Loading"
    >
      <CircularProgress size={size} color={color} />
    </Box>
  )
}
