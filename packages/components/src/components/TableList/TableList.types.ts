import React from 'react'

export interface TableColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  key: string
  label: string
  className?: string
  sortable?: boolean
  render?: (value: unknown, row: T) => React.ReactNode
}

export interface TableListPaginationProps {
  page: number
  rowsPerPage: number
  totalCount: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
}
