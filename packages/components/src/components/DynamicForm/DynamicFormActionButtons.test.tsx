import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DynamicFormActionButtons from './DynamicFormActionButtons'
import type { FormAction } from './DynamicFormActionButtons'

const actions: FormAction[] = [
  { key: 'approve', label: 'Approve', variant: 'contained', color: 'success' },
  { key: 'reject', label: 'Reject', variant: 'outlined', color: 'error' },
]

describe('DynamicFormActionButtons', () => {
  it('renders all action buttons', () => {
    render(<DynamicFormActionButtons actions={actions} onAction={() => undefined} />)
    expect(screen.getByRole('button', { name: /approve/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reject/i })).toBeInTheDocument()
  })

  it('calls onAction with the correct key', () => {
    const handleAction = vi.fn()
    render(<DynamicFormActionButtons actions={actions} onAction={handleAction} />)
    fireEvent.click(screen.getByRole('button', { name: /approve/i }))
    expect(handleAction).toHaveBeenCalledWith('approve')
  })

  it('calls onAction with reject key', () => {
    const handleAction = vi.fn()
    render(<DynamicFormActionButtons actions={actions} onAction={handleAction} />)
    fireEvent.click(screen.getByRole('button', { name: /reject/i }))
    expect(handleAction).toHaveBeenCalledWith('reject')
  })

  it('disables all buttons when loading', () => {
    render(<DynamicFormActionButtons actions={actions} onAction={() => undefined} loading />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => expect(btn).toBeDisabled())
  })

  it('disables all buttons when disabled', () => {
    render(<DynamicFormActionButtons actions={actions} onAction={() => undefined} disabled />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => expect(btn).toBeDisabled())
  })

  it('renders empty when no actions', () => {
    const { container } = render(
      <DynamicFormActionButtons actions={[]} onAction={() => undefined} />
    )
    expect(container.querySelectorAll('button')).toHaveLength(0)
  })
})
