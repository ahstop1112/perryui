import type { TableColumn } from '../TableList/TableList.types'

export type CheckboxColumn = TableColumn

export interface CheckboxListProps {
  columns: CheckboxColumn[]
  rows: Record<string, unknown>[]
  selectedIds: (string | number)[]
  onSelectionChange: (selectedIds: (string | number)[]) => void
  idKey?: string
  loading?: boolean
  title?: string
  totalCount?: number
  page?: number
  rowsPerPage?: number
  onPageChange?: (page: number) => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
  onSort?: (key: string, direction: 'asc' | 'desc') => void
  sortColumn?: string
  sortDirection?: 'asc' | 'desc'
  emptyMessage?: string
  showFooter?: boolean
  className?: string
}
