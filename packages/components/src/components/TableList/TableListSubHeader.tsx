import React from 'react'
import { TableHead, TableRow, TableCell } from '@mui/material'
import styles from './TableList.module.css'
import type { ColumnMap } from './types'

export interface TableListSubHeaderProps {
  columns: ColumnMap
  className?: string
}

export function TableListSubHeader({ columns, className = '' }: TableListSubHeaderProps) {
  return (
    <TableHead className={`${styles.subTableHead} ${className}`}>
      <TableRow>
        {Object.keys(columns).map(col => (
          <TableCell
            key={col}
            className={`${styles.subHeaderCell} ${columns[col].className ?? ''}`}
          >
            {columns[col].label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
