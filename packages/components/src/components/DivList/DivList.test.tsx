import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DivList from './DivList'
import type { ColumnMap, RowData } from './types'

const COLUMNS: ColumnMap = {
  name: { label: 'Name', isSort: true },
  nav: { label: 'NAV', type: 'number' },
  view: { label: '', type: 'action' },
}

const ROWS: RowData[] = [
  { id: 1, name: 'Fund A', nav: 100.5 },
  { id: 2, name: 'Fund B', nav: 200.0 },
]

describe('DivList', () => {
  it('renders column headers', () => {
    render(<DivList columns={COLUMNS} rows={ROWS} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('NAV')).toBeInTheDocument()
  })

  it('renders row data', () => {
    render(<DivList columns={COLUMNS} rows={ROWS} />)
    expect(screen.getByText('Fund A')).toBeInTheDocument()
    expect(screen.getByText('Fund B')).toBeInTheDocument()
  })

  it('shows loading spinner', () => {
    render(<DivList columns={COLUMNS} rows={[]} isLoading />)
    expect(document.querySelector('.MuiCircularProgress-root')).toBeInTheDocument()
  })

  it('shows empty message', () => {
    render(<DivList columns={COLUMNS} rows={[]} emptyMessage="No data" />)
    expect(screen.getByText('No data')).toBeInTheDocument()
  })

  it('calls onSort when header clicked', () => {
    const onSort = vi.fn()
    render(<DivList columns={COLUMNS} rows={ROWS} canSort onSort={onSort} />)
    fireEvent.click(screen.getByText('Name'))
    expect(onSort).toHaveBeenCalledWith('name')
  })

  it('shows expand button for rows with details', () => {
    const rowsWithDetails: RowData[] = [
      { id: 1, name: 'Fund A', nav: 100.5, details: [{ priorNAV: 98 }] },
    ]
    const subColumns: ColumnMap = { priorNAV: { label: 'Prior NAV', type: 'number' } }
    render(<DivList columns={COLUMNS} rows={rowsWithDetails} subColumns={subColumns} />)
    expect(screen.getByLabelText('expand row')).toBeInTheDocument()
  })
})
