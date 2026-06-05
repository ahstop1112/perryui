import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { AutoComplete } from './AutoComplete'
import type { SelectOption } from './AutoComplete'

const markets: SelectOption[] = [
  { value: 'hkex', label: 'HKEx' },
  { value: 'nyse', label: 'NYSE' },
  { value: 'lse', label: 'LSE' },
  { value: 'sgx', label: 'SGX' },
  { value: 'tse', label: 'TSE' },
]

const meta: Meta<typeof AutoComplete> = {
  title: 'Components/AutoComplete',
  component: AutoComplete,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    clearable: { control: 'boolean' },
    loading: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: { name: 'market', value: null, options: markets, fullWidth: true },
}
export default meta
type Story = StoryObj<typeof AutoComplete>

export const Default: Story = { args: { label: 'Market', placeholder: 'Select a market…' } }

export const WithValue: Story = {
  args: { label: 'Market', value: { value: 'hkex', label: 'HKEx' } },
}

export const MultiSelect: Story = {
  args: {
    label: 'Markets',
    multiple: true,
    value: [{ value: 'hkex', label: 'HKEx' }, { value: 'nyse', label: 'NYSE' }],
    placeholder: 'Select markets…',
  },
}

export const Loading: Story = { args: { label: 'Market', loading: true, placeholder: 'Loading options…' } }

export const Disabled: Story = {
  args: { label: 'Market', value: { value: 'hkex', label: 'HKEx' }, disabled: true },
}

export const WithError: Story = {
  args: { label: 'Market', value: null, error: 'Please select a market.' },
}

function ControlledDemo() {
  const [value, setValue] = useState<SelectOption | null>(null)
  return (
    <AutoComplete
      name="market"
      value={value}
      onChange={(v) => setValue(v as SelectOption | null)}
      options={markets}
      label="Market"
      placeholder="Select a market…"
    />
  )
}
export const Interactive: Story = { render: () => <ControlledDemo /> }
