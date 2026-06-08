import React from 'react'
import { Grid, CircularProgress } from '@mui/material'
import DivListHeader from './DivListHeader'
import DivListBody from './DivListBody'
import DivListFooter from './DivListFooter'
import styles from './DivList.module.scss'
import type { ColumnMap, RowData } from './types'

export interface DivListProps {
  columns: ColumnMap
  rows: RowData[]
  subColumns?: ColumnMap
  isLoading?: boolean
  totalCount?: number
  pageIndex?: number
  pageSize?: number
  pageSorts?: string
  sortOrder?: 'asc' | 'desc'
  canSort?: boolean
  onSort?: (col: string) => void
  onPageChange?: (page: number) => void
  onRowsPerPageChange?: (size: number) => void
  onAction?: (action: string, row: RowData) => void
  title?: string
  showFooter?: boolean
  rowsPerPageOptions?: number[]
  emptyMessage?: string
  className?: string
  formatDate?: (val: unknown) => string
  renderCell?: (col: string, value: unknown, row: RowData) => React.ReactNode
}

const DivList = ({
  columns,
  rows,
  subColumns,
  isLoading = false,
  totalCount = 0,
  pageIndex = 0,
  pageSize = 20,
  pageSorts,
  sortOrder = 'desc',
  canSort = false,
  onSort,
  onPageChange,
  onRowsPerPageChange,
  onAction,
  title,
  showFooter = false,
  rowsPerPageOptions,
  emptyMessage = 'No results found',
  className = '',
  formatDate,
  renderCell,
}: DivListProps) => {
  const showFooterBar = showFooter && totalCount > 5 && onPageChange && onRowsPerPageChange
  const hasRows = rows.length > 0

  return (
    <Grid container item className={`${styles.container} ${className}`}>
      {title && <h4 className={styles.title}>{title}</h4>}
      {isLoading ? (
        <Grid container item xs={12} className={styles.loadingWrapper}>
          <CircularProgress />
        </Grid>
      ) : hasRows ? (
        <Grid container item xs={12}>
          <Grid container item xs={12} className={styles.listContainer}>
            <div className={styles.list} role="table">
              <DivListHeader
                columns={columns}
                pageSorts={pageSorts}
                sortOrder={sortOrder}
                canSort={canSort}
                onSort={onSort}
              />
              <DivListBody
                rows={rows}
                columns={columns}
                subColumns={subColumns}
                onAction={onAction}
                formatDate={formatDate}
                renderCell={renderCell}
              />
            </div>
          </Grid>
          {showFooterBar && (
            <DivListFooter
              totalCount={totalCount}
              pageIndex={pageIndex}
              pageSize={pageSize}
              rowsPerPageOptions={rowsPerPageOptions}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
            />
          )}
        </Grid>
      ) : (
        <Grid container item xs={12} className={styles.emptyWrapper}>
          <span className={styles.emptyMessage}>{emptyMessage}</span>
        </Grid>
      )}
    </Grid>
  )
}

export default DivList
