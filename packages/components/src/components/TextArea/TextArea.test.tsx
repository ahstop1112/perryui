import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TextArea from './TextArea'

describe('TextArea', () => {
  it('renders a textarea', () => {
    render(<TextArea name="test" value="" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('displays the value', () => {
    render(<TextArea name="test" value="Hello" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('Hello')
  })

  it('calls onChange with new value', () => {
    const handleChange = vi.fn()
    render(<TextArea name="test" value="" onChange={handleChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new text' } })
    expect(handleChange).toHaveBeenCalledWith('new text')
  })

  it('disables textarea when disabled=true', () => {
    render(<TextArea name="test" value="" onChange={vi.fn()} disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('shows error message when error prop is set', () => {
    render(<TextArea name="test" value="" onChange={vi.fn()} error="Required" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })

  it('shows character count when maxLength is provided', () => {
    render(<TextArea name="test" value="abc" onChange={vi.fn()} maxLength={100} />)
    expect(screen.getByText('3/100')).toBeInTheDocument()
  })

  it('does not show character count without maxLength', () => {
    render(<TextArea name="test" value="abc" onChange={vi.fn()} />)
    expect(screen.queryByText(/\d+\/\d+/)).not.toBeInTheDocument()
  })
})
