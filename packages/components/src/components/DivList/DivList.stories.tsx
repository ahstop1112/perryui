import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import DivList from './DivList'
import type { ColumnMap, RowData } from './types'

const COLUMNS: ColumnMap = {
  instrument: { label: 'Instrument', className: 'field_20', isSort: true },
  assetClass: { label: 'Asset Class', className: 'field_20' },
  nav: { label: 'NAV', className: 'field_15', type: 'number', isSort: true },
  change: { label: 'Change', className: 'field_15', type: 'number', isSort: true },
  status: { label: 'Status', className: 'field_15', type: 'status' },
  view: { label: '', className: 'field_5', type: 'action' },
}

const SUB_COLUMNS: ColumnMap = {
  priorNAV: { label: 'Prior NAV', type: 'number' },
  currentNAV: { label: 'Current NAV', type: 'number' },
  changeNAV: { label: 'Change', type: 'number' },
}

const ROWS: RowData[] = [
  {
    id: 1, instrument: 'HSBC Asia Equity Fund', assetClass: 'Equity', nav: 128.5, change: 2.3, status: 'ACTIVE',
    details: [{ priorNAV: 126.2, currentNAV: 128.5, changeNAV: 2.3 }],
  },
  {
    id: 2, instrument: 'HK Bond Fund', assetClass: 'Fixed Income', nav: 105.1, change: -0.8, status: 'ACTIVE',
    details: [{ priorNAV: 105.9, currentNAV: 105.1, changeNAV: -0.8 }],
  },
  {
    id: 3, instrument: 'Asia Commodities Fund', assetClass: 'Commodities', nav: 89.4, change: 0, status: 'PENDING',
    details: [],
  },
]

const meta: Meta<typeof DivList> = {
  title: 'Components/DivList',
  component: DivList,
  parameters: { layout: 'padded' },
  argTypes: {
    canSort: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    showFooter: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof DivList>

export const Default: Story = {
  render: (args) => {
    const [pageSorts, setPageSorts] = useState('')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
    return (
      <DivList
        {...args}
        columns={COLUMNS}
        rows={ROWS}
        pageSorts={pageSorts}
        sortOrder={sortOrder}
        onSort={col => {
          setPageSorts(col)
          setSortOrder(o => o === 'asc' ? 'desc' : 'asc')
        }}
        onAction={(action, row) => console.log(action, row)}
      />
    )
  },
  args: { title: 'Portfolio Funds', canSort: true },
}

export const WithCollapsibleRows: Story = {
  render: (args) => (
    <DivList
      {...args}
      columns={COLUMNS}
      rows={ROWS}
      subColumns={SUB_COLUMNS}
      onAction={(a, r) => console.log(a, r)}
    />
  ),
  args: { title: 'NAV Details (click row to expand)' },
}

export const Loading: Story = {
  args: { columns: COLUMNS, rows: [], isLoading: true, title: 'Loading...' },
}

export const Empty: Story = {
  args: { columns: COLUMNS, rows: [], isLoading: false, emptyMessage: 'No funds available.' },
}
