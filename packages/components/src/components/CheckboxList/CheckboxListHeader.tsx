import React from 'react'
import { TableHead, TableRow, TableCell, Checkbox } from '@mui/material'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import styles from './CheckboxList.module.scss'
import type { ColumnMap } from './types'

export interface CheckboxListHeaderProps {
  columns: ColumnMap
  numSelected: number
  totalRows: number
  onSelectAll: (checked: boolean) => void
  pageSorts?: string
  sortOrder?: 'asc' | 'desc'
  canSort?: boolean
  onSort?: (col: string) => void
}

const ACTION_COLS = new Set(['view', 'edit', 'add', 'review', 'sinceCreate'])

const CheckboxListHeader = ({
  columns,
  numSelected,
  totalRows,
  onSelectAll,
  pageSorts,
  sortOrder,
  canSort = false,
  onSort,
}: CheckboxListHeaderProps) => {
  const renderSortIcon = (col: string) => {
    const def = columns[col]
    if (!def.isSort || !pageSorts || ACTION_COLS.has(col)) return null
    if (pageSorts.includes(col) && sortOrder === 'asc') {
      return <span className={styles.sortIcon}><ArrowDropUpIcon fontSize="small" /></span>
    }
    return <span className={styles.sortIcon}><ArrowDropDownIcon fontSize="small" /></span>
  }

  return (
    <TableHead className={styles.tableHead}>
      <TableRow>
        <TableCell className={styles.checkboxCell} padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < totalRows}
            checked={totalRows > 0 && numSelected === totalRows}
            onChange={e => onSelectAll(e.target.checked)}
            inputProps={{ 'aria-label': 'select all rows' }}
          />
        </TableCell>
        {Object.keys(columns)
          .filter(col => col !== 'sinceCreate')
          .map(col => (
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
        {Object.keys(columns).filter(col => col === 'sinceCreate').map(col => (
          <TableCell key={col} className={`${styles.headerCell} ${columns[col].className ?? ''}`}>
            <span className={styles.headerLabel}>{columns[col].label}</span>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default CheckboxListHeader
