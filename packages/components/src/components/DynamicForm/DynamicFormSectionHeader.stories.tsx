import type { Meta, StoryObj } from '@storybook/react'
import { DynamicFormSectionHeader } from './DynamicFormSectionHeader'

const meta: Meta<typeof DynamicFormSectionHeader> = {
  title: 'DynamicForm/DynamicFormSectionHeader',
  component: DynamicFormSectionHeader,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Section title text' },
  },
  args: {
    title: 'Personal Information',
  },
}

export default meta
type Story = StoryObj<typeof DynamicFormSectionHeader>

export const Default: Story = {}

export const NoTitle: Story = {
  args: { title: undefined },
}

export const LongTitle: Story = {
  args: { title: 'Step 2 — Employment & Financial Background Information' },
}
