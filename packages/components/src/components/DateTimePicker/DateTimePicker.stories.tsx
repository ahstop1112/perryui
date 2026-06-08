import type { Meta, StoryObj } from '@storybook/react'
import DateTimePicker from './DateTimePicker'

const meta: Meta<typeof DateTimePicker> = {
  title: 'Components/DateTimePicker',
  component: DateTimePicker,
  argTypes: {
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    label: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof DateTimePicker>

export const Default: Story = {
  args: { value: '2026-06-02T09:30', onChange: () => {}, label: 'Date & Time' },
}
export const Empty: Story = {
  args: { value: '', onChange: () => {}, label: 'Date & Time' },
}
export const WithError: Story = {
  args: { value: '', onChange: () => {}, label: 'Date & Time', error: 'DateTime is required' },
}
export const Disabled: Story = {
  args: { value: '2026-06-02T09:30', onChange: () => {}, label: 'Date & Time', disabled: true },
}
