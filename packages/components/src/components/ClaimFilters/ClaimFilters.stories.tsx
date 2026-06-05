import type { Meta, StoryObj } from '@storybook/react'
import { ClaimFilters } from './ClaimFilters'

const meta: Meta<typeof ClaimFilters> = {
  title: 'Components/ClaimFilters',
  component: ClaimFilters,
  tags: ['autodocs'],
  argTypes: {
    selectedCount: { control: 'number', description: 'Number of selected items' },
    showClaim: { control: 'boolean', description: 'Show the claim button' },
    showUnclaim: { control: 'boolean', description: 'Show the unclaim button' },
    claimLabel: { control: 'text', description: 'Label for the claim button' },
    unclaimLabel: { control: 'text', description: 'Label for the unclaim button' },
    onClaim: { action: 'claimed' },
    onUnclaim: { action: 'unclaimed' },
  },
  args: {
    selectedCount: 3,
    showClaim: true,
    showUnclaim: true,
    claimLabel: 'Bulk Claim',
    unclaimLabel: 'Bulk Unclaim',
  },
}

export default meta
type Story = StoryObj<typeof ClaimFilters>

export const Default: Story = {}

export const NoSelection: Story = {
  args: {
    selectedCount: 0,
  },
}

export const ClaimOnly: Story = {
  args: {
    selectedCount: 2,
    showUnclaim: false,
  },
}

export const UnclaimOnly: Story = {
  args: {
    selectedCount: 4,
    showClaim: false,
  },
}

export const CustomLabels: Story = {
  args: {
    selectedCount: 5,
    claimLabel: 'Assign to Me',
    unclaimLabel: 'Release Assignment',
  },
}

export const BothHidden: Story = {
  args: {
    selectedCount: 3,
    showClaim: false,
    showUnclaim: false,
  },
}
