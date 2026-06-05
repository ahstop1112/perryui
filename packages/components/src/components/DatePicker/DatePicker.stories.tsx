import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  argTypes: {
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    label: { control: 'text' },
    min: { control: 'text' },
    max: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  args: { value: '2026-06-02', onChange: () => {}, label: 'Date' },
}
export const Empty: Story = {
  args: { value: '', onChange: () => {}, label: 'Date', placeholder: 'Select date' },
}
export const WithError: Story = {
  args: { value: '', onChange: () => {}, label: 'Date', error: 'Date is required' },
}
export const Disabled: Story = {
  args: { value: '2026-06-02', onChange: () => {}, label: 'Date', disabled: true },
}
export const WithMinMax: Story = {
  args: { value: '2026-06-02', onChange: () => {}, label: 'Date', min: '2026-01-01', max: '2026-12-31' },
}
