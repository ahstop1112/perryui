import type { Meta, StoryObj } from '@storybook/react'
import { DateRangePicker } from './DateRangePicker'

const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof DateRangePicker>

export const Default: Story = {
  args: {
    value: { startDate: '2026-01-01', endDate: '2026-12-31' },
    onChange: () => {},
  },
}
export const Empty: Story = {
  args: {
    value: { startDate: '', endDate: '' },
    onChange: () => {},
    startLabel: 'Start Date',
    endLabel: 'End Date',
  },
}
export const WithError: Story = {
  args: {
    value: { startDate: '', endDate: '' },
    onChange: () => {},
    error: 'Please select a valid date range',
  },
}
export const Disabled: Story = {
  args: {
    value: { startDate: '2026-01-01', endDate: '2026-06-30' },
    onChange: () => {},
    disabled: true,
  },
}
