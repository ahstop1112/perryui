import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import TableList from './TableList'
import type { ColumnMap, RowData } from './types'

const COLUMNS: ColumnMap = {
  id: { label: 'ID', className: 'field_5', isSort: true },
  instrument: { label: 'Instrument', className: 'field_20', isSort: true },
  side: { label: 'Side', className: 'field_10' },
  quantity: { label: 'Qty', className: 'field_10', type: 'number', isSort: true },
  price: { label: 'Price', className: 'field_15', type: 'number', isSort: true },
  status: { label: 'Status', className: 'field_15', type: 'status' },
  createdAt: { label: 'Created', className: 'field_20', type: 'date', isSort: true },
  view: { label: '', className: 'field_5', type: 'action' },
}

const ROWS: RowData[] = [
  { id: 1001, instrument: 'HSBC.HK', side: 'BUY', quantity: 50000, price: 64.5, status: 'ACTIVE', createdAt: '2026-05-01T09:30:00Z' },
  { id: 1002, instrument: 'TENCENT.HK', side: 'SELL', quantity: 10000, price: 362.2, status: 'COMPLETED', createdAt: '2026-05-02T10:15:00Z' },
  { id: 1003, instrument: 'ALIBABA.HK', side: 'BUY', quantity: 25000, price: 78.9, status: 'PENDING', createdAt: '2026-05-03T11:00:00Z' },
  { id: 1004, instrument: 'PING AN.HK', side: 'SELL', quantity: 8000, price: 47.1, status: 'REJECTED', createdAt: '2026-05-04T14:20:00Z' },
  { id: 1005, instrument: 'MEITUAN.HK', side: 'BUY', quantity: 15000, price: 142.0, status: 'DRAFT', createdAt: '2026-05-05T08:45:00Z' },
]

const meta: Meta<typeof TableList> = {
  title: 'Components/TableList',
  component: TableList,
  parameters: { layout: 'padded' },
  argTypes: {
    sortOrder: { control: 'radio', options: ['asc', 'desc'] },
    canSort: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    showFooter: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof TableList>

export const Default: Story = {
  render: (args) => {
    const [pageSorts, setPageSorts] = useState('')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
    return (
      <TableList
        {...args}
        columns={COLUMNS}
        rows={ROWS}
        pageSorts={pageSorts}
        sortOrder={sortOrder}
        onSort={col => {
          setPageSorts(col)
          setSortOrder(o => (o === 'asc' ? 'desc' : 'asc'))
        }}
        onAction={(action, row) => console.log(action, row)}
      />
    )
  },
  args: { title: 'Order Book', canSort: true, showFooter: false },
}

export const Loading: Story = {
  args: {
    columns: COLUMNS, rows: [], isLoading: true, title: 'Loading Orders',
  },
}

export const Empty: Story = {
  args: {
    columns: COLUMNS, rows: [], isLoading: false, title: 'No Orders',
    emptyMessage: 'No orders match your search criteria.',
  },
}

export const WithPagination: Story = {
  render: (args) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(20)
    return (
      <TableList
        {...args}
        columns={COLUMNS}
        rows={ROWS}
        pageIndex={page}
        pageSize={rowsPerPage}
        totalCount={150}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        showFooter
      />
    )
  },
  args: { title: 'Orders (paginated)' },
}
