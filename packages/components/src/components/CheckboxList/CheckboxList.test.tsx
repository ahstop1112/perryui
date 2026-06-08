import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CheckboxList from './CheckboxList'
import type { ColumnMap, RowData } from './types'

const COLUMNS: ColumnMap = {
  name: { label: 'Name', isSort: true },
  amount: { label: 'Amount', type: 'number' },
}

const ROWS: RowData[] = [
  { id: 1, name: 'Alpha', amount: 1000 },
  { id: 2, name: 'Beta', amount: 2000 },
  { id: 3, name: 'Gamma', amount: 3000 },
]

describe('CheckboxList', () => {
  it('renders column headers', () => {
    render(<CheckboxList columns={COLUMNS} rows={ROWS} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Amount')).toBeInTheDocument()
  })

  it('renders row data', () => {
    render(<CheckboxList columns={COLUMNS} rows={ROWS} />)
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
  })

  it('shows loading spinner', () => {
    render(<CheckboxList columns={COLUMNS} rows={[]} isLoading />)
    expect(document.querySelector('.MuiCircularProgress-root')).toBeInTheDocument()
  })

  it('shows empty message', () => {
    render(<CheckboxList columns={COLUMNS} rows={[]} emptyMessage="Empty!" />)
    expect(screen.getByText('Empty!')).toBeInTheDocument()
  })

  it('calls onSelectionChange when row checkbox clicked', () => {
    const onSelectionChange = vi.fn()
    render(
      <CheckboxList
        columns={COLUMNS}
        rows={ROWS}
        selectedIds={[]}
        onSelectionChange={onSelectionChange}
      />
    )
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[1]) // first data row
    expect(onSelectionChange).toHaveBeenCalledWith([1])
  })

  it('selects all when select-all checkbox is clicked', () => {
    const onSelectionChange = vi.fn()
    render(
      <CheckboxList
        columns={COLUMNS}
        rows={ROWS}
        selectedIds={[]}
        onSelectionChange={onSelectionChange}
      />
    )
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0]) // select-all
    expect(onSelectionChange).toHaveBeenCalledWith([1, 2, 3])
  })

  it('shows selection badge when items are selected', () => {
    render(
      <CheckboxList
        columns={COLUMNS}
        rows={ROWS}
        selectedIds={[1, 2]}
        title="Test"
        onSelectionChange={vi.fn()}
      />
    )
    expect(screen.getByText('2 selected')).toBeInTheDocument()
  })
})
