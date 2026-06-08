import React from 'react'
import DivListRow from './DivListRow'
import styles from './DivList.module.scss'
import type { ColumnMap, RowData } from './types'

export interface DivListBodyProps {
  rows: RowData[]
  columns: ColumnMap
  subColumns?: ColumnMap
  onAction?: (action: string, row: RowData) => void
  formatDate?: (val: unknown) => string
  renderCell?: (col: string, value: unknown, row: RowData) => React.ReactNode
}

const DivListBody = ({ rows, columns, subColumns, onAction, formatDate, renderCell }: DivListBodyProps) => {
  return (
    <div className={styles.listBody} role="rowgroup">
      {rows.map((row, i) => (
        <DivListRow
          key={`row_${String(row.id ?? i)}_${i}`}
          row={row}
          columns={columns}
          subColumns={subColumns}
          onAction={onAction}
          formatDate={formatDate}
          renderCell={renderCell}
        />
      ))}
    </div>
  )
}

export default DivListBody
