import React from 'react'
import { Tooltip, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import styles from './TooltipAddButton.module.scss'

export interface TooltipAddButtonProps {
  title: string
  onClick: () => void
  disabled?: boolean
}

const TooltipAddButton = ({ title, onClick, disabled = false }: TooltipAddButtonProps) => {
  return (
    <span className={styles.root}>
      <Tooltip title={title}>
        <span>
          <Fab
            color="primary"
            onClick={onClick}
            disabled={disabled}
            aria-label={title}
            size="medium"
          >
            <AddIcon />
          </Fab>
        </span>
      </Tooltip>
    </span>
  )
}

export default TooltipAddButton
