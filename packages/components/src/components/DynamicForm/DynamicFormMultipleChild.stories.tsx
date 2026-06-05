import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DynamicFormMultipleChild } from './DynamicFormMultipleChild'
import type { MultipleChildItem } from './DynamicFormMultipleChild'
import type { FormField } from './DynamicForm.types'

const sampleFields: FormField[] = [
  { name: 'name', type: 'text', label: 'Name', required: true },
  { name: 'role', type: 'text', label: 'Role' },
]

const meta: Meta<typeof DynamicFormMultipleChild> = {
  title: 'DynamicForm/DynamicFormMultipleChild',
  component: DynamicFormMultipleChild,
  tags: ['autodocs'],
  argTypes: {
    readOnly: { control: 'boolean' },
    maxItems: { control: 'number' },
    onAdd: { action: 'add' },
    onRemove: { action: 'remove' },
    onChange: { action: 'change' },
  },
  args: {
    fields: sampleFields,
    label: 'Contact Persons',
    readOnly: false,
  },
}

export default meta
type Story = StoryObj<typeof DynamicFormMultipleChild>

function Controlled({ maxItems, readOnly }: { maxItems?: number; readOnly?: boolean }) {
  const [items, setItems] = useState<MultipleChildItem[]>([{}])
  return (
    <DynamicFormMultipleChild
      fields={sampleFields}
      items={items}
      label="Contact Persons"
      onAdd={() => setItems((prev) => [...prev, {}])}
      onRemove={(i) => setItems((prev) => prev.filter((_, idx) => idx !== i))}
      onChange={(i, name, value) =>
        setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, [name]: value } : item)))
      }
      maxItems={maxItems}
      readOnly={readOnly}
    />
  )
}

export const Default: Story = {
  render: () => <Controlled />,
}

export const MaxItems: Story = {
  render: () => <Controlled maxItems={2} />,
}

export const ReadOnly: Story = {
  render: () => <Controlled readOnly />,
}

export const MultipleItems: Story = {
  args: {
    fields: sampleFields,
    items: [
      { name: 'Alice', role: 'Manager' },
      { name: 'Bob', role: 'Analyst' },
    ],
    label: 'Team Members',
    onAdd: () => undefined,
    onRemove: () => undefined,
    onChange: () => undefined,
  },
}
