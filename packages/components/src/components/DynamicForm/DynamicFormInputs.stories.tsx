import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import { DynamicFormInputs } from './DynamicFormInputs'
import type { FormField } from './DynamicForm.types'

const meta: Meta<typeof DynamicFormInputs> = {
  title: 'DynamicForm/DynamicFormInputs',
  component: DynamicFormInputs,
  tags: ['autodocs'],
  argTypes: {
    readOnly: { control: 'boolean' },
    error: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof DynamicFormInputs>

function Controlled({ field }: { field: FormField }) {
  const [value, setValue] = useState<unknown>('')
  return (
    <Box sx={{ maxWidth: 400 }}>
      <DynamicFormInputs
        field={field}
        value={value}
        onChange={(_, v) => setValue(v)}
      />
    </Box>
  )
}

export const Default: Story = {
  args: {
    field: { name: 'firstName', type: 'text', label: 'First Name', placeholder: 'Enter name', required: true },
    value: '',
    onChange: () => undefined,
  },
}

export const TextField: Story = {
  render: () => <Controlled field={{ name: 'name', type: 'text', label: 'Full Name', required: true }} />,
}

export const EmailField: Story = {
  render: () => <Controlled field={{ name: 'email', type: 'email', label: 'Email', required: true }} />,
}

export const PasswordField: Story = {
  render: () => <Controlled field={{ name: 'pw', type: 'password', label: 'Password' }} />,
}

export const NumberField: Story = {
  render: () => <Controlled field={{ name: 'age', type: 'number', label: 'Age' }} />,
}

export const TextareaField: Story = {
  render: () => <Controlled field={{ name: 'bio', type: 'textarea', label: 'Biography', remarks: 'max 500 chars' }} />,
}

export const DateField: Story = {
  render: () => <Controlled field={{ name: 'dob', type: 'date', label: 'Date of Birth', required: true }} />,
}

export const DateTimeField: Story = {
  render: () => <Controlled field={{ name: 'appt', type: 'datetime', label: 'Appointment' }} />,
}

export const DateRangeField: Story = {
  render: () => <Controlled field={{ name: 'period', type: 'dateRange', label: 'Period' }} />,
}

export const DropdownField: Story = {
  render: () => (
    <Controlled
      field={{
        name: 'country',
        type: 'dropdown',
        label: 'Country',
        options: [
          { value: 'hk', label: 'Hong Kong' },
          { value: 'sg', label: 'Singapore' },
          { value: 'uk', label: 'United Kingdom' },
        ],
      }}
    />
  ),
}

export const DropdownFreeTextField: Story = {
  render: () => (
    <Controlled
      field={{
        name: 'industry',
        type: 'dropdownFreeText',
        label: 'Industry',
        options: [
          { value: 'finance', label: 'Finance' },
          { value: 'tech', label: 'Technology' },
        ],
      }}
    />
  ),
}

export const RadioField: Story = {
  render: () => (
    <Controlled
      field={{
        name: 'gender',
        type: 'radio',
        label: 'Gender',
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Prefer not to say' },
        ],
      }}
    />
  ),
}

export const CheckboxField: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return (
      <Box sx={{ maxWidth: 400 }}>
        <DynamicFormInputs
          field={{
            name: 'interests',
            type: 'checkbox',
            label: 'Interests',
            options: [
              { value: 'equities', label: 'Equities' },
              { value: 'bonds', label: 'Bonds' },
              { value: 'derivatives', label: 'Derivatives' },
            ],
          }}
          value={value}
          onChange={(_, v) => setValue(v as string[])}
        />
      </Box>
    )
  },
}

export const SwitcherField: Story = {
  render: () => {
    const [value, setValue] = useState(false)
    return (
      <Box sx={{ maxWidth: 400 }}>
        <DynamicFormInputs
          field={{ name: 'enabled', type: 'switcher', label: 'Enable Notifications' }}
          value={value}
          onChange={(_, v) => setValue(v as boolean)}
        />
      </Box>
    )
  },
}

export const NoticeField: Story = {
  args: {
    field: { name: 'notice', type: 'notice', noticeContent: 'Please ensure all documents are valid and up to date.' },
    value: '',
    onChange: () => undefined,
  },
}

export const SubTitleField: Story = {
  args: {
    field: { name: 'heading', type: 'subTitle', label: 'Section Heading' },
    value: '',
    onChange: () => undefined,
  },
}

export const TaglineField: Story = {
  args: {
    field: { name: 'divider', type: 'tagline' },
    value: '',
    onChange: () => undefined,
  },
}

export const WithError: Story = {
  args: {
    field: { name: 'email', type: 'email', label: 'Email', required: true },
    value: 'invalid',
    error: 'Please enter a valid email address',
    onChange: () => undefined,
  },
}

export const ReadOnly: Story = {
  args: {
    field: { name: 'name', type: 'text', label: 'Full Name', required: true },
    value: 'Perry Cheung',
    readOnly: true,
    onChange: () => undefined,
  },
}
