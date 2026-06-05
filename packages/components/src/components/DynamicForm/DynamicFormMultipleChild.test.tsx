import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DynamicFormMultipleChild } from './DynamicFormMultipleChild'
import type { FormField } from './DynamicForm.types'

const fields: FormField[] = [
  { name: 'name', type: 'text', label: 'Name' },
]

describe('DynamicFormMultipleChild', () => {
  it('renders label', () => {
    render(
      <DynamicFormMultipleChild
        fields={fields}
        items={[{}]}
        label="Team Members"
        onAdd={() => undefined}
        onRemove={() => undefined}
        onChange={() => undefined}
      />
    )
    expect(screen.getByText('Team Members')).toBeInTheDocument()
  })

  it('renders add button', () => {
    render(
      <DynamicFormMultipleChild
        fields={fields}
        items={[{}]}
        onAdd={() => undefined}
        onRemove={() => undefined}
        onChange={() => undefined}
      />
    )
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })

  it('calls onAdd when add button clicked', () => {
    const handleAdd = vi.fn()
    render(
      <DynamicFormMultipleChild
        fields={fields}
        items={[{}]}
        onAdd={handleAdd}
        onRemove={() => undefined}
        onChange={() => undefined}
      />
    )
    fireEvent.click(screen.getByRole('button', { name: /add/i }))
    expect(handleAdd).toHaveBeenCalledTimes(1)
  })

  it('renders remove button for each item', () => {
    render(
      <DynamicFormMultipleChild
        fields={fields}
        items={[{}, {}]}
        onAdd={() => undefined}
        onRemove={() => undefined}
        onChange={() => undefined}
      />
    )
    expect(screen.getAllByLabelText(/remove item/i)).toHaveLength(2)
  })

  it('calls onRemove with correct index', () => {
    const handleRemove = vi.fn()
    render(
      <DynamicFormMultipleChild
        fields={fields}
        items={[{}, {}]}
        onAdd={() => undefined}
        onRemove={handleRemove}
        onChange={() => undefined}
      />
    )
    fireEvent.click(screen.getByLabelText('Remove item 2'))
    expect(handleRemove).toHaveBeenCalledWith(1)
  })

  it('hides add button when maxItems reached', () => {
    render(
      <DynamicFormMultipleChild
        fields={fields}
        items={[{}, {}]}
        maxItems={2}
        onAdd={() => undefined}
        onRemove={() => undefined}
        onChange={() => undefined}
      />
    )
    expect(screen.queryByRole('button', { name: /add/i })).not.toBeInTheDocument()
  })

  it('hides add and remove buttons in readOnly mode', () => {
    render(
      <DynamicFormMultipleChild
        fields={fields}
        items={[{}]}
        readOnly
        onAdd={() => undefined}
        onRemove={() => undefined}
        onChange={() => undefined}
      />
    )
    expect(screen.queryByRole('button', { name: /add/i })).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/remove item/i)).not.toBeInTheDocument()
  })
})
