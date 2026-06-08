import React from 'react'
import { TableBody } from '@mui/material'
import CheckboxListRow from './CheckboxListRow'
import styles from './CheckboxList.module.scss'
import type { ColumnMap, RowData } from './types'

export interface CheckboxListBodyProps {
  rows: RowData[]
  columns: ColumnMap
  selectedIds: (string | number)[]
  onToggle: (id: string | number) => void
  onAction?: (action: string, row: RowData) => void
  formatDate?: (val: unknown) => string
  renderCell?: (col: string, value: unknown, row: RowData) => React.ReactNode
}

const CheckboxListBody = ({
  rows,
  columns,
  selectedIds,
  onToggle,
  onAction,
  formatDate,
  renderCell,
}: CheckboxListBodyProps) => {
  return (
    <TableBody className={styles.tableBody}>
      {rows.map((row, i) => {
        const id = row.id as string | number
        return (
          <CheckboxListRow
            key={`row_${String(id)}_${i}`}
            row={row}
            columns={columns}
            isSelected={selectedIds.includes(id)}
            onToggle={onToggle}
            onAction={onAction}
            formatDate={formatDate}
            renderCell={renderCell}
          />
        )
      })}
    </TableBody>
  )
}

export default CheckboxListBody
