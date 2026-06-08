import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DynamicFormInputs from './DynamicFormInputs'
import type { FormField } from './DynamicForm.types'

function makeField(overrides: Partial<FormField> & Pick<FormField, 'name' | 'type'>): FormField {
  return { label: 'Test Field', ...overrides }
}

describe('DynamicFormInputs', () => {
  describe('text field', () => {
    it('renders text input', () => {
      render(
        <DynamicFormInputs
          field={makeField({ name: 'name', type: 'text', label: 'Name' })}
          value=""
          onChange={() => undefined}
        />
      )
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('calls onChange on input change', () => {
      const handleChange = vi.fn()
      render(
        <DynamicFormInputs
          field={makeField({ name: 'name', type: 'text', label: 'Name' })}
          value=""
          onChange={handleChange}
        />
      )
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Perry' } })
      expect(handleChange).toHaveBeenCalledWith('name', 'Perry')
    })

    it('displays error text', () => {
      render(
        <DynamicFormInputs
          field={makeField({ name: 'name', type: 'text', label: 'Name' })}
          value=""
          onChange={() => undefined}
          error="Name is required"
        />
      )
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })

    it('is disabled in readOnly mode', () => {
      render(
        <DynamicFormInputs
          field={makeField({ name: 'name', type: 'text', label: 'Name' })}
          value="Test"
          onChange={() => undefined}
          readOnly
        />
      )
      expect(screen.getByRole('textbox')).toBeDisabled()
    })
  })

  describe('number field', () => {
    it('renders number input', () => {
      render(
        <DynamicFormInputs
          field={makeField({ name: 'age', type: 'number', label: 'Age' })}
          value=""
          onChange={() => undefined}
        />
      )
      expect(screen.getByRole('spinbutton')).toBeInTheDocument()
    })

    it('calls onChange on number input', () => {
      const handleChange = vi.fn()
      render(
        <DynamicFormInputs
          field={makeField({ name: 'age', type: 'number', label: 'Age' })}
          value=""
          onChange={handleChange}
        />
      )
      fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '25' } })
      expect(handleChange).toHaveBeenCalledWith('age', '25')
    })
  })

  describe('textarea field', () => {
    it('renders textarea', () => {
      render(
        <DynamicFormInputs
          field={makeField({ name: 'bio', type: 'textarea', label: 'Bio' })}
          value=""
          onChange={() => undefined}
        />
      )
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
  })

  describe('radio field', () => {
    it('renders radio options', () => {
      render(
        <DynamicFormInputs
          field={makeField({
            name: 'gender',
            type: 'radio',
            label: 'Gender',
            options: [
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ],
          })}
          value=""
          onChange={() => undefined}
        />
      )
      expect(screen.getByLabelText('Male')).toBeInTheDocument()
      expect(screen.getByLabelText('Female')).toBeInTheDocument()
    })

    it('calls onChange when radio changes', () => {
      const handleChange = vi.fn()
      render(
        <DynamicFormInputs
          field={makeField({
            name: 'gender',
            type: 'radio',
            label: 'Gender',
            options: [
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ],
          })}
          value=""
          onChange={handleChange}
        />
      )
      fireEvent.click(screen.getByLabelText('Male'))
      expect(handleChange).toHaveBeenCalledWith('gender', 'male')
    })
  })

  describe('checkbox field', () => {
    it('renders checkbox options', () => {
      render(
        <DynamicFormInputs
          field={makeField({
            name: 'interests',
            type: 'checkbox',
            label: 'Interests',
            options: [
              { value: 'equity', label: 'Equity' },
              { value: 'bond', label: 'Bond' },
            ],
          })}
          value={[]}
          onChange={() => undefined}
        />
      )
      expect(screen.getByLabelText('Equity')).toBeInTheDocument()
      expect(screen.getByLabelText('Bond')).toBeInTheDocument()
    })

    it('adds value to array when checked', () => {
      const handleChange = vi.fn()
      render(
        <DynamicFormInputs
          field={makeField({
            name: 'interests',
            type: 'checkbox',
            label: 'Interests',
            options: [{ value: 'equity', label: 'Equity' }],
          })}
          value={[]}
          onChange={handleChange}
        />
      )
      fireEvent.click(screen.getByLabelText('Equity'))
      expect(handleChange).toHaveBeenCalledWith('interests', ['equity'])
    })

    it('removes value from array when unchecked', () => {
      const handleChange = vi.fn()
      render(
        <DynamicFormInputs
          field={makeField({
            name: 'interests',
            type: 'checkbox',
            label: 'Interests',
            options: [{ value: 'equity', label: 'Equity' }],
          })}
          value={['equity']}
          onChange={handleChange}
        />
      )
      fireEvent.click(screen.getByLabelText('Equity'))
      expect(handleChange).toHaveBeenCalledWith('interests', [])
    })
  })

  describe('switcher field', () => {
    it('renders switch', () => {
      render(
        <DynamicFormInputs
          field={makeField({ name: 'active', type: 'switcher', label: 'Active' })}
          value={false}
          onChange={() => undefined}
        />
      )
      expect(screen.getByRole('switch')).toBeInTheDocument()
    })

    it('calls onChange when switched', () => {
      const handleChange = vi.fn()
      render(
        <DynamicFormInputs
          field={makeField({ name: 'active', type: 'switcher', label: 'Active' })}
          value={false}
          onChange={handleChange}
        />
      )
      fireEvent.click(screen.getByRole('switch'))
      expect(handleChange).toHaveBeenCalledWith('active', true)
    })
  })

  describe('notice field', () => {
    it('renders notice content', () => {
      render(
        <DynamicFormInputs
          field={makeField({ name: 'notice', type: 'notice', noticeContent: 'Important notice' })}
          value=""
          onChange={() => undefined}
        />
      )
      expect(screen.getByText('Important notice')).toBeInTheDocument()
    })
  })

  describe('subTitle field', () => {
    it('renders subtitle text', () => {
      render(
        <DynamicFormInputs
          field={makeField({ name: 'heading', type: 'subTitle', label: 'Section Heading' })}
          value=""
          onChange={() => undefined}
        />
      )
      expect(screen.getByText('Section Heading')).toBeInTheDocument()
    })
  })

  describe('tagline field', () => {
    it('renders divider', () => {
      const { container } = render(
        <DynamicFormInputs
          field={makeField({ name: 'divider', type: 'tagline' })}
          value=""
          onChange={() => undefined}
        />
      )
      expect(container.querySelector('hr')).toBeInTheDocument()
    })
  })

  describe('button field', () => {
    it('renders button', () => {
      render(
        <DynamicFormInputs
          field={makeField({ name: 'action', type: 'button', label: 'Click Me' })}
          value=""
          onChange={() => undefined}
        />
      )
      expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument()
    })

    it('calls onChange with click on button press', () => {
      const handleChange = vi.fn()
      render(
        <DynamicFormInputs
          field={makeField({ name: 'action', type: 'button', label: 'Click Me' })}
          value=""
          onChange={handleChange}
        />
      )
      fireEvent.click(screen.getByRole('button', { name: 'Click Me' }))
      expect(handleChange).toHaveBeenCalledWith('action', 'click')
    })
  })

  describe('label rendering', () => {
    it('shows label for text field', () => {
      render(
        <DynamicFormInputs
          field={makeField({ name: 'name', type: 'text', label: 'Full Name' })}
          value=""
          onChange={() => undefined}
        />
      )
      expect(screen.getByText('Full Name')).toBeInTheDocument()
    })

    it('does not show label wrapper for notice type', () => {
      render(
        <DynamicFormInputs
          field={makeField({ name: 'n', type: 'notice', noticeContent: 'Note' })}
          value=""
          onChange={() => undefined}
        />
      )
      expect(screen.queryByRole('label')).not.toBeInTheDocument()
    })
  })
})
