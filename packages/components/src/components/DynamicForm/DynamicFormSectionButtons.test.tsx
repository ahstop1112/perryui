import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DynamicFormSectionButtons from './DynamicFormSectionButtons'

describe('DynamicFormSectionButtons', () => {
  it('renders submit button', () => {
    render(<DynamicFormSectionButtons onSubmit={() => undefined} />)
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  it('renders custom submit label', () => {
    render(<DynamicFormSectionButtons onSubmit={() => undefined} submitLabel="Save" />)
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })

  it('does not render cancel button when onCancel is not provided', () => {
    render(<DynamicFormSectionButtons onSubmit={() => undefined} />)
    expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument()
  })

  it('renders cancel button when onCancel is provided', () => {
    render(<DynamicFormSectionButtons onSubmit={() => undefined} onCancel={() => undefined} />)
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  it('calls onSubmit when submit button is clicked', () => {
    const handleSubmit = vi.fn()
    render(<DynamicFormSectionButtons onSubmit={handleSubmit} />)
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('calls onCancel when cancel button is clicked', () => {
    const handleCancel = vi.fn()
    render(<DynamicFormSectionButtons onSubmit={() => undefined} onCancel={handleCancel} />)
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }))
    expect(handleCancel).toHaveBeenCalledTimes(1)
  })

  it('disables submit when loading', () => {
    render(<DynamicFormSectionButtons onSubmit={() => undefined} loading />)
    expect(screen.getByRole('button', { name: '' })).toBeDisabled()
  })

  it('disables cancel when loading', () => {
    render(<DynamicFormSectionButtons onSubmit={() => undefined} onCancel={() => undefined} loading />)
    expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled()
  })

  it('disables submit when disabled', () => {
    render(<DynamicFormSectionButtons onSubmit={() => undefined} disabled />)
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled()
  })

  it('shows spinner when loading', () => {
    render(<DynamicFormSectionButtons onSubmit={() => undefined} loading />)
    expect(document.querySelector('svg')).toBeInTheDocument()
  })
})
