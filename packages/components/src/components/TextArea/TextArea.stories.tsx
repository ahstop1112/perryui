import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TextArea } from './TextArea'

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    minRows: { control: { type: 'number', min: 1 } },
    maxRows: { control: { type: 'number', min: 1 } },
    maxLength: { control: 'number' },
    error: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: { name: 'notes', value: '', fullWidth: true, minRows: 4 },
}
export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = { args: { placeholder: 'Enter notes…' } }

export const WithLabel: Story = { args: { label: 'Trade Notes', placeholder: 'Enter notes about this trade…' } }

export const WithCharacterLimit: Story = {
  args: { label: 'Comments', placeholder: 'Max 500 characters', maxLength: 500 },
}

export const WithError: Story = {
  args: { label: 'Remarks', value: '', error: 'Remarks are required.' },
}

export const Disabled: Story = {
  args: { label: 'Trade Notes', value: 'Buy 1,000 shares of HSBC at market price.', disabled: true },
}

function ControlledDemo() {
  const [value, setValue] = useState('')
  return (
    <TextArea
      name="demo"
      value={value}
      onChange={setValue}
      label="Trade Remarks"
      placeholder="Describe the trade rationale…"
      maxLength={500}
    />
  )
}
export const Interactive: Story = { render: () => <ControlledDemo /> }
