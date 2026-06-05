import React from 'react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import styles from './DivList.module.css'
import type { ColumnMap } from './types'

export interface DivListHeaderProps {
  columns: ColumnMap
  pageSorts?: string
  sortOrder?: 'asc' | 'desc'
  canSort?: boolean
  onSort?: (col: string) => void
}

const ACTION_COLS = new Set(['view', 'edit', 'add', 'review', 'favourite'])

export function DivListHeader({ columns, pageSorts, sortOrder, canSort = false, onSort }: DivListHeaderProps) {
  const renderSortIcon = (col: string) => {
    const def = columns[col]
    if (!def.isSort || !pageSorts || ACTION_COLS.has(col)) return null
    if (pageSorts.includes(col) && sortOrder === 'asc') {
      return <span className={styles.sortIcon}><ArrowDropUpIcon fontSize="small" /></span>
    }
    return <span className={styles.sortIcon}><ArrowDropDownIcon fontSize="small" /></span>
  }

  return (
    <div className={styles.listHeader} role="row">
      {Object.keys(columns)
        .filter(col => col !== 'details')
        .map(col => (
          <div
            key={col}
            role="columnheader"
            className={`${styles.headerCell} ${columns[col].className ?? ''}`}
            onClick={() => !ACTION_COLS.has(col) && onSort?.(col)}
            style={{ cursor: !ACTION_COLS.has(col) && canSort ? 'pointer' : 'default' }}
          >
            <span>{columns[col].label}</span>
            {canSort && renderSortIcon(col)}
          </div>
        ))}
    </div>
  )
}
