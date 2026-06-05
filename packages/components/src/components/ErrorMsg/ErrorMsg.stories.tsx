import type { Meta, StoryObj } from '@storybook/react'
import { ErrorMsg } from './ErrorMsg'

const meta: Meta<typeof ErrorMsg> = {
  title: 'Components/ErrorMsg',
  component: ErrorMsg,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text', description: 'Error message string or array of strings' },
    id: { control: 'text', description: 'Optional id for aria-describedby linkage' },
  },
  args: { message: 'This field is required.' },
}
export default meta
type Story = StoryObj<typeof ErrorMsg>

export const Default: Story = {}

export const MultipleErrors: Story = {
  args: {
    message: [
      'Password must be at least 8 characters.',
      'Password must contain at least one uppercase letter.',
      'Password must contain at least one number.',
    ],
  },
}

export const ShortError: Story = { args: { message: 'Invalid value.' } }
