import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { NumberField } from './NumberField'

describe('NumberField', () => {
  it('renders a numeric input', () => {
    render(<NumberField name="amount" value={0} onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('displays the formatted value when blurred', () => {
    render(<NumberField name="amount" value={1000} onChange={vi.fn()} thousandSeparator decimalScale={2} />)
    expect(screen.getByRole('textbox')).toHaveValue('1,000.00')
  })

  it('shows error when error prop is set', () => {
    render(<NumberField name="amount" value="" onChange={vi.fn()} error="Required" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })

  it('disables the input when disabled=true', () => {
    render(<NumberField name="amount" value={0} onChange={vi.fn()} disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('renders prefix adornment when prefix is provided', () => {
    render(<NumberField name="amount" value={0} onChange={vi.fn()} prefix="HK$" />)
    expect(screen.getByText('HK$')).toBeInTheDocument()
  })

  it('calls onChange when input changes', () => {
    const handleChange = vi.fn()
    render(<NumberField name="amount" value="" onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: '500' } })
    expect(handleChange).toHaveBeenCalledWith(500)
  })

  it('calls onChange with empty string for non-numeric input', () => {
    const handleChange = vi.fn()
    render(<NumberField name="amount" value="" onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'abc' } })
    expect(handleChange).toHaveBeenCalledWith('')
  })
})
