import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CheckBox from './CheckBox'
import type { CheckboxOption } from './CheckBox'

const defaultOptions: CheckboxOption[] = [
  { name: 'equities', label: 'Equities', checked: false },
  { name: 'bonds', label: 'Bonds', checked: true },
  { name: 'derivatives', label: 'Derivatives', checked: false },
  { name: 'fx', label: 'FX', checked: false },
]

const meta: Meta<typeof CheckBox> = {
  title: 'Components/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    columns: { control: 'select', options: [1, 2, 3, 4, 6] },
    error: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: { name: 'assetClass', options: defaultOptions, disabled: false, columns: 1 },
}
export default meta
type Story = StoryObj<typeof CheckBox>

export const Default: Story = {}

export const TwoColumns: Story = { args: { columns: 2 } }

export const ThreeColumns: Story = { args: { columns: 3 } }

export const Disabled: Story = { args: { disabled: true } }

export const WithError: Story = {
  args: { error: 'Please select at least one asset class.' },
}

function InteractiveDemo() {
  const [options, setOptions] = useState(defaultOptions)
  const handleChange = (name: string, checked: boolean) => {
    setOptions((prev) => prev.map((o) => (o.name === name ? { ...o, checked } : o)))
  }
  return <CheckBox name="assetClass" options={options} onChange={handleChange} columns={2} />
}
export const Interactive: Story = { render: () => <InteractiveDemo /> }
