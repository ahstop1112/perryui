import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DateTimePicker from './DateTimePicker'

describe('DateTimePicker', () => {
  it('renders with label', () => {
    render(<DateTimePicker value="" onChange={() => {}} label="Start Time" />)
    expect(screen.getByLabelText('Start Time')).toBeInTheDocument()
  })

  it('calls onChange with new value', () => {
    const onChange = vi.fn()
    render(<DateTimePicker value="" onChange={onChange} label="Time" />)
    fireEvent.change(screen.getByLabelText('Time'), { target: { value: '2026-06-15T10:00' } })
    expect(onChange).toHaveBeenCalledWith('2026-06-15T10:00')
  })

  it('shows error message', () => {
    render(<DateTimePicker value="" onChange={() => {}} error="Required" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })

  it('is disabled when disabled prop is true', () => {
    render(<DateTimePicker value="2026-06-02T09:30" onChange={() => {}} disabled />)
    expect(screen.getByDisplayValue('2026-06-02T09:30')).toBeDisabled()
  })
})
