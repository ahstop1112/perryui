import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { CheckboxList } from './CheckboxList'
import type { ColumnMap, RowData } from './types'

const COLUMNS: ColumnMap = {
  claimId: { label: 'Claim ID', className: 'field_10', isSort: true },
  client: { label: 'Client', className: 'field_20', isSort: true },
  amount: { label: 'Amount', className: 'field_15', type: 'number', isSort: true },
  submittedAt: { label: 'Submitted', className: 'field_20', type: 'date' },
  status: { label: 'Status', className: 'field_15', type: 'status' },
  view: { label: '', className: 'field_5', type: 'action' },
}

const ROWS: RowData[] = [
  { id: 1, claimId: 'CLM-001', client: 'Goldman Sachs', amount: 125000, submittedAt: '2026-05-01T09:00:00Z', status: 'PENDING' },
  { id: 2, claimId: 'CLM-002', client: 'Morgan Stanley', amount: 85000, submittedAt: '2026-05-02T11:30:00Z', status: 'PROCESSING' },
  { id: 3, claimId: 'CLM-003', client: 'JPMorgan', amount: 240000, submittedAt: '2026-05-03T14:00:00Z', status: 'COMPLETED' },
  { id: 4, claimId: 'CLM-004', client: 'UBS', amount: 67000, submittedAt: '2026-05-04T09:45:00Z', status: 'REJECTED' },
  { id: 5, claimId: 'CLM-005', client: 'HSBC', amount: 310000, submittedAt: '2026-05-05T16:00:00Z', status: 'DRAFT' },
]

const meta: Meta<typeof CheckboxList> = {
  title: 'Components/CheckboxList',
  component: CheckboxList,
  parameters: { layout: 'padded' },
  argTypes: {
    canSort: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    showFooter: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof CheckboxList>

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<(string | number)[]>([])
    return (
      <CheckboxList
        {...args}
        columns={COLUMNS}
        rows={ROWS}
        selectedIds={selected}
        onSelectionChange={setSelected}
        onAction={(a, r) => console.log(a, r)}
      />
    )
  },
  args: { title: 'Claims', canSort: true },
}

export const WithPreselection: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<(string | number)[]>([1, 3])
    return (
      <CheckboxList
        {...args}
        columns={COLUMNS}
        rows={ROWS}
        selectedIds={selected}
        onSelectionChange={setSelected}
      />
    )
  },
  args: { title: 'Claims (2 pre-selected)' },
}

export const Loading: Story = {
  args: { columns: COLUMNS, rows: [], isLoading: true, title: 'Loading Claims' },
}

export const Empty: Story = {
  args: { columns: COLUMNS, rows: [], emptyMessage: 'No claims found.' },
}
