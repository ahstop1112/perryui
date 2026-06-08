import React from 'react'
import { TableHead, TableRow, TableCell } from '@mui/material'
import styles from './DivList.module.scss'
import type { ColumnMap } from './types'

export interface DivListSubHeaderProps {
  columns: ColumnMap
  className?: string
}

const DivListSubHeader = ({ columns, className = '' }: DivListSubHeaderProps) => {
  return (
    <TableHead className={`${styles.subTableHead} ${className}`}>
      <TableRow>
        {Object.keys(columns).map(col => (
          <TableCell key={col} className={`${styles.subHeaderCell} ${columns[col].className ?? ''}`}>
            {columns[col].label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default DivListSubHeader
