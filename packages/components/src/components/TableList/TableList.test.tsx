import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TableList from './TableList'
import type { ColumnMap, RowData } from './types'

const COLUMNS: ColumnMap = {
  name: { label: 'Name', isSort: true },
  price: { label: 'Price', type: 'number' },
  status: { label: 'Status', type: 'status' },
  view: { label: '', type: 'action' },
}

const ROWS: RowData[] = [
  { id: 1, name: 'HSBC', price: 64.5, status: 'ACTIVE' },
  { id: 2, name: 'Tencent', price: 362.2, status: 'PENDING' },
]

describe('TableList', () => {
  it('renders column headers', () => {
    render(<TableList columns={COLUMNS} rows={ROWS} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Price')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
  })

  it('renders row data', () => {
    render(<TableList columns={COLUMNS} rows={ROWS} />)
    expect(screen.getByText('HSBC')).toBeInTheDocument()
    expect(screen.getByText('Tencent')).toBeInTheDocument()
  })

  it('shows loading spinner when isLoading=true', () => {
    render(<TableList columns={COLUMNS} rows={[]} isLoading />)
    expect(document.querySelector('.MuiCircularProgress-root')).toBeInTheDocument()
  })

  it('shows empty message when rows is empty', () => {
    render(<TableList columns={COLUMNS} rows={[]} emptyMessage="Nothing here" />)
    expect(screen.getByText('Nothing here')).toBeInTheDocument()
  })

  it('calls onSort when sortable header is clicked', () => {
    const onSort = vi.fn()
    render(<TableList columns={COLUMNS} rows={ROWS} canSort onSort={onSort} />)
    fireEvent.click(screen.getByText('Name'))
    expect(onSort).toHaveBeenCalledWith('name')
  })

  it('renders title', () => {
    render(<TableList columns={COLUMNS} rows={ROWS} title="Order Book" />)
    expect(screen.getByText('Order Book')).toBeInTheDocument()
  })

  it('calls onAction when action icon is clicked', () => {
    const onAction = vi.fn()
    render(<TableList columns={COLUMNS} rows={ROWS} onAction={onAction} />)
    const icons = document.querySelectorAll('[aria-label="view"]')
    fireEvent.click(icons[0])
    expect(onAction).toHaveBeenCalledWith('view', ROWS[0])
  })
})
