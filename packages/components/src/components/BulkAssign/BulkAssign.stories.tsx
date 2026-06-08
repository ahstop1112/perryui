import type { Meta, StoryObj } from '@storybook/react'
import BulkAssign from './BulkAssign'

const meta: Meta<typeof BulkAssign> = {
  title: 'Components/BulkAssign',
  component: BulkAssign,
  tags: ['autodocs'],
  argTypes: {
    selectedCount: { control: 'number', description: 'Number of selected items' },
    assigneeName: { control: 'text', description: 'Name of the assignee' },
    disabled: { control: 'boolean', description: 'Manually disable the button' },
    buttonLabel: { control: 'text', description: 'Button label text' },
    onAssign: { action: 'assigned' },
  },
  args: {
    selectedCount: 3,
    buttonLabel: 'Bulk Assign',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof BulkAssign>

export const Default: Story = {
  args: {
    selectedCount: 3,
    assigneeName: 'John Doe',
  },
}

export const NoSelection: Story = {
  args: {
    selectedCount: 0,
    assigneeName: 'John Doe',
  },
}

export const Disabled: Story = {
  args: {
    selectedCount: 5,
    disabled: true,
    assigneeName: 'Jane Smith',
  },
}

export const WithoutAssigneeName: Story = {
  args: {
    selectedCount: 2,
    assigneeName: undefined,
  },
}

export const CustomLabel: Story = {
  args: {
    selectedCount: 4,
    assigneeName: 'Operations Team',
    buttonLabel: 'Assign to Team',
  },
}
