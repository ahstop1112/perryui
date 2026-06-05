import React from 'react'
import { Pagination as MuiPagination, Box, Typography } from '@mui/material'
import styles from './Pagination.module.css'

export interface PaginationProps {
  /** Total number of rows/items */
  totalCount: number
  /** Number of items per page */
  pageSize?: number
  /** Current 1-based page number */
  page: number
  /** Called with the new 1-based page number */
  onChange: (page: number) => void
  /** Show first-page button */
  showFirstButton?: boolean
  /** Show last-page button */
  showLastButton?: boolean
}

export function Pagination({
  totalCount,
  pageSize = 10,
  page,
  onChange,
  showFirstButton = true,
  showLastButton = true,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize)
  if (totalPages <= 1) return null

  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalCount)

  return (
    <Box
      className={styles.container}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}
    >
      <Typography variant="body2" color="text.secondary" className={styles.info}>
        {start}–{end} of {totalCount}
      </Typography>
      <MuiPagination
        count={totalPages}
        page={page}
        onChange={(_, newPage) => onChange(newPage)}
        showFirstButton={showFirstButton}
        showLastButton={showLastButton}
        color="primary"
        shape="rounded"
      />
    </Box>
  )
}
