import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Pagination from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    totalCount: { control: { type: 'number', min: 0 }, description: 'Total number of items' },
    pageSize: { control: { type: 'number', min: 1 }, description: 'Items per page' },
    page: { control: { type: 'number', min: 1 }, description: 'Current 1-based page' },
    showFirstButton: { control: 'boolean' },
    showLastButton: { control: 'boolean' },
    onChange: { action: 'page changed' },
  },
  args: {
    totalCount: 100,
    pageSize: 10,
    page: 1,
    showFirstButton: true,
    showLastButton: true,
  },
}
export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {}

export const MidPage: Story = { args: { page: 5, totalCount: 200 } }

export const LastPage: Story = { args: { page: 10, totalCount: 100 } }

export const LargeDataset: Story = { args: { totalCount: 10000, pageSize: 25, page: 1 } }

export const NoFirstLast: Story = {
  args: { showFirstButton: false, showLastButton: false, page: 3 },
}

function InteractiveDemo() {
  const [page, setPage] = useState(1)
  return <Pagination totalCount={200} pageSize={10} page={page} onChange={setPage} />
}
export const Interactive: Story = { render: () => <InteractiveDemo /> }
