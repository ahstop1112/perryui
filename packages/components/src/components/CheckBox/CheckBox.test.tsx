import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CheckBox } from './CheckBox'
import type { CheckboxOption } from './CheckBox'

const options: CheckboxOption[] = [
  { name: 'opt1', label: 'Option 1', checked: false },
  { name: 'opt2', label: 'Option 2', checked: true },
]

describe('CheckBox', () => {
  it('renders all options', () => {
    render(<CheckBox name="test" options={options} onChange={vi.fn()} />)
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument()
  })

  it('reflects checked state from options', () => {
    render(<CheckBox name="test" options={options} onChange={vi.fn()} />)
    expect(screen.getByLabelText('Option 1')).not.toBeChecked()
    expect(screen.getByLabelText('Option 2')).toBeChecked()
  })

  it('calls onChange with correct name and new checked value', () => {
    const handleChange = vi.fn()
    render(<CheckBox name="test" options={options} onChange={handleChange} />)
    fireEvent.click(screen.getByLabelText('Option 1'))
    expect(handleChange).toHaveBeenCalledWith('opt1', true)
  })

  it('disables all checkboxes when disabled=true', () => {
    render(<CheckBox name="test" options={options} onChange={vi.fn()} disabled />)
    screen.getAllByRole('checkbox').forEach((cb) => expect(cb).toBeDisabled())
  })

  it('shows error message when error prop is set', () => {
    render(<CheckBox name="test" options={options} onChange={vi.fn()} error="Required" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })

  it('renders with no options without crashing', () => {
    render(<CheckBox name="test" options={[]} onChange={vi.fn()} />)
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
  })
})
