export interface ListColumn {
  label: string
  className?: string
  isSort?: boolean
  type?: 'text' | 'number' | 'date' | 'status' | 'action'
  link?: string
}

export type ColumnMap = Record<string, ListColumn>
export type RowData = Record<string, unknown>
