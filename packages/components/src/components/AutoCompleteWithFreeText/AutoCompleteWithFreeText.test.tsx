import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AutoCompleteWithFreeText } from './AutoCompleteWithFreeText'
import type { SelectOption } from './AutoCompleteWithFreeText'

const options: SelectOption[] = [
  { value: 'urgent', label: 'Urgent' },
  { value: 'review', label: 'Needs Review' },
]

describe('AutoCompleteWithFreeText', () => {
  it('renders a combobox', () => {
    render(<AutoCompleteWithFreeText name="tag" value={null} onChange={vi.fn()} options={options} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('displays selected value', () => {
    render(
      <AutoCompleteWithFreeText
        name="tag"
        value={{ value: 'urgent', label: 'Urgent' }}
        onChange={vi.fn()}
        options={options}
      />,
    )
    expect(screen.getByRole('combobox')).toHaveValue('Urgent')
  })

  it('disables input when disabled=true', () => {
    render(<AutoCompleteWithFreeText name="tag" value={null} onChange={vi.fn()} options={options} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('shows error when error prop is set', () => {
    render(
      <AutoCompleteWithFreeText name="tag" value={null} onChange={vi.fn()} options={options} error="Required" />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })

  it('renders in multiple mode without crashing', () => {
    render(
      <AutoCompleteWithFreeText name="tags" value={[]} onChange={vi.fn()} options={options} multiple />,
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
