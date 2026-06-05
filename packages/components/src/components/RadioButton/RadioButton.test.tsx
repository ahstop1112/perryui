import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { RadioButton } from './RadioButton'

const options = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

describe('RadioButton', () => {
  it('renders all options', () => {
    render(<RadioButton name="confirm" value="yes" options={options} onChange={vi.fn()} />)
    expect(screen.getByLabelText('Yes')).toBeInTheDocument()
    expect(screen.getByLabelText('No')).toBeInTheDocument()
  })

  it('reflects the selected value', () => {
    render(<RadioButton name="confirm" value="yes" options={options} onChange={vi.fn()} />)
    expect(screen.getByLabelText('Yes')).toBeChecked()
    expect(screen.getByLabelText('No')).not.toBeChecked()
  })

  it('calls onChange with the new value when an option is selected', () => {
    const handleChange = vi.fn()
    render(<RadioButton name="confirm" value="yes" options={options} onChange={handleChange} />)
    fireEvent.click(screen.getByLabelText('No'))
    expect(handleChange).toHaveBeenCalledWith('no')
  })

  it('disables all radios when disabled=true', () => {
    render(<RadioButton name="confirm" value="yes" options={options} onChange={vi.fn()} disabled />)
    screen.getAllByRole('radio').forEach((r) => expect(r).toBeDisabled())
  })

  it('renders optional group label', () => {
    render(<RadioButton name="confirm" value="yes" options={options} onChange={vi.fn()} label="Confirm" />)
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('shows error message when error prop is set', () => {
    render(<RadioButton name="confirm" value="" options={options} onChange={vi.fn()} error="Required" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })
})
