import React from 'react'
import { Grid, Table, CircularProgress } from '@mui/material'
import TableListHeader from './TableListHeader'
import TableListBody from './TableListBody'
import TableListFooter from './TableListFooter'
import styles from './TableList.module.scss'
import type { ColumnMap, RowData } from './types'

export interface TableListProps {
  columns: ColumnMap
  rows: RowData[]
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

const TableList = ({
  columns,
  rows,
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
}: TableListProps) => {
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
          <Grid container item xs={12} className={styles.tableContainer}>
            <Table className={styles.table}>
              <TableListHeader
                columns={columns}
                pageSorts={pageSorts}
                sortOrder={sortOrder}
                canSort={canSort}
                onSort={onSort}
              />
              <TableListBody
                rows={rows}
                columns={columns}
                onAction={onAction}
                formatDate={formatDate}
                renderCell={renderCell}
              />
            </Table>
          </Grid>
          {showFooterBar && (
            <TableListFooter
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

export default TableList
