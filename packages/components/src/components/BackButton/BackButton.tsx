import React from 'react'
import { Button } from '@mui/material'
import styles from './BackButton.module.scss'

export interface BackButtonProps {
  onClick: () => void
  label?: string
}

const BackButton = ({ onClick, label = 'Back' }: BackButtonProps) => {
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

export default BackButton
