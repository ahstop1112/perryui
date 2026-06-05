import React from 'react'
import { Button } from '@mui/material'
import styles from './BackButton.module.css'

export interface BackButtonProps {
  onClick: () => void
  label?: string
}

export function BackButton({ onClick, label = 'Back' }: BackButtonProps) {
  return (
    <Button
      variant="text"
      onClick={onClick}
      className={styles.root}
      sx={{ color: 'text.secondary' }}
      startIcon={<span aria-hidden="true">←</span>}
    >
      {label}
    </Button>
  )
}
