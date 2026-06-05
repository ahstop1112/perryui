import React from 'react'
import { Box } from '@mui/material'
import styles from './TabPanel.module.css'

export interface TabPanelProps {
  children?: React.ReactNode
  /** Currently selected tab index */
  value: number
  /** This panel's index */
  index: number
  /** Prefix for aria ids — must match the associated Tab component's id prefix */
  idPrefix?: string
}

export function TabPanel({ children, value, index, idPrefix = 'tab' }: TabPanelProps) {
  const isVisible = value === index

  return (
    <div
      role="tabpanel"
      hidden={!isVisible}
      id={`${idPrefix}panel-${index}`}
      aria-labelledby={`${idPrefix}-${index}`}
      className={styles.panel}
    >
      {isVisible && (
        <Box sx={{ pt: 1.5 }} className={styles.content}>
          {children}
        </Box>
      )}
    </div>
  )
}
