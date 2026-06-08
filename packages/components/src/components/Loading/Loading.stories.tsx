import type { Meta, StoryObj } from '@storybook/react'
import Loading from './Loading'

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'range', min: 20, max: 80, step: 4 }, description: 'Spinner diameter in px' },
    color: { control: 'select', options: ['primary', 'secondary', 'inherit'], description: 'Color token' },
    fullPage: { control: 'boolean', description: 'Fills full viewport height' },
  },
  args: { size: 40, color: 'primary', fullPage: false },
}
export default meta
type Story = StoryObj<typeof Loading>

export const Default: Story = {}

export const Small: Story = { args: { size: 20 } }

export const Large: Story = { args: { size: 64 } }

export const Secondary: Story = { args: { color: 'secondary' } }

export const FullPage: Story = { args: { fullPage: true } }
