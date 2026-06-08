import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import AutoComplete from './AutoComplete'
import type { SelectOption } from './AutoComplete'

const options: SelectOption[] = [
  { value: 'hkex', label: 'HKEx' },
  { value: 'nyse', label: 'NYSE' },
]

describe('AutoComplete', () => {
  it('renders a combobox input', () => {
    render(<AutoComplete name="market" value={null} onChange={vi.fn()} options={options} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('displays the selected value', () => {
    render(
      <AutoComplete
        name="market"
        value={{ value: 'hkex', label: 'HKEx' }}
        onChange={vi.fn()}
        options={options}
      />,
    )
    expect(screen.getByRole('combobox')).toHaveValue('HKEx')
  })

  it('disables input when disabled=true', () => {
    render(<AutoComplete name="market" value={null} onChange={vi.fn()} options={options} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('shows error when error prop is set', () => {
    render(<AutoComplete name="market" value={null} onChange={vi.fn()} options={options} error="Required" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })

  it('renders without crashing when multiple=true', () => {
    render(
      <AutoComplete name="markets" value={[]} onChange={vi.fn()} options={options} multiple />,
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('shows selected chip labels in multi-select mode', () => {
    render(
      <AutoComplete
        name="markets"
        value={[{ value: 'hkex', label: 'HKEx' }]}
        onChange={vi.fn()}
        options={options}
        multiple
      />,
    )
    expect(screen.getByText('HKEx')).toBeInTheDocument()
  })
})
