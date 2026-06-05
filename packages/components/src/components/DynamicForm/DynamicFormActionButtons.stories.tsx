import type { Meta, StoryObj } from '@storybook/react'
import { DynamicFormActionButtons } from './DynamicFormActionButtons'
import type { FormAction } from './DynamicFormActionButtons'

const sampleActions: FormAction[] = [
  { key: 'approve', label: 'Approve', variant: 'contained', color: 'success' },
  { key: 'reject', label: 'Reject', variant: 'outlined', color: 'error' },
  { key: 'review', label: 'Request Review', variant: 'text', color: 'secondary' },
]

const meta: Meta<typeof DynamicFormActionButtons> = {
  title: 'DynamicForm/DynamicFormActionButtons',
  component: DynamicFormActionButtons,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onAction: { action: 'action triggered' },
  },
  args: {
    actions: sampleActions,
    loading: false,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof DynamicFormActionButtons>

export const Default: Story = {
  args: { onAction: () => undefined },
}

export const Loading: Story = {
  args: { onAction: () => undefined, loading: true },
}

export const Disabled: Story = {
  args: { onAction: () => undefined, disabled: true },
}

export const SingleAction: Story = {
  args: {
    actions: [{ key: 'export', label: 'Export PDF', variant: 'contained' }],
    onAction: () => undefined,
  },
}
