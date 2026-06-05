import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BulkAssign } from './BulkAssign'

describe('BulkAssign', () => {
  describe('rendering', () => {
    it('renders the Bulk Assign button', () => {
      render(<BulkAssign selectedCount={3} onAssign={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Bulk Assign' })).toBeInTheDocument()
    })

    it('renders with custom buttonLabel', () => {
      render(<BulkAssign selectedCount={3} buttonLabel="Assign to Team" onAssign={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Assign to Team' })).toBeInTheDocument()
    })
  })

  describe('disabled state', () => {
    it('disables button when selectedCount is 0', () => {
      render(<BulkAssign selectedCount={0} onAssign={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Bulk Assign' })).toBeDisabled()
    })

    it('enables button when selectedCount >= 1', () => {
      render(<BulkAssign selectedCount={1} onAssign={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Bulk Assign' })).not.toBeDisabled()
    })

    it('disables button when disabled prop is true', () => {
      render(<BulkAssign selectedCount={5} disabled={true} onAssign={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Bulk Assign' })).toBeDisabled()
    })
  })

  describe('confirmation dialog', () => {
    it('does not show dialog initially', () => {
      render(<BulkAssign selectedCount={3} onAssign={vi.fn()} />)
      expect(screen.queryByText('Confirm Bulk Assign')).not.toBeInTheDocument()
    })

    it('opens dialog when button is clicked', () => {
      render(<BulkAssign selectedCount={3} onAssign={vi.fn()} />)
      fireEvent.click(screen.getByRole('button', { name: 'Bulk Assign' }))
      expect(screen.getByText('Confirm Bulk Assign')).toBeInTheDocument()
    })

    it('shows assignee name in dialog content', () => {
      render(<BulkAssign selectedCount={3} assigneeName="Alice" onAssign={vi.fn()} />)
      fireEvent.click(screen.getByRole('button', { name: 'Bulk Assign' }))
      expect(screen.getByText(/Alice/)).toBeInTheDocument()
    })

    it('shows selected count in dialog content', () => {
      render(<BulkAssign selectedCount={5} onAssign={vi.fn()} />)
      fireEvent.click(screen.getByRole('button', { name: 'Bulk Assign' }))
      expect(screen.getByText(/5 selected item/)).toBeInTheDocument()
    })

    it('closes dialog when Cancel is clicked', async () => {
      render(<BulkAssign selectedCount={3} onAssign={vi.fn()} />)
      fireEvent.click(screen.getByRole('button', { name: 'Bulk Assign' }))
      fireEvent.click(screen.getByText('Cancel'))
      await waitFor(() => {
        expect(screen.queryByText('Confirm Bulk Assign')).not.toBeInTheDocument()
      })
    })

    it('calls onAssign and closes dialog when Assign is confirmed', async () => {
      const handleAssign = vi.fn()
      render(<BulkAssign selectedCount={3} onAssign={handleAssign} />)
      fireEvent.click(screen.getByRole('button', { name: 'Bulk Assign' }))
      fireEvent.click(screen.getByText('Assign'))
      expect(handleAssign).toHaveBeenCalledTimes(1)
      await waitFor(() => {
        expect(screen.queryByText('Confirm Bulk Assign')).not.toBeInTheDocument()
      })
    })
  })
})
