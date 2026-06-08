import React from 'react'
import { Grid, TablePagination } from '@mui/material'
import styles from './DivList.module.scss'

export interface DivListFooterProps {
  totalCount: number
  pageIndex: number
  pageSize: number
  rowsPerPageOptions?: number[]
  onPageChange: (page: number) => void
  onRowsPerPageChange: (size: number) => void
}

const DivListFooter = ({
  totalCount,
  pageIndex,
  pageSize,
  rowsPerPageOptions = [20, 50, 100],
  onPageChange,
  onRowsPerPageChange,
}: DivListFooterProps) => {
  return (
    <Grid container item xs={12} className={styles.footer} justifyContent="space-between" alignItems="center">
      <span className={styles.footerCount}>Total: {totalCount.toLocaleString('en')}</span>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalCount}
        rowsPerPage={pageSize}
        page={pageIndex}
        onPageChange={(_e, page) => onPageChange(page)}
        onRowsPerPageChange={e => onRowsPerPageChange(Number(e.target.value))}
        SelectProps={{ inputProps: { 'aria-label': 'Rows per page' }, native: true }}
        className={styles.pagination}
      />
    </Grid>
  )
}

export default DivListFooter
