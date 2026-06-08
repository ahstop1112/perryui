import React, { useState } from 'react'
import { Grid, Table, CircularProgress } from '@mui/material'
import CheckboxListHeader from './CheckboxListHeader'
import CheckboxListBody from './CheckboxListBody'
import CheckboxListFooter from './CheckboxListFooter'
import styles from './CheckboxList.module.scss'
import type { ColumnMap, RowData } from './types'

export interface CheckboxListProps {
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
  onSelectionChange?: (ids: (string | number)[]) => void
  selectedIds?: (string | number)[]
  title?: string
  showFooter?: boolean
  rowsPerPageOptions?: number[]
  emptyMessage?: string
  className?: string
  formatDate?: (val: unknown) => string
  renderCell?: (col: string, value: unknown, row: RowData) => React.ReactNode
}

const CheckboxList = ({
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
  onSelectionChange,
  selectedIds: controlledIds,
  title,
  showFooter = false,
  rowsPerPageOptions,
  emptyMessage = 'No results found',
  className = '',
  formatDate,
  renderCell,
}: CheckboxListProps) => {
  const isControlled = controlledIds !== undefined
  const [internalIds, setInternalIds] = useState<(string | number)[]>([])
  const selectedIds = isControlled ? controlledIds : internalIds

  const setSelectedIds = (ids: (string | number)[]) => {
    if (!isControlled) setInternalIds(ids)
    onSelectionChange?.(ids)
  }

  const handleToggle = (id: string | number) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter(s => s !== id)
      : [...selectedIds, id]
    setSelectedIds(next)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = rows.map(r => r.id as string | number)
      setSelectedIds(allIds)
    } else {
      setSelectedIds([])
    }
  }

  const showFooterBar = showFooter && totalCount > 5 && onPageChange && onRowsPerPageChange
  const hasRows = rows.length > 0

  return (
    <Grid container item className={`${styles.container} ${className}`}>
      {title && (
        <Grid container item xs={12} className={styles.titleBar} alignItems="center">
          <h4 className={styles.title}>{title}</h4>
          {selectedIds.length > 0 && (
            <span className={styles.selectionBadge}>{selectedIds.length} selected</span>
          )}
        </Grid>
      )}
      {isLoading ? (
        <Grid container item xs={12} className={styles.loadingWrapper}>
          <CircularProgress />
        </Grid>
      ) : hasRows ? (
        <Grid container item xs={12}>
          <Grid container item xs={12} className={styles.tableContainer}>
            <Table className={styles.table}>
              <CheckboxListHeader
                columns={columns}
                numSelected={selectedIds.length}
                totalRows={rows.length}
                onSelectAll={handleSelectAll}
                pageSorts={pageSorts}
                sortOrder={sortOrder}
                canSort={canSort}
                onSort={onSort}
              />
              <CheckboxListBody
                rows={rows}
                columns={columns}
                selectedIds={selectedIds}
                onToggle={handleToggle}
                onAction={onAction}
                formatDate={formatDate}
                renderCell={renderCell}
              />
            </Table>
          </Grid>
          {showFooterBar && (
            <CheckboxListFooter
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

export default CheckboxList
