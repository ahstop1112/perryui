import React from 'react'
import { Grid } from '@mui/material'
import styles from './DynamicForm.module.css'

export interface SectionHeaderProps {
  title?: string
}

export function SectionHeader({ title }: SectionHeaderProps) {
  if (!title) return null
  return (
    <Grid container item xs={12} className={styles.sectionHeaderContainer}>
      <h5 className={styles.sectionTitle}>{title}</h5>
    </Grid>
  )
}
