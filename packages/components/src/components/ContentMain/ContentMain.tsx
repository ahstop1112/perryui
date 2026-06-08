import React from 'react'
import { Box } from '@mui/material'
import styles from './ContentMain.module.scss'

export interface ContentMainProps {
  children: React.ReactNode
  maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const MAX_WIDTH_VALUES: Record<string, string> = {
  xs: '444px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
}

const ContentMain = ({ children, maxWidth = false, className }: ContentMainProps) => {
  const maxWidthValue = maxWidth ? MAX_WIDTH_VALUES[maxWidth] : '100%'

  return (
    <Box
      className={`${styles.root} ${className ?? ''}`}
      sx={{
        width: '100%',
        maxWidth: maxWidthValue,
        margin: maxWidth ? '0 auto' : undefined,
      }}
    >
      {children}
    </Box>
  )
}

export default ContentMain
