import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DatePicker from './DatePicker'

describe('DatePicker', () => {
  it('renders with label', () => {
    render(<DatePicker value="" onChange={() => {}} label="Start Date" />)
    expect(screen.getByLabelText('Start Date')).toBeInTheDocument()
  })

  it('calls onChange with new value', () => {
    const onChange = vi.fn()
    render(<DatePicker value="" onChange={onChange} label="Date" />)
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2026-06-15' } })
    expect(onChange).toHaveBeenCalledWith('2026-06-15')
  })

  it('shows error message', () => {
    render(<DatePicker value="" onChange={() => {}} error="Date is required" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Date is required')
  })

  it('is disabled when disabled prop is true', () => {
    render(<DatePicker value="2026-06-02" onChange={() => {}} disabled />)
    expect(screen.getByDisplayValue('2026-06-02')).toBeDisabled()
  })
})
