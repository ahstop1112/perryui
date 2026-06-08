import React from 'react'
import { TableRow, TableCell } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import styles from './TableList.module.scss'
import type { ColumnMap, RowData } from './types'

export interface TableListRowProps {
  row: RowData
  columns: ColumnMap
  onAction?: (action: string, row: RowData) => void
  formatDate?: (val: unknown) => string
  renderCell?: (col: string, value: unknown, row: RowData) => React.ReactNode
}

const ACTION_COLS = new Set(['view', 'edit', 'add', 'view2', 'edit2', 'review'])

const defaultFormatDate = (val: unknown): string => {
  if (!val) return ''
  const d = new Date(val as string)
  return isNaN(d.getTime()) ? String(val) : d.toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })
}

const formatNumber = (val: number): string =>
  val.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

const TableListRow = ({
  row,
  columns,
  onAction,
  formatDate = defaultFormatDate,
  renderCell,
}: TableListRowProps) => {
  const renderDefault = (col: string): React.ReactNode => {
    const value = row[col]
    const colDef = columns[col]

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

    if (isRecord(value)) {
      return (
        <div className={styles.nestedObject}>
          {Object.keys(value).length > 0 ? (
            Object.entries(value).map(([k, v]) => (
              <div key={k} className={styles.nestedObjectRow}>
                {`${k}: ${String(v)}`}
              </div>
            ))
          ) : '/'}
        </div>
      )
    }

    if (
      colDef?.type === 'status' ||
      col.toLowerCase().includes('status')
    ) {
      return (
        <div className={`${styles.statusCell} ${String(value)}`}>
          <div className={styles.statusDot} />
          {String(value ?? '')}
        </div>
      )
    }

    if (
      colDef?.type === 'date' ||
      col.includes('Date') ||
      col.includes('Datetime') ||
      col.includes('datetime')
    ) {
      return <div className={styles.dateCell}>{formatDate(value)}</div>
    }

    if (
      typeof value === 'number' &&
      !col.toLowerCase().includes('id')
    ) {
      return formatNumber(value)
    }

    if (value !== undefined && colDef?.link) {
      return (
        <div
          className={styles.linkCell}
          role="link"
          tabIndex={0}
          onClick={() => onAction?.('link', { ...row, _link: `${colDef.link}${row.id ?? ''}` })}
          onKeyDown={(e) => e.key === 'Enter' && onAction?.('link', { ...row, _link: `${colDef.link}${row.id ?? ''}` })}
        >
          {String(value)}
        </div>
      )
    }

    return value !== undefined ? String(value) : null
  }

  return (
    <TableRow className={styles.tableRow}>
      {Object.keys(columns)
        .filter(col => col !== 'details' && col !== 'content')
        .map(col => (
          <TableCell key={col} className={`${styles.tableCell} ${columns[col].className ?? ''}`}>
            {renderDefault(col)}
          </TableCell>
        ))}
    </TableRow>
  )
}

export default TableListRow
