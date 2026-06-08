import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import NumberField from './NumberField'

const meta: Meta<typeof NumberField> = {
  title: 'Components/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    thousandSeparator: { control: 'boolean' },
    allowNegative: { control: 'boolean' },
    decimalScale: { control: { type: 'number', min: 0, max: 8 } },
    prefix: { control: 'text' },
    error: { control: 'text' },
    label: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: {
    name: 'amount',
    value: '',
    thousandSeparator: true,
    allowNegative: true,
    decimalScale: 2,
    fullWidth: true,
  },
}
export default meta
type Story = StoryObj<typeof NumberField>

export const Default: Story = { args: { label: 'Amount', placeholder: '0.00' } }

export const WithPrefix: Story = { args: { label: 'Price', prefix: 'HK$', value: 125000, decimalScale: 2 } }

export const Quantity: Story = { args: { label: 'Quantity', value: 1000, decimalScale: 0, allowNegative: false } }

export const WithError: Story = { args: { label: 'Commission Rate', value: '', error: 'Commission rate is required.' } }

export const Disabled: Story = { args: { label: 'Settlement Amount', value: 1500000, prefix: 'USD', disabled: true } }

export const NoThousandSeparator: Story = {
  args: { label: 'Raw Number', thousandSeparator: false, value: 12345.67 },
}

function ControlledDemo() {
  const [value, setValue] = useState<number | ''>(0)
  return (
    <NumberField
      name="demo"
      value={value}
      onChange={setValue}
      label="Trade Amount (HKD)"
      prefix="HK$"
      decimalScale={2}
    />
  )
}
export const Interactive: Story = { render: () => <ControlledDemo /> }
