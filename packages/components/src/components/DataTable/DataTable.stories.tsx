import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from '@mui/material'
import DataTable from './DataTable'
import type { DataTableColumn } from './DataTable'

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  argTypes: {
    emptyMessage: { control: 'text', description: 'Message shown when no rows' },
  },
}

export default meta
type Story = StoryObj<typeof DataTable>

const tradeColumns: DataTableColumn[] = [
  { key: 'tradeId', label: 'Trade ID', type: 'text' },
  { key: 'security', label: 'Security', type: 'text' },
  { key: 'quantity', label: 'Quantity', type: 'number' },
  { key: 'price', label: 'Price', type: 'number' },
  { key: 'tradeDate', label: 'Trade Date', type: 'date' },
  { key: 'settleDateTime', label: 'Settlement', type: 'datetime' },
  { key: 'active', label: 'Active', type: 'boolean' },
]

const tradeRows: Record<string, unknown>[] = [
  {
    tradeId: 'TXN-001',
    security: 'AAPL',
    quantity: 1000,
    price: 182.5,
    tradeDate: '2024-06-01',
    settleDateTime: '2024-06-03T09:30:00',
    active: true,
  },
  {
    tradeId: 'TXN-002',
    security: 'MSFT',
    quantity: 500,
    price: 415.2,
    tradeDate: '2024-06-01',
    settleDateTime: '2024-06-03T09:30:00',
    active: false,
  },
  {
    tradeId: 'TXN-003',
    security: 'GOOGL',
    quantity: 200,
    price: 175.8,
    tradeDate: '2024-06-02',
    settleDateTime: '2024-06-04T09:30:00',
    active: true,
  },
]

export const Default: Story = {
  args: {
    columns: tradeColumns,
    rows: tradeRows,
  },
}

export const EmptyState: Story = {
  args: {
    columns: tradeColumns,
    rows: [],
    emptyMessage: 'No trades found for the selected period.',
  },
}

export const CustomFormatter: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'status', label: 'Status', type: 'text',
        format: (value) => (
          <Chip
            label={String(value)}
            color={value === 'Active' ? 'success' : 'default'}
            size="small"
          />
        ),
      },
      { key: 'amount', label: 'Amount (USD)', type: 'number',
        format: (value) => `$${(value as number).toLocaleString()}`,
      },
    ],
    rows: [
      { name: 'Perry Cheung', status: 'Active', amount: 125000 },
      { name: 'Jane Smith', status: 'Inactive', amount: 87500 },
    ],
  },
}

export const WithNullValues: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'value', label: 'Value' },
      { key: 'optional', label: 'Optional' },
    ],
    rows: [
      { id: 1, value: 'Present', optional: null },
      { id: 2, value: 'Present', optional: undefined },
      { id: 3, value: 'Present', optional: '' },
    ],
  },
}
