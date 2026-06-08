import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AutoCompleteWithButton from './AutoCompleteWithButton'
import type { SelectOption } from './AutoCompleteWithButton'

const options: SelectOption[] = [
  { value: 'b1', label: 'Goldman Sachs' },
  { value: 'b2', label: 'Morgan Stanley' },
]

describe('AutoCompleteWithButton', () => {
  it('renders the autocomplete combobox', () => {
    render(
      <AutoCompleteWithButton
        name="broker"
        value={null}
        onChange={vi.fn()}
        options={options}
        buttonLabel="Load"
        onButtonClick={vi.fn()}
      />,
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders the action button with correct label', () => {
    render(
      <AutoCompleteWithButton
        name="broker"
        value={null}
        onChange={vi.fn()}
        options={options}
        buttonLabel="Search"
        onButtonClick={vi.fn()}
      />,
    )
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('calls onButtonClick when button is clicked', () => {
    const handleButtonClick = vi.fn()
    render(
      <AutoCompleteWithButton
        name="broker"
        value={null}
        onChange={vi.fn()}
        options={options}
        buttonLabel="Load"
        onButtonClick={handleButtonClick}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: /load/i }))
    expect(handleButtonClick).toHaveBeenCalledTimes(1)
  })

  it('shows error when error prop is set', () => {
    render(
      <AutoCompleteWithButton
        name="broker"
        value={null}
        onChange={vi.fn()}
        options={options}
        buttonLabel="Load"
        onButtonClick={vi.fn()}
        error="Required"
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })

  it('disables both inputs when disabled=true', () => {
    render(
      <AutoCompleteWithButton
        name="broker"
        value={null}
        onChange={vi.fn()}
        options={options}
        buttonLabel="Load"
        onButtonClick={vi.fn()}
        disabled
      />,
    )
    expect(screen.getByRole('combobox')).toBeDisabled()
    expect(screen.getByRole('button', { name: /load/i })).toBeDisabled()
  })
})
