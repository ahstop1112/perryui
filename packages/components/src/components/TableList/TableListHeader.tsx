import React from 'react'
import { TableHead, TableRow, TableCell } from '@mui/material'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import styles from './TableList.module.scss'
import type { ColumnMap } from './types'

export interface TableListHeaderProps {
  columns: ColumnMap
  pageSorts?: string
  sortOrder?: 'asc' | 'desc'
  canSort?: boolean
  onSort?: (col: string) => void
}

const ACTION_COLS = new Set(['view', 'edit', 'add', 'view2', 'edit2', 'review', 'favourite'])

const TableListHeader = ({ columns, pageSorts, sortOrder, canSort = false, onSort }: TableListHeaderProps) => {
  const renderSortIcon = (col: string) => {
    const def = columns[col]
    if (!def.isSort || !pageSorts || ACTION_COLS.has(col)) return null
    if (pageSorts.includes(col) && sortOrder === 'asc') {
      return <span className={styles.sortIcon}><ArrowDropUpIcon fontSize="small" /></span>
    }
    return <span className={styles.sortIcon}><ArrowDropDownIcon fontSize="small" /></span>
  }

  const sortableCols = Object.keys(columns).filter(col => col !== 'sinceCreate')
  const staticCols = Object.keys(columns).filter(col => col === 'sinceCreate')

  return (
    <TableHead className={styles.tableHead}>
      <TableRow>
        {sortableCols.map(col => (
          <TableCell
            key={col}
            className={`${styles.headerCell} ${columns[col].className ?? ''}`}
            onClick={() => !ACTION_COLS.has(col) && onSort?.(col)}
            style={{ cursor: !ACTION_COLS.has(col) && canSort ? 'pointer' : 'default' }}
          >
            <span className={styles.headerLabel}>{columns[col].label}</span>
            {canSort && renderSortIcon(col)}
          </TableCell>
        ))}
        {staticCols.map(col => (
          <TableCell
            key={col}
            className={`${styles.headerCell} ${styles.noSort} ${columns[col].className ?? ''}`}
          >
            <span className={styles.headerLabel}>{columns[col].label}</span>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableListHeader
