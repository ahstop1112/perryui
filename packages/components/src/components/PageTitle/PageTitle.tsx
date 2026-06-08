import React from 'react'
import { Typography } from '@mui/material'
import styles from './PageTitle.module.scss'

export interface PageTitleProps {
  title: string
  subtitle?: string
}

const PageTitle = ({ title, subtitle }: PageTitleProps) => {
  return (
    <div className={styles.root}>
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          {subtitle}
        </Typography>
      )}
    </div>
  )
}

export default PageTitle
