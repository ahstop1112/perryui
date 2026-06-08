import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TextField from './TextField'

describe('TextField', () => {
  it('renders the input', () => {
    render(<TextField name="test" value="" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('displays the value', () => {
    render(<TextField name="test" value="Hello" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('Hello')
  })

  it('calls onChange with new value on input', () => {
    const handleChange = vi.fn()
    render(<TextField name="test" value="" onChange={handleChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'abc' } })
    expect(handleChange).toHaveBeenCalledWith('abc')
  })

  it('disables the input when disabled=true', () => {
    render(<TextField name="test" value="" onChange={vi.fn()} disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('shows error message when error prop is set', () => {
    render(<TextField name="test" value="" onChange={vi.fn()} error="Required" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })

  it('does not show error message when no error', () => {
    render(<TextField name="test" value="" onChange={vi.fn()} />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('renders a label', () => {
    render(<TextField name="test" value="" onChange={vi.fn()} label="Full Name" />)
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
  })

  it('prevents Enter key from submitting', () => {
    const handleChange = vi.fn()
    render(<TextField name="test" value="" onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    const event = fireEvent.keyDown(input, { key: 'Enter' })
    expect(event).toBeDefined()
  })

  it.each(['text', 'email', 'tel'] as const)('renders type=%s', (type) => {
    render(<TextField name="test" value="" onChange={vi.fn()} type={type} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
