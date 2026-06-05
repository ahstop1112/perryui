import React from 'react'
import { TableRow, TableCell } from '@mui/material'
import styles from './TableList.module.css'
import type { ColumnMap, RowData } from './types'

export interface TableListSubRowProps {
  subRow: RowData
  columns: ColumnMap
}

const formatNumber = (val: number): string =>
  val.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function TableListSubRow({ subRow, columns }: TableListSubRowProps) {
  return (
    <TableRow className={styles.subRow}>
      {Object.keys(subRow)
        .filter(col => Object.keys(columns).includes(col))
        .map(col => (
          <TableCell
            key={col}
            className={`${styles.subRowCell} ${columns[col]?.className ?? ''}`}
          >
            {typeof subRow[col] === 'number'
              ? formatNumber(subRow[col] as number)
              : String(subRow[col] ?? '')}
          </TableCell>
        ))}
    </TableRow>
  )
}
