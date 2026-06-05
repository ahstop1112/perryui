import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { AsyncAutoComplete } from './AsyncAutoComplete'
import type { SelectOption } from './AsyncAutoComplete'

const allStocks: SelectOption[] = [
  { value: '0001', label: '0001.HK – CK Hutchison' },
  { value: '0005', label: '0005.HK – HSBC Holdings' },
  { value: '0011', label: '0011.HK – Hang Seng Bank' },
  { value: '0016', label: '0016.HK – Sun Hung Kai' },
  { value: '0388', label: '0388.HK – HKEx' },
  { value: '0700', label: '0700.HK – Tencent' },
  { value: '0941', label: '0941.HK – China Mobile' },
]

const mockLoad = (input: string): Promise<SelectOption[]> =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(allStocks.filter((s) => s.label.toLowerCase().includes(input.toLowerCase()))),
      600,
    ),
  )

const meta: Meta<typeof AsyncAutoComplete> = {
  title: 'Components/AsyncAutoComplete',
  component: AsyncAutoComplete,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    required: { control: 'boolean' },
    debounceMs: { control: 'number' },
    minInputLength: { control: 'number' },
    error: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: { name: 'stock', value: null, fullWidth: true, loadOptions: mockLoad },
}
export default meta
type Story = StoryObj<typeof AsyncAutoComplete>

export const Default: Story = { args: { label: 'Search Stock', placeholder: 'Type 3+ characters…' } }

export const Disabled: Story = { args: { label: 'Stock', disabled: true } }

export const WithError: Story = { args: { label: 'Stock', error: 'Please select a stock.' } }

function ControlledDemo() {
  const [value, setValue] = useState<SelectOption | null>(null)
  return (
    <AsyncAutoComplete
      name="stock"
      value={value}
      onChange={(v) => setValue(v as SelectOption | null)}
      loadOptions={mockLoad}
      label="Search Stock"
      placeholder="Type stock name or code…"
      minInputLength={2}
    />
  )
}
export const Interactive: Story = { render: () => <ControlledDemo /> }
