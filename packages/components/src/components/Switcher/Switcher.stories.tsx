import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Switcher from './Switcher'

const meta: Meta<typeof Switcher> = {
  title: 'Components/Switcher',
  component: Switcher,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean', description: 'Whether the switch is on' },
    disabled: { control: 'boolean' },
    label: { control: 'text', description: 'Optional label' },
    size: { control: 'select', options: ['small', 'medium'] },
    onChange: { action: 'changed' },
  },
  args: { name: 'notifications', checked: false, disabled: false, size: 'medium' },
}
export default meta
type Story = StoryObj<typeof Switcher>

export const Default: Story = {}

export const Checked: Story = { args: { checked: true } }

export const WithLabel: Story = { args: { label: 'Enable Notifications', checked: false } }

export const CheckedWithLabel: Story = { args: { label: 'Dark Mode', checked: true } }

export const Disabled: Story = { args: { disabled: true } }

export const DisabledChecked: Story = { args: { disabled: true, checked: true } }

export const Small: Story = { args: { size: 'small', label: 'Compact Mode' } }

function InteractiveDemo() {
  const [checked, setChecked] = useState(false)
  return <Switcher name="demo" checked={checked} onChange={setChecked} label={checked ? 'On' : 'Off'} />
}
export const Interactive: Story = { render: () => <InteractiveDemo /> }
