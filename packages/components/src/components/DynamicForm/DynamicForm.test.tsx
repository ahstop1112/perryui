import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DynamicForm from './DynamicForm'
import type { FormField, FormSchema } from './types'

const SCHEMA: FormSchema = {
  layout: {
    type: 'default',
    isSectionShown: ['details'],
  },
  details: {
    title: 'Details',
    fields: {
      name: {
        name: 'name', type: 'text', label: 'Name',
        isShown: true, isRequired: true, isEnabled: true,
        isTouched: false, isValid: true, value: '',
        layoutGrid: { xs: 12 },
      },
    },
  },
}

const renderField = (field: FormField) => (
  <input data-testid={`field-${field.name}`} defaultValue={field.value as string} />
)

describe('DynamicForm', () => {
  it('renders section title', () => {
    render(
      <DynamicForm
        id="test"
        schema={SCHEMA}
        renderField={renderField}
        onSubmit={vi.fn()}
      />
    )
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  it('renders field via renderField prop', () => {
    render(
      <DynamicForm
        id="test"
        schema={SCHEMA}
        renderField={renderField}
        onSubmit={vi.fn()}
      />
    )
    expect(screen.getByTestId('field-name')).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(
      <DynamicForm
        id="test"
        schema={SCHEMA}
        actionTypes={['SAVE', 'SUBMIT']}
        pageAction="add"
        renderField={renderField}
        onSubmit={vi.fn()}
      />
    )
    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('calls onSubmit with action when button clicked', () => {
    const onSubmit = vi.fn()
    render(
      <DynamicForm
        id="test"
        schema={SCHEMA}
        actionTypes={['SUBMIT']}
        pageAction="add"
        renderField={renderField}
        onSubmit={onSubmit}
      />
    )
    fireEvent.click(screen.getByText('Submit'))
    expect(onSubmit).toHaveBeenCalledWith('SUBMIT')
  })

  it('renders error messages', () => {
    render(
      <DynamicForm
        id="test"
        schema={SCHEMA}
        errors={['Form is invalid', 'Missing required fields']}
        renderField={renderField}
        onSubmit={vi.fn()}
      />
    )
    expect(screen.getByText('Form is invalid')).toBeInTheDocument()
    expect(screen.getByText('Missing required fields')).toBeInTheDocument()
  })

  it('renders stepper for steps layout', () => {
    const stepsSchema: FormSchema = {
      layout: {
        type: 'steps',
        isSectionShown: ['step1', 'step2'],
      },
      step1: {
        title: 'Step One',
        fields: {
          field1: {
            name: 'field1', type: 'text', label: 'Field 1',
            isShown: true, isEnabled: true, isTouched: false, isValid: true, value: '',
            layoutGrid: { xs: 12 },
          },
        },
      },
      step2: {
        title: 'Step Two',
        fields: {
          field2: {
            name: 'field2', type: 'text', label: 'Field 2',
            isShown: true, isEnabled: true, isTouched: false, isValid: true, value: '',
            layoutGrid: { xs: 12 },
          },
        },
      },
    }

    render(
      <DynamicForm
        id="test"
        schema={stepsSchema}
        renderField={renderField}
        onSubmit={vi.fn()}
      />
    )
    expect(screen.getAllByText('Step One')[0]).toBeInTheDocument()
    expect(screen.getByText('Step Two')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })
})
