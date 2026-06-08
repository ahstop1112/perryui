import type { Meta, StoryObj } from '@storybook/react'
import DynamicFormInputLabel from './DynamicFormInputLabel'

const meta: Meta<typeof DynamicFormInputLabel> = {
  title: 'DynamicForm/DynamicFormInputLabel',
  component: DynamicFormInputLabel,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text' },
    required: { control: 'boolean', description: 'Shows required asterisk' },
    readOnly: { control: 'boolean', description: 'Hides required/tooltip/remarks in read-only mode' },
    tooltipText: { control: 'text', description: 'Tooltip content' },
    remarks: { control: 'text', description: 'Additional remarks text' },
    htmlFor: { control: 'text', description: 'ID of associated input' },
  },
  args: {
    label: 'Field Label',
    required: false,
    readOnly: false,
  },
}

export default meta
type Story = StoryObj<typeof DynamicFormInputLabel>

export const Default: Story = {}

export const Required: Story = {
  args: { label: 'Email Address', required: true },
}

export const WithTooltip: Story = {
  args: { label: 'Account Number', tooltipText: 'Your 10-digit account number' },
}

export const WithRemarks: Story = {
  args: { label: 'Remarks', remarks: 'optional' },
}

export const AllFeatures: Story = {
  args: {
    label: 'Full Name',
    required: true,
    tooltipText: 'Enter your legal name as on ID',
    remarks: 'as per HKID',
  },
}

export const ReadOnly: Story = {
  args: {
    label: 'Full Name',
    required: true,
    readOnly: true,
    tooltipText: 'Hidden in read-only mode',
    remarks: 'Hidden in read-only mode',
  },
}
