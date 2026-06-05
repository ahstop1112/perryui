import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DynamicFormMultiple } from './DynamicFormMultiple'
import type { MultipleItem } from './DynamicFormMultiple'
import type { FormField } from './DynamicForm.types'

const beneficiaryField: FormField = {
  name: 'beneficiaries',
  type: 'multiple',
  label: 'Beneficiary',
  maxItems: 4,
  multiple: [
    { name: 'fullName', type: 'text', label: 'Full Name', required: true, span: { md: 6 } },
    { name: 'relationship', type: 'text', label: 'Relationship', span: { md: 6 } },
    { name: 'percentage', type: 'number', label: 'Percentage (%)', span: { md: 6 } },
  ],
}

const meta: Meta<typeof DynamicFormMultiple> = {
  title: 'DynamicForm/DynamicFormMultiple',
  component: DynamicFormMultiple,
  tags: ['autodocs'],
  argTypes: {
    readOnly: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof DynamicFormMultiple>

function Controlled({ readOnly }: { readOnly?: boolean }) {
  const [items, setItems] = useState<MultipleItem[]>([{}])

  return (
    <DynamicFormMultiple
      field={beneficiaryField}
      items={items}
      onAdd={() => setItems((prev) => [...prev, {}])}
      onRemove={(i) => setItems((prev) => prev.filter((_, idx) => idx !== i))}
      onChange={(i, name, value) =>
        setItems((prev) =>
          prev.map((item, idx) => (idx === i ? { ...item, [name]: value } : item))
        )
      }
      readOnly={readOnly}
    />
  )
}

export const Default: Story = {
  render: () => <Controlled />,
}

export const ReadOnly: Story = {
  render: () => <Controlled readOnly />,
}

export const WithMultipleItems: Story = {
  args: {
    field: beneficiaryField,
    items: [
      { fullName: 'Alice Wong', relationship: 'Spouse', percentage: '50' },
      { fullName: 'Bob Wong', relationship: 'Child', percentage: '50' },
    ],
    onAdd: () => undefined,
    onRemove: () => undefined,
    onChange: () => undefined,
  },
}
