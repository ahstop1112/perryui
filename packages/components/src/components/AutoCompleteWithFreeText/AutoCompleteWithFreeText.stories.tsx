import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import AutoCompleteWithFreeText from './AutoCompleteWithFreeText'
import type { SelectOption } from './AutoCompleteWithFreeText'

const tags: SelectOption[] = [
  { value: 'urgent', label: 'Urgent' },
  { value: 'review', label: 'Needs Review' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'approved', label: 'Approved' },
]

const meta: Meta<typeof AutoCompleteWithFreeText> = {
  title: 'Components/AutoCompleteWithFreeText',
  component: AutoCompleteWithFreeText,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: { name: 'tag', value: null, options: tags, fullWidth: true },
}
export default meta
type Story = StoryObj<typeof AutoCompleteWithFreeText>

export const Default: Story = { args: { label: 'Tag', placeholder: 'Select or create a tag…' } }

export const WithValue: Story = {
  args: { label: 'Tag', value: { value: 'urgent', label: 'Urgent' } },
}

export const MultiSelect: Story = {
  args: { label: 'Tags', multiple: true, value: [], placeholder: 'Add tags…' },
}

export const Disabled: Story = {
  args: { label: 'Tag', value: { value: 'approved', label: 'Approved' }, disabled: true },
}

export const WithError: Story = { args: { label: 'Tag', error: 'Please select or enter a tag.' } }

function ControlledDemo() {
  const [value, setValue] = useState<SelectOption | null>(null)
  return (
    <AutoCompleteWithFreeText
      name="tag"
      value={value}
      onChange={(v) => setValue(v as SelectOption | null)}
      options={tags}
      label="Trade Tag"
      placeholder="Select or type a custom tag…"
    />
  )
}
export const Interactive: Story = { render: () => <ControlledDemo /> }
