import React, { useState } from 'react'
import { Table, TableBody, Collapse, Box, IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { DivListSubHeader } from './DivListSubHeader'
import { DivListSubRow } from './DivListSubRow'
import styles from './DivList.module.css'
import type { ColumnMap, RowData } from './types'

export interface DivListRowProps {
  row: RowData
  columns: ColumnMap
  subColumns?: ColumnMap
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

export function DivListRow({
  row,
  columns,
  subColumns,
  onAction,
  formatDate = defaultFormatDate,
  renderCell,
}: DivListRowProps) {
  const [open, setOpen] = useState(false)
  const details = Array.isArray(row.details) ? (row.details as RowData[]) : null
  const hasDetails = details && details.length > 0

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
    if (col.includes('Date') || col.includes('Datetime') || columns[col]?.type === 'date') {
      return formatDate(value)
    }
    if (typeof value === 'number' && !col.toLowerCase().includes('id')) {
      return formatNumber(value)
    }
    return value !== undefined ? String(value) : null
  }

  return (
    <>
      <div className={styles.listRow} role="row">
        {hasDetails && (
          <div className={styles.expandCell}>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </div>
        )}
        {Object.keys(columns)
          .filter(col => col !== 'details')
          .map(col => (
            <div
              key={col}
              role="cell"
              className={`${styles.rowCell} ${columns[col].className ?? ''}`}
            >
              {renderDefault(col)}
            </div>
          ))}
      </div>
      {hasDetails && subColumns && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box className={styles.subTableContainer}>
            <Table size="small">
              <DivListSubHeader columns={subColumns} />
              <TableBody>
                {details.map((subRow, i) => (
                  <DivListSubRow key={i} subRow={subRow} columns={subColumns} />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      )}
    </>
  )
}
