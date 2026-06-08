import type { Meta, StoryObj } from '@storybook/react'
import SearchDateFilters from './SearchDateFilters'

const meta: Meta<typeof SearchDateFilters> = {
  title: 'Components/SearchDateFilters',
  component: SearchDateFilters,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'Currently active filter value' },
    onChange: { action: 'filter changed' },
  },
}

export default meta
type Story = StoryObj<typeof SearchDateFilters>

export const Default: Story = {
  args: {
    value: 'today',
  },
}

export const NoSelection: Story = {
  args: {
    value: undefined,
  },
}

export const LastSevenDays: Story = {
  args: {
    value: 'last7days',
  },
}

export const ThisMonth: Story = {
  args: {
    value: 'thisMonth',
  },
}

export const CustomFilters: Story = {
  args: {
    filters: [
      { label: 'Q1', value: 'q1' },
      { label: 'Q2', value: 'q2' },
      { label: 'Q3', value: 'q3' },
      { label: 'Q4', value: 'q4' },
      { label: 'Full Year', value: 'fullYear' },
    ],
    value: 'q2',
  },
}
