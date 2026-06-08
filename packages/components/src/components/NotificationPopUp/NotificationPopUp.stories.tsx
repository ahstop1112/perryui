import type { Meta, StoryObj } from '@storybook/react'
import NotificationPopUp from './NotificationPopUp'

const meta: Meta<typeof NotificationPopUp> = {
  title: 'Components/NotificationPopUp',
  component: NotificationPopUp,
  tags: ['autodocs'],
  argTypes: {
    autoHideDuration: {
      control: 'number',
      description: 'Duration in ms before auto-hiding (0 = never)',
    },
    onClose: { action: 'closed' },
  },
}

export default meta
type Story = StoryObj<typeof NotificationPopUp>

export const Default: Story = {
  args: {
    notifications: [
      { id: 1, message: 'Operation completed successfully.', severity: 'success' },
    ],
    autoHideDuration: 6000,
  },
}

export const ErrorNotification: Story = {
  args: {
    notifications: [
      { id: 1, title: 'Error', message: 'Failed to submit the form. Please try again.', severity: 'error' },
    ],
  },
}

export const WarningNotification: Story = {
  args: {
    notifications: [
      { id: 1, title: 'Warning', message: 'Your session will expire in 5 minutes.', severity: 'warning' },
    ],
  },
}

export const InfoNotification: Story = {
  args: {
    notifications: [
      { id: 1, title: 'Info', message: 'A new version of the system is available.', severity: 'info' },
    ],
  },
}

export const SuccessWithTitle: Story = {
  args: {
    notifications: [
      { id: 1, title: 'Trade Submitted', message: 'Trade TXN-20240601-001 has been submitted for approval.', severity: 'success' },
    ],
  },
}

export const Empty: Story = {
  args: {
    notifications: [],
  },
}
