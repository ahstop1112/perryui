import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import DataTable from './DataTable'
import type { DataTableColumn } from './DataTable'

const basicColumns: DataTableColumn[] = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'value', label: 'Value', type: 'number' },
]

describe('DataTable', () => {
  describe('rendering', () => {
    it('renders column headers', () => {
      render(<DataTable columns={basicColumns} rows={[]} />)
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Value')).toBeInTheDocument()
    })

    it('renders rows with data', () => {
      render(
        <DataTable
          columns={basicColumns}
          rows={[{ name: 'Alpha', value: 100 }]}
        />
      )
      expect(screen.getByText('Alpha')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()
    })

    it('renders multiple rows', () => {
      render(
        <DataTable
          columns={basicColumns}
          rows={[
            { name: 'Alpha', value: 100 },
            { name: 'Beta', value: 200 },
          ]}
        />
      )
      expect(screen.getByText('Alpha')).toBeInTheDocument()
      expect(screen.getByText('Beta')).toBeInTheDocument()
    })
  })

  describe('empty state', () => {
    it('shows default empty message when no rows', () => {
      render(<DataTable columns={basicColumns} rows={[]} />)
      expect(screen.getByText('No data available.')).toBeInTheDocument()
    })

    it('shows custom empty message when provided', () => {
      render(
        <DataTable
          columns={basicColumns}
          rows={[]}
          emptyMessage="No records found."
        />
      )
      expect(screen.getByText('No records found.')).toBeInTheDocument()
    })
  })

  describe('cell formatting', () => {
    it('renders boolean true as Yes', () => {
      render(
        <DataTable
          columns={[{ key: 'active', label: 'Active', type: 'boolean' }]}
          rows={[{ active: true }]}
        />
      )
      expect(screen.getByText('Yes')).toBeInTheDocument()
    })

    it('renders boolean false as No', () => {
      render(
        <DataTable
          columns={[{ key: 'active', label: 'Active', type: 'boolean' }]}
          rows={[{ active: false }]}
        />
      )
      expect(screen.getByText('No')).toBeInTheDocument()
    })

    it('renders em dash for null values', () => {
      render(
        <DataTable
          columns={[{ key: 'note', label: 'Note', type: 'text' }]}
          rows={[{ note: null }]}
        />
      )
      expect(screen.getByText('—')).toBeInTheDocument()
    })

    it('renders em dash for undefined values', () => {
      render(
        <DataTable
          columns={[{ key: 'note', label: 'Note', type: 'text' }]}
          rows={[{ note: undefined }]}
        />
      )
      expect(screen.getByText('—')).toBeInTheDocument()
    })

    it('renders em dash for empty string values', () => {
      render(
        <DataTable
          columns={[{ key: 'note', label: 'Note', type: 'text' }]}
          rows={[{ note: '' }]}
        />
      )
      expect(screen.getByText('—')).toBeInTheDocument()
    })

    it('uses custom format function when provided', () => {
      const format = vi.fn().mockReturnValue('Formatted!')
      render(
        <DataTable
          columns={[{ key: 'val', label: 'Val', format }]}
          rows={[{ val: 42 }]}
        />
      )
      expect(screen.getByText('Formatted!')).toBeInTheDocument()
      expect(format).toHaveBeenCalledWith(42, { val: 42 })
    })

    it('formats numbers with toLocaleString', () => {
      render(
        <DataTable
          columns={[{ key: 'qty', label: 'Qty', type: 'number' }]}
          rows={[{ qty: 1000000 }]}
        />
      )
      expect(screen.getByText('1,000,000')).toBeInTheDocument()
    })
  })
})
