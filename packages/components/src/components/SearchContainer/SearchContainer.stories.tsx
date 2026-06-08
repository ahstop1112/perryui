import type { Meta, StoryObj } from '@storybook/react'
import TextField from '@mui/material/TextField'
import SearchContainer from './SearchContainer'
import type { SearchFilter } from './SearchContainer'

const meta: Meta<typeof SearchContainer> = {
  title: 'Components/SearchContainer',
  component: SearchContainer,
  argTypes: {
    keyword: { control: 'text' },
    placeholder: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof SearchContainer>

const sampleFilters: SearchFilter[] = [
  {
    key: 'status',
    label: 'Status',
    render: (value, onChange) => (
      <TextField select label="Status" value={value} onChange={(e) => onChange(e.target.value)} size="small" fullWidth>
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </TextField>
    ),
  },
  {
    key: 'dateFrom',
    label: 'Date From',
    render: (value, onChange) => (
      <TextField type="date" label="Date From" value={value} onChange={(e) => onChange(e.target.value)} size="small" fullWidth InputLabelProps={{ shrink: true }} />
    ),
  },
]

export const Default: Story = {
  args: {
    keyword: '',
    onKeywordChange: () => {},
    onSearch: () => {},
    onReset: () => {},
    placeholder: 'Search by name...',
  },
}
export const WithAdvancedFilters: Story = {
  args: {
    keyword: '',
    onKeywordChange: () => {},
    onSearch: () => {},
    onReset: () => {},
    filters: sampleFilters,
    placeholder: 'Search...',
  },
}
export const WithKeyword: Story = {
  args: {
    keyword: 'John Doe',
    onKeywordChange: () => {},
    onSearch: () => {},
    placeholder: 'Search by name...',
  },
}
