import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TransferList from './TransferList'

const ITEMS = [
  { id: 1, title: 'Alpha' },
  { id: 2, title: 'Beta' },
  { id: 3, title: 'Gamma' },
  { id: 4, title: 'Delta' },
]

describe('TransferList', () => {
  it('renders left and right list titles', () => {
    render(
      <TransferList
        items={ITEMS}
        chosenIds={[3, 4]}
        onChange={vi.fn()}
        leftTitle="Available"
        rightTitle="Selected"
      />
    )
    expect(screen.getByText('Available')).toBeInTheDocument()
    expect(screen.getByText('Selected')).toBeInTheDocument()
  })

  it('places items in correct lists based on chosenIds', () => {
    render(
      <TransferList
        items={ITEMS}
        chosenIds={[3, 4]}
        onChange={vi.fn()}
      />
    )
    // Alpha and Beta should be in left list
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
    // Gamma and Delta should be in right list
    expect(screen.getByText('Gamma')).toBeInTheDocument()
    expect(screen.getByText('Delta')).toBeInTheDocument()
  })

  it('move right button is disabled when nothing is checked on left', () => {
    render(
      <TransferList items={ITEMS} chosenIds={[]} onChange={vi.fn()} />
    )
    expect(screen.getByLabelText('move selected right')).toBeDisabled()
  })

  it('move left button is disabled when nothing is checked on right', () => {
    render(
      <TransferList items={ITEMS} chosenIds={[]} onChange={vi.fn()} />
    )
    expect(screen.getByLabelText('move selected left')).toBeDisabled()
  })

  it('calls onChange with updated ids when moving item right', () => {
    const handleChange = vi.fn()
    render(
      <TransferList items={ITEMS} chosenIds={[]} onChange={handleChange} />
    )
    // Check Alpha
    fireEvent.click(screen.getByText('Alpha'))
    // Move right
    fireEvent.click(screen.getByLabelText('move selected right'))
    expect(handleChange).toHaveBeenCalledWith([1])
  })

  it('calls onChange with updated ids when moving item left', () => {
    const handleChange = vi.fn()
    render(
      <TransferList items={ITEMS} chosenIds={[1]} onChange={handleChange} />
    )
    // Check Alpha (now in right list)
    fireEvent.click(screen.getByText('Alpha'))
    // Move left
    fireEvent.click(screen.getByLabelText('move selected left'))
    expect(handleChange).toHaveBeenCalledWith([])
  })

  it('disables all interactions when disabled prop is true', () => {
    render(
      <TransferList items={ITEMS} chosenIds={[1]} onChange={vi.fn()} disabled />
    )
    expect(screen.getByLabelText('move selected right')).toBeDisabled()
    expect(screen.getByLabelText('move selected left')).toBeDisabled()
  })

  it('shows correct selected counts in subheader', () => {
    render(
      <TransferList items={ITEMS} chosenIds={[3, 4]} onChange={vi.fn()} />
    )
    // Left has 2 items (Alpha, Beta), right has 2 items (Gamma, Delta), none checked
    expect(screen.getAllByText('0/2 selected')).toHaveLength(2)
  })
})
