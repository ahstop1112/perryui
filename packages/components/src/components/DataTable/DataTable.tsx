import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from '@mui/material'
import { ReactNode } from 'react'
import styles from './DataTable.module.scss'

export interface DataTableColumn {
  key: string
  label: string
  className?: string
  type?: 'text' | 'number' | 'date' | 'datetime' | 'boolean'
  format?: (value: unknown, row: Record<string, unknown>) => ReactNode
}

export interface DataTableProps {
  columns: DataTableColumn[]
  rows: Record<string, unknown>[]
  emptyMessage?: string
}

function formatCellValue(
  value: unknown,
  column: DataTableColumn,
  row: Record<string, unknown>
): ReactNode {
  if (column.format) {
    return column.format(value, row)
  }
  if (value === null || value === undefined || value === '') {
    return '—'
  }
  switch (column.type) {
    case 'boolean':
      return value ? 'Yes' : 'No'
    case 'date':
      return value instanceof Date
        ? value.toLocaleDateString()
        : new Date(String(value)).toLocaleDateString()
    case 'datetime':
      return value instanceof Date
        ? value.toLocaleString()
        : new Date(String(value)).toLocaleString()
    case 'number':
      return typeof value === 'number' ? value.toLocaleString() : String(value)
    default:
      return String(value)
  }
}

const DataTable = ({ columns, rows, emptyMessage = 'No data available.' }: DataTableProps) => {
  return (
    <TableContainer component={Paper} className={styles.container}>
      <Table aria-label="data table">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.key} className={styles.headerCell}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                align="center"
                className={styles.emptyCell}
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} hover>
                {columns.map((col) => (
                  <TableCell key={col.key} className={col.className}>
                    {formatCellValue(row[col.key], col, row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DataTable
