import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import FilledTextField from './FilledTextField'

const PersonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
)

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.8-2.2-5-5-5S7 3.2 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.7 1.4-3.1 3.1-3.1 1.7 0 3.1 1.4 3.1 3.1v2z" />
  </svg>
)

const meta: Meta<typeof FilledTextField> = {
  title: 'Components/FilledTextField',
  component: FilledTextField,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'password'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: { name: 'loginId', value: '', fullWidth: true },
}
export default meta
type Story = StoryObj<typeof FilledTextField>

export const Default: Story = { args: { label: 'Login ID', placeholder: 'Enter your login ID' } }

export const WithPersonIcon: Story = {
  args: { label: 'Login ID', placeholder: 'Enter your login ID', startIcon: <PersonIcon /> },
}

export const Password: Story = {
  args: {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    startIcon: <LockIcon />,
  },
}

export const WithError: Story = {
  args: {
    label: 'Login ID',
    value: 'wrong-user',
    error: 'Invalid login credentials.',
    startIcon: <PersonIcon />,
  },
}

export const Disabled: Story = { args: { label: 'Login ID', value: 'john.doe', disabled: true } }

function LoginFormDemo() {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
      <FilledTextField name="loginId" value={id} onChange={setId} label="Login ID" placeholder="Enter your login ID" startIcon={<PersonIcon />} />
      <FilledTextField name="password" value={pw} onChange={setPw} label="Password" type="password" placeholder="Enter your password" startIcon={<LockIcon />} />
    </div>
  )
}
export const LoginForm: Story = { render: () => <LoginFormDemo /> }
