import type { Meta, StoryObj } from '@storybook/react'
import { DataList } from './DataList'

const meta: Meta<typeof DataList> = {
  title: 'Components/DataList',
  component: DataList,
  tags: ['autodocs'],
  argTypes: {
    emptyMessage: { control: 'text', description: 'Message shown when no items' },
    onItemClick: { action: 'item clicked' },
  },
}

export default meta
type Story = StoryObj<typeof DataList>

const sampleItems = [
  { id: 1, label: 'KYC Application Form.pdf', url: 'https://example.com/kyc.pdf', mimeType: 'application/pdf' },
  { id: 2, label: 'Passport Copy.jpg', url: 'https://example.com/passport.jpg', mimeType: 'image/jpeg' },
  { id: 3, label: 'Bank Statement Q1.xlsx', url: 'https://example.com/statement.xlsx', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
]

export const Default: Story = {
  args: {
    items: sampleItems,
  },
}

export const WithClickHandler: Story = {
  args: {
    items: sampleItems,
  },
}

export const EmptyState: Story = {
  args: {
    items: [],
    emptyMessage: 'No documents attached to this application.',
  },
}

export const SingleItem: Story = {
  args: {
    items: [
      { id: 1, label: 'Trade Confirmation.pdf', url: 'https://example.com/trade.pdf', mimeType: 'application/pdf' },
    ],
  },
}

export const NoMimeType: Story = {
  args: {
    items: [
      { id: 1, label: 'Document One', url: 'https://example.com/doc1' },
      { id: 2, label: 'Document Two', url: 'https://example.com/doc2' },
    ],
  },
}
