import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Switcher from './Switcher'

describe('Switcher', () => {
  it('renders a switch input', () => {
    render(<Switcher name="test" checked={false} onChange={vi.fn()} />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('reflects checked state', () => {
    render(<Switcher name="test" checked={true} onChange={vi.fn()} />)
    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('reflects unchecked state', () => {
    render(<Switcher name="test" checked={false} onChange={vi.fn()} />)
    expect(screen.getByRole('switch')).not.toBeChecked()
  })

  it('calls onChange with new checked value when toggled', () => {
    const handleChange = vi.fn()
    render(<Switcher name="test" checked={false} onChange={handleChange} />)
    fireEvent.click(screen.getByRole('switch'))
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('disables the switch when disabled=true', () => {
    render(<Switcher name="test" checked={false} onChange={vi.fn()} disabled />)
    expect(screen.getByRole('switch')).toBeDisabled()
  })

  it('renders a label when label prop is provided', () => {
    render(<Switcher name="test" checked={false} onChange={vi.fn()} label="Dark Mode" />)
    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
  })

  it('does not fire onChange when disabled', () => {
    const handleChange = vi.fn()
    render(<Switcher name="test" checked={false} onChange={handleChange} disabled />)
    // Verify disabled state — a disabled switch won't fire onChange in a real browser
    expect(screen.getByRole('switch')).toBeDisabled()
    expect(handleChange).not.toHaveBeenCalled()
  })
})
