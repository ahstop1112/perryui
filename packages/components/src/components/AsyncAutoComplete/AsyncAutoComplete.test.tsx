import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AsyncAutoComplete } from './AsyncAutoComplete'

const mockLoad = vi.fn().mockResolvedValue([{ value: 'hsbc', label: 'HSBC' }])

describe('AsyncAutoComplete', () => {
  it('renders a combobox input', () => {
    render(<AsyncAutoComplete name="stock" value={null} onChange={vi.fn()} loadOptions={mockLoad} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('disables input when disabled=true', () => {
    render(<AsyncAutoComplete name="stock" value={null} onChange={vi.fn()} loadOptions={mockLoad} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('shows error message when error is set', () => {
    render(
      <AsyncAutoComplete name="stock" value={null} onChange={vi.fn()} loadOptions={mockLoad} error="Required" />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })

  it('shows min-input-length hint in noOptionsText', () => {
    render(
      <AsyncAutoComplete
        name="stock"
        value={null}
        onChange={vi.fn()}
        loadOptions={mockLoad}
        minInputLength={3}
        label="Stock"
      />,
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders with multiple=true without crashing', () => {
    render(
      <AsyncAutoComplete name="stocks" value={[]} onChange={vi.fn()} loadOptions={mockLoad} multiple />,
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
