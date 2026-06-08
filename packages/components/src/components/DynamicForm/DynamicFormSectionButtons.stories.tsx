import type { Meta, StoryObj } from '@storybook/react'
import DynamicFormSectionButtons from './DynamicFormSectionButtons'

const meta: Meta<typeof DynamicFormSectionButtons> = {
  title: 'DynamicForm/DynamicFormSectionButtons',
  component: DynamicFormSectionButtons,
  tags: ['autodocs'],
  argTypes: {
    submitLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onSubmit: { action: 'submitted' },
    onCancel: { action: 'cancelled' },
  },
  args: {
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
    loading: false,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof DynamicFormSectionButtons>

export const Default: Story = {
  args: { onSubmit: () => undefined },
}

export const WithCancel: Story = {
  args: {
    onSubmit: () => undefined,
    onCancel: () => undefined,
  },
}

export const Loading: Story = {
  args: {
    onSubmit: () => undefined,
    onCancel: () => undefined,
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    onSubmit: () => undefined,
    onCancel: () => undefined,
    disabled: true,
  },
}

export const CustomLabels: Story = {
  args: {
    onSubmit: () => undefined,
    onCancel: () => undefined,
    submitLabel: 'Save Changes',
    cancelLabel: 'Discard',
  },
}
