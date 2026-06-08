import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FilledTextField from './FilledTextField'

describe('FilledTextField', () => {
  it('renders an input', () => {
    render(<FilledTextField name="login" value="" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('displays the value', () => {
    render(<FilledTextField name="login" value="john.doe" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('john.doe')
  })

  it('calls onChange with new value', () => {
    const handleChange = vi.fn()
    render(<FilledTextField name="login" value="" onChange={handleChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'admin' } })
    expect(handleChange).toHaveBeenCalledWith('admin')
  })

  it('disables input when disabled=true', () => {
    render(<FilledTextField name="login" value="" onChange={vi.fn()} disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('shows error message when error is set', () => {
    render(<FilledTextField name="login" value="" onChange={vi.fn()} error="Invalid credentials." />)
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials.')
  })

  it('renders password type input', () => {
    const { container } = render(<FilledTextField name="pw" value="" onChange={vi.fn()} type="password" />)
    expect(container.querySelector('input[type="password"]')).toBeInTheDocument()
  })

  it('renders start icon when provided', () => {
    render(<FilledTextField name="login" value="" onChange={vi.fn()} startIcon={<span data-testid="icon" />} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
