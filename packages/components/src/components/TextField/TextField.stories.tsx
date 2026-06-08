import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import TextField from './TextField'

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'tel', 'url', 'search'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    error: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: { name: 'demo', value: '', fullWidth: true },
}
export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = { args: { placeholder: 'Enter text…' } }

export const WithLabel: Story = { args: { label: 'Client Name', placeholder: 'Enter client name' } }

export const WithError: Story = {
  args: { label: 'Email', value: 'not-an-email', error: 'Please enter a valid email address.', type: 'email' },
}

export const Disabled: Story = { args: { label: 'Account ID', value: 'ACC-00123', disabled: true } }

export const EmailType: Story = { args: { label: 'Email', type: 'email', placeholder: 'trader@bank.hk' } }

export const Required: Story = { args: { label: 'Trade Reference', required: true, placeholder: 'e.g. TRD-2026-001' } }

function ControlledDemo() {
  const [value, setValue] = useState('')
  return <TextField name="demo" value={value} onChange={setValue} label="Search" placeholder="Type to search…" />
}
export const Interactive: Story = { render: () => <ControlledDemo /> }
