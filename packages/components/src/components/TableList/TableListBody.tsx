import React from 'react'
import { TableBody } from '@mui/material'
import TableListRow from './TableListRow'
import styles from './TableList.module.scss'
import type { ColumnMap, RowData } from './types'

export interface TableListBodyProps {
  rows: RowData[]
  columns: ColumnMap
  onAction?: (action: string, row: RowData) => void
  formatDate?: (val: unknown) => string
  renderCell?: (col: string, value: unknown, row: RowData) => React.ReactNode
}

const TableListBody = ({ rows, columns, onAction, formatDate, renderCell }: TableListBodyProps) => {
  return (
    <TableBody className={styles.tableBody}>
      {rows.map((row, i) => (
        <TableListRow
          key={`row_${String(row.id ?? i)}_${i}`}
          row={row}
          columns={columns}
          onAction={onAction}
          formatDate={formatDate}
          renderCell={renderCell}
        />
      ))}
    </TableBody>
  )
}

export default TableListBody
