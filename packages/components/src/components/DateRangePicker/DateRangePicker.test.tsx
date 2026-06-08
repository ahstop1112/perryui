import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DateRangePicker from './DateRangePicker'

describe('DateRangePicker', () => {
  const defaultValue = { startDate: '', endDate: '' }

  it('renders start and end labels', () => {
    render(<DateRangePicker value={defaultValue} onChange={() => {}} startLabel="From" endLabel="To" />)
    expect(screen.getByLabelText('From')).toBeInTheDocument()
    expect(screen.getByLabelText('To')).toBeInTheDocument()
  })

  it('calls onChange when start date changes', () => {
    const onChange = vi.fn()
    render(<DateRangePicker value={defaultValue} onChange={onChange} />)
    fireEvent.change(screen.getByLabelText('From'), { target: { value: '2026-06-01' } })
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ startDate: '2026-06-01' }))
  })

  it('calls onChange when end date changes', () => {
    const onChange = vi.fn()
    render(<DateRangePicker value={{ startDate: '2026-06-01', endDate: '' }} onChange={onChange} />)
    fireEvent.change(screen.getByLabelText('To'), { target: { value: '2026-06-30' } })
    expect(onChange).toHaveBeenCalledWith({ startDate: '2026-06-01', endDate: '2026-06-30' })
  })

  it('shows error message', () => {
    render(<DateRangePicker value={defaultValue} onChange={() => {}} error="Invalid range" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid range')
  })
})
