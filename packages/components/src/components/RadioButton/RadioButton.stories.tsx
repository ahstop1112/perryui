import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioButton } from './RadioButton'

const riskOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    row: { control: 'boolean' },
    label: { control: 'text' },
    error: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: { name: 'riskLevel', value: 'medium', options: riskOptions, row: false, disabled: false },
}
export default meta
type Story = StoryObj<typeof RadioButton>

export const Default: Story = {}

export const WithLabel: Story = { args: { label: 'Risk Level' } }

export const Horizontal: Story = { args: { row: true } }

export const Disabled: Story = { args: { disabled: true } }

export const WithError: Story = {
  args: { value: '', error: 'Please select a risk level.' },
}

function InteractiveDemo() {
  const [value, setValue] = useState('medium')
  return (
    <RadioButton
      name="riskLevel"
      value={value}
      options={riskOptions}
      onChange={setValue}
      label="Risk Level"
      row
    />
  )
}
export const Interactive: Story = { render: () => <InteractiveDemo /> }
