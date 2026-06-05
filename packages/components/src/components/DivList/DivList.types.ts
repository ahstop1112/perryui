import React from 'react'

export interface DivColumn {
  key: string
  label: string
  flex?: string
  sortable?: boolean
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode
}

export interface DivListPaginationProps {
  page: number
  rowsPerPage: number
  totalCount: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
}
