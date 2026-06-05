import type { Meta, StoryObj } from '@storybook/react'
import { DynamicForm } from './DynamicForm'
import type { FormField, FormSchema } from './types'

const makeSchema = (layoutType: 'default' | 'accordion' | 'steps' | 'inline'): FormSchema => ({
  layout: {
    type: layoutType,
    isSectionShown: ['personalInfo', 'contactInfo'],
    isSectionExpanded: ['personalInfo'],
  },
  personalInfo: {
    title: 'Personal Information',
    fields: {
      firstName: {
        name: 'firstName', type: 'text', label: 'First Name',
        isShown: true, isRequired: true, isEnabled: true, isTouched: false, isValid: true, value: '',
        layoutGrid: { xs: 12, sm: 6 },
      },
      lastName: {
        name: 'lastName', type: 'text', label: 'Last Name',
        isShown: true, isRequired: true, isEnabled: true, isTouched: false, isValid: true, value: '',
        layoutGrid: { xs: 12, sm: 6 },
      },
      dateOfBirth: {
        name: 'dateOfBirth', type: 'date', label: 'Date of Birth',
        isShown: true, isRequired: false, isEnabled: true, isTouched: false, isValid: true, value: '',
        layoutGrid: { xs: 12, sm: 6 },
      },
    },
  },
  contactInfo: {
    title: 'Contact Information',
    fields: {
      email: {
        name: 'email', type: 'email', label: 'Email Address',
        isShown: true, isRequired: true, isEnabled: true, isTouched: false, isValid: true, value: '',
        layoutGrid: { xs: 12, sm: 8 },
      },
      phone: {
        name: 'phone', type: 'text', label: 'Phone Number',
        isShown: true, isRequired: false, isEnabled: true, isTouched: false, isValid: true, value: '',
        layoutGrid: { xs: 12, sm: 4 },
      },
    },
  },
})

const fieldRenderer = (field: FormField) => (
  <input
    id={field.name}
    name={field.name}
    type={field.type === 'email' ? 'email' : 'text'}
    defaultValue={field.value as string}
    disabled={!field.isEnabled}
    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: 4 }}
    placeholder={field.label}
  />
)

const meta: Meta<typeof DynamicForm> = {
  title: 'Components/DynamicForm',
  component: DynamicForm,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof DynamicForm>

export const Default: Story = {
  args: {
    id: 'default-form',
    schema: makeSchema('default'),
    actionTypes: ['SAVE', 'SUBMIT'],
    pageAction: 'add',
    renderField: fieldRenderer,
    onSubmit: (action) => console.log('submit', action),
    onCancel: () => console.log('cancel'),
  },
}

export const AccordionLayout: Story = {
  args: {
    id: 'accordion-form',
    schema: makeSchema('accordion'),
    actionTypes: ['SAVE', 'SUBMIT'],
    pageAction: 'edit',
    renderField: fieldRenderer,
    onSubmit: (action) => console.log('submit', action),
    onCancel: () => console.log('cancel'),
  },
}

export const StepperLayout: Story = {
  args: {
    id: 'stepper-form',
    schema: makeSchema('steps'),
    actionTypes: ['SAVE'],
    pageAction: 'add',
    renderField: fieldRenderer,
    onSubmit: (action) => console.log('submit', action),
    onCancel: () => console.log('cancel'),
  },
}

export const InlineLayout: Story = {
  args: {
    id: 'inline-form',
    schema: makeSchema('inline'),
    actionTypes: ['SUBMIT'],
    pageAction: 'search',
    renderField: fieldRenderer,
    onSubmit: (action) => console.log('submit', action),
  },
}

export const ViewMode: Story = {
  args: {
    id: 'view-form',
    schema: {
      ...makeSchema('default'),
      personalInfo: {
        title: 'Personal Information',
        fields: {
          firstName: {
            name: 'firstName', type: 'text', label: 'First Name',
            isShown: true, isRequired: true, isEnabled: false,
            isTouched: false, isValid: true, isPreview: true, value: 'John',
            layoutGrid: { xs: 12, sm: 6 },
          },
          lastName: {
            name: 'lastName', type: 'text', label: 'Last Name',
            isShown: true, isRequired: true, isEnabled: false,
            isTouched: false, isValid: true, isPreview: true, value: 'Smith',
            layoutGrid: { xs: 12, sm: 6 },
          },
        },
      },
    },
    pageAction: 'view',
    actionTypes: [],
    renderField: fieldRenderer,
    onSubmit: () => {},
  },
}
