import React from 'react'
import { TableRow, TableCell, Checkbox } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import styles from './CheckboxList.module.css'
import type { ColumnMap, RowData } from './types'

export interface CheckboxListRowProps {
  row: RowData
  columns: ColumnMap
  isSelected: boolean
  onToggle: (id: string | number) => void
  onAction?: (action: string, row: RowData) => void
  formatDate?: (val: unknown) => string
  renderCell?: (col: string, value: unknown, row: RowData) => React.ReactNode
}

const ACTION_COLS = new Set(['view', 'edit', 'add', 'review'])

const defaultFormatDate = (val: unknown): string => {
  if (!val) return ''
  const d = new Date(val as string)
  return isNaN(d.getTime()) ? String(val) : d.toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })
}

const formatNumber = (val: number): string =>
  val.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function CheckboxListRow({
  row,
  columns,
  isSelected,
  onToggle,
  onAction,
  formatDate = defaultFormatDate,
  renderCell,
}: CheckboxListRowProps) {
  const id = row.id as string | number

  const renderDefault = (col: string): React.ReactNode => {
    const value = row[col]
    if (renderCell) {
      const custom = renderCell(col, value, row)
      if (custom !== undefined) return custom
    }
    if (ACTION_COLS.has(col)) {
      return (
        <MoreHorizIcon
          className={styles.actionIcon}
          onClick={() => onAction?.(col, row)}
          aria-label={col}
        />
      )
    }
    if (columns[col]?.type === 'status' || col.toLowerCase().includes('status')) {
      return (
        <div className={`${styles.statusCell} ${String(value)}`}>
          <div className={styles.statusDot} />
          {String(value ?? '')}
        </div>
      )
    }
    if (col.includes('Date') || col.includes('Datetime') || columns[col]?.type === 'date') {
      return <div className={styles.dateCell}>{formatDate(value)}</div>
    }
    if (typeof value === 'number' && !col.toLowerCase().includes('id')) {
      return formatNumber(value)
    }
    if (value !== undefined && columns[col]?.link) {
      return (
        <div
          className={styles.linkCell}
          role="link"
          tabIndex={0}
          onClick={() => onAction?.('link', { ...row, _link: `${columns[col].link}${row.id ?? ''}` })}
          onKeyDown={e => e.key === 'Enter' && onAction?.('link', { ...row, _link: `${columns[col].link}${row.id ?? ''}` })}
        >
          {String(value)}
        </div>
      )
    }
    return value !== undefined ? String(value) : null
  }

  return (
    <TableRow
      className={styles.tableRow}
      aria-checked={isSelected}
      selected={isSelected}
      tabIndex={-1}
    >
      <TableCell className={styles.checkboxCell} padding="checkbox">
        <Checkbox
          checked={isSelected}
          onChange={() => onToggle(id)}
          inputProps={{ 'aria-label': `select row ${String(id)}` }}
        />
      </TableCell>
      {Object.keys(columns).map(col => (
        <TableCell key={col} className={`${styles.tableCell} ${columns[col].className ?? ''}`}>
          {renderDefault(col)}
        </TableCell>
      ))}
    </TableRow>
  )
}
