import type { Meta, StoryObj } from '@storybook/react'
import { TextField, Stack } from '@mui/material'
import { FormDialogs } from './FormDialogs'

const meta: Meta<typeof FormDialogs> = {
  title: 'Components/FormDialogs',
  component: FormDialogs,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean', description: 'Controls dialog visibility' },
    title: { control: 'text', description: 'Dialog title' },
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Maximum width of the dialog',
    },
    onClose: { action: 'closed' },
  },
  args: {
    open: true,
    title: 'Edit Record',
    maxWidth: 'sm',
  },
}

export default meta
type Story = StoryObj<typeof FormDialogs>

export const Default: Story = {
  args: {
    children: (
      <Stack spacing={2} sx={{ pt: 1 }}>
        <TextField label="First Name" fullWidth size="small" />
        <TextField label="Last Name" fullWidth size="small" />
        <TextField label="Email" fullWidth size="small" type="email" />
      </Stack>
    ),
  },
}

export const NarrowForm: Story = {
  args: {
    title: 'Quick Note',
    maxWidth: 'xs',
    children: (
      <Stack spacing={2} sx={{ pt: 1 }}>
        <TextField label="Note" fullWidth size="small" multiline rows={3} />
      </Stack>
    ),
  },
}

export const WideForm: Story = {
  args: {
    title: 'Trade Details',
    maxWidth: 'lg',
    children: (
      <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
        <TextField label="Security" fullWidth size="small" />
        <TextField label="Quantity" fullWidth size="small" type="number" />
        <TextField label="Price" fullWidth size="small" type="number" />
        <TextField label="Currency" fullWidth size="small" />
      </Stack>
    ),
  },
}

export const EmptyForm: Story = {
  args: {
    title: 'No Content',
    children: undefined,
  },
}
