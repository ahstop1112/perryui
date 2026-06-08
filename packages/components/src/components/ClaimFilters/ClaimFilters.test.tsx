import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ClaimFilters from './ClaimFilters'

describe('ClaimFilters', () => {
  describe('rendering', () => {
    it('renders both buttons by default', () => {
      render(<ClaimFilters selectedCount={3} onClaim={vi.fn()} onUnclaim={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Bulk Claim' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Bulk Unclaim' })).toBeInTheDocument()
    })

    it('hides claim button when showClaim is false', () => {
      render(<ClaimFilters selectedCount={3} showClaim={false} onUnclaim={vi.fn()} />)
      expect(screen.queryByRole('button', { name: 'Bulk Claim' })).not.toBeInTheDocument()
    })

    it('hides unclaim button when showUnclaim is false', () => {
      render(<ClaimFilters selectedCount={3} showUnclaim={false} onClaim={vi.fn()} />)
      expect(screen.queryByRole('button', { name: 'Bulk Unclaim' })).not.toBeInTheDocument()
    })

    it('renders custom claimLabel', () => {
      render(<ClaimFilters selectedCount={3} claimLabel="Assign to Me" onClaim={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Assign to Me' })).toBeInTheDocument()
    })

    it('renders custom unclaimLabel', () => {
      render(<ClaimFilters selectedCount={3} unclaimLabel="Release" onUnclaim={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Release' })).toBeInTheDocument()
    })
  })

  describe('disabled state', () => {
    it('disables claim button when selectedCount is 0', () => {
      render(<ClaimFilters selectedCount={0} onClaim={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Bulk Claim' })).toBeDisabled()
    })

    it('disables unclaim button when selectedCount is 0', () => {
      render(<ClaimFilters selectedCount={0} onUnclaim={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Bulk Unclaim' })).toBeDisabled()
    })

    it('enables buttons when selectedCount >= 1', () => {
      render(<ClaimFilters selectedCount={1} onClaim={vi.fn()} onUnclaim={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Bulk Claim' })).not.toBeDisabled()
      expect(screen.getByRole('button', { name: 'Bulk Unclaim' })).not.toBeDisabled()
    })
  })

  describe('claim interactions', () => {
    it('calls onClaim immediately when claim button is clicked (no dialog)', () => {
      const handleClaim = vi.fn()
      render(<ClaimFilters selectedCount={3} onClaim={handleClaim} />)
      fireEvent.click(screen.getByRole('button', { name: 'Bulk Claim' }))
      expect(handleClaim).toHaveBeenCalledTimes(1)
    })
  })

  describe('unclaim dialog', () => {
    it('opens confirm dialog when unclaim button is clicked', () => {
      render(<ClaimFilters selectedCount={3} onUnclaim={vi.fn()} />)
      fireEvent.click(screen.getByRole('button', { name: 'Bulk Unclaim' }))
      expect(screen.getByText('Confirm Bulk Unclaim')).toBeInTheDocument()
    })

    it('shows selected count in unclaim dialog', () => {
      render(<ClaimFilters selectedCount={7} onUnclaim={vi.fn()} />)
      fireEvent.click(screen.getByRole('button', { name: 'Bulk Unclaim' }))
      expect(screen.getByText(/7 selected item/)).toBeInTheDocument()
    })

    it('closes dialog when Cancel is clicked', async () => {
      render(<ClaimFilters selectedCount={3} onUnclaim={vi.fn()} />)
      fireEvent.click(screen.getByRole('button', { name: 'Bulk Unclaim' }))
      fireEvent.click(screen.getByText('Cancel'))
      await waitFor(() => {
        expect(screen.queryByText('Confirm Bulk Unclaim')).not.toBeInTheDocument()
      })
    })

    it('calls onUnclaim and closes dialog when Unclaim is confirmed', async () => {
      const handleUnclaim = vi.fn()
      render(<ClaimFilters selectedCount={3} onUnclaim={handleUnclaim} />)
      fireEvent.click(screen.getByRole('button', { name: 'Bulk Unclaim' }))
      fireEvent.click(screen.getByText('Unclaim'))
      expect(handleUnclaim).toHaveBeenCalledTimes(1)
      await waitFor(() => {
        expect(screen.queryByText('Confirm Bulk Unclaim')).not.toBeInTheDocument()
      })
    })
  })
})
