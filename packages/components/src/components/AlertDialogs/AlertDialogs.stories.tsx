import type { Meta, StoryObj } from '@storybook/react'
import AlertDialogs from './AlertDialogs'

const meta: Meta<typeof AlertDialogs> = {
  title: 'Components/AlertDialogs',
  component: AlertDialogs,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean', description: 'Controls dialog visibility' },
    title: { control: 'text', description: 'Dialog title' },
    content: { control: 'text', description: 'Dialog body content' },
    keyId: { control: 'text', description: 'Optional key identifier appended to content' },
    text4Ok: { control: 'text', description: 'Label for the OK button' },
    text4Cancel: { control: 'text', description: 'Label for the Cancel button' },
    okColor: {
      control: 'select',
      options: ['primary', 'error', 'inherit'],
      description: 'Color of the OK button',
    },
    onOk: { action: 'confirmed' },
    onCancel: { action: 'cancelled' },
  },
  args: {
    open: true,
    title: 'Confirm Action',
    content: 'Are you sure you want to proceed?',
    text4Ok: 'OK',
    text4Cancel: 'Cancel',
    okColor: 'primary',
  },
}

export default meta
type Story = StoryObj<typeof AlertDialogs>

export const Default: Story = {}

export const ConfirmDelete: Story = {
  args: {
    title: 'Delete Record',
    content: 'This action cannot be undone. Delete record',
    keyId: 'TXN-20240601-001',
    text4Ok: 'Delete',
    text4Cancel: 'Cancel',
    okColor: 'error',
  },
}

export const InfoOnly: Story = {
  args: {
    title: 'Information',
    content: 'Your request has been submitted successfully.',
    text4Ok: 'Close',
    onCancel: undefined,
  },
}
