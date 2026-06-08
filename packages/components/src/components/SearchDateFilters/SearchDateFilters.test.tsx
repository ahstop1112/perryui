import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchDateFilters from './SearchDateFilters'
import type { DateFilter } from './SearchDateFilters'

const customFilters: DateFilter[] = [
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'This Year', value: 'year' },
]

describe('SearchDateFilters', () => {
  describe('rendering', () => {
    it('renders default filters when none provided', () => {
      render(<SearchDateFilters onChange={vi.fn()} />)
      expect(screen.getByText('Today')).toBeInTheDocument()
      expect(screen.getByText('Last 7 Days')).toBeInTheDocument()
      expect(screen.getByText('This Month')).toBeInTheDocument()
      expect(screen.getByText('Earlier')).toBeInTheDocument()
    })

    it('renders custom filters when provided', () => {
      render(<SearchDateFilters filters={customFilters} onChange={vi.fn()} />)
      expect(screen.getByText('This Week')).toBeInTheDocument()
      expect(screen.getByText('This Month')).toBeInTheDocument()
      expect(screen.getByText('This Year')).toBeInTheDocument()
    })

    it('renders all filters as chips', () => {
      render(<SearchDateFilters onChange={vi.fn()} />)
      const chips = screen.getAllByRole('button')
      expect(chips).toHaveLength(4)
    })
  })

  describe('active state', () => {
    it('marks the chip matching value as active (aria-pressed=true)', () => {
      render(<SearchDateFilters value="today" onChange={vi.fn()} />)
      const todayChip = screen.getByText('Today').closest('[role="button"]')
      expect(todayChip).toHaveAttribute('aria-pressed', 'true')
    })

    it('marks non-active chips as aria-pressed=false', () => {
      render(<SearchDateFilters value="today" onChange={vi.fn()} />)
      const lastWeekChip = screen.getByText('Last 7 Days').closest('[role="button"]')
      expect(lastWeekChip).toHaveAttribute('aria-pressed', 'false')
    })

    it('renders with no active chip when value is undefined', () => {
      render(<SearchDateFilters value={undefined} onChange={vi.fn()} />)
      const chips = screen.getAllByRole('button')
      chips.forEach((chip) => {
        expect(chip).toHaveAttribute('aria-pressed', 'false')
      })
    })
  })

  describe('interactions', () => {
    it('calls onChange with the filter value when a chip is clicked', () => {
      const handleChange = vi.fn()
      render(<SearchDateFilters onChange={handleChange} />)
      fireEvent.click(screen.getByText('Last 7 Days'))
      expect(handleChange).toHaveBeenCalledWith('last7days')
    })

    it('calls onChange with the correct value for custom filters', () => {
      const handleChange = vi.fn()
      render(<SearchDateFilters filters={customFilters} onChange={handleChange} />)
      fireEvent.click(screen.getByText('This Year'))
      expect(handleChange).toHaveBeenCalledWith('year')
    })

    it('calls onChange each time a chip is clicked', () => {
      const handleChange = vi.fn()
      render(<SearchDateFilters onChange={handleChange} />)
      fireEvent.click(screen.getByText('Today'))
      fireEvent.click(screen.getByText('This Month'))
      expect(handleChange).toHaveBeenCalledTimes(2)
    })
  })
})
