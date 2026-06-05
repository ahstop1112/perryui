import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from './Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    items: { description: 'Ancestor navigation items' },
    current: { control: 'text', description: 'Current active page label' },
  },
  args: {
    current: 'Trade Details',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Trades', href: '/trades' },
    ],
  },
}
export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {}

export const SingleLevel: Story = {
  args: {
    items: [{ label: 'Home', href: '/' }],
    current: 'Settings',
  },
}

export const DeepNavigation: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Clients', href: '/clients' },
      { label: 'Client A', href: '/clients/a' },
      { label: 'Portfolio', href: '/clients/a/portfolio' },
    ],
    current: 'Trade History',
  },
}

export const NoItems: Story = {
  args: { items: [], current: 'Dashboard' },
}
