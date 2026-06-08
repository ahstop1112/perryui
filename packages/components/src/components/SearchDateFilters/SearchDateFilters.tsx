import { Chip } from '@mui/material'
import styles from './SearchDateFilters.module.scss'

export interface DateFilter {
  label: string
  value: string
}

const DEFAULT_FILTERS: DateFilter[] = [
  { label: 'Today', value: 'today' },
  { label: 'Last 7 Days', value: 'last7days' },
  { label: 'This Month', value: 'thisMonth' },
  { label: 'Earlier', value: 'earlier' },
]

export interface SearchDateFiltersProps {
  filters?: DateFilter[]
  value?: string
  onChange: (value: string) => void
}

const SearchDateFilters = ({
  filters = DEFAULT_FILTERS,
  value,
  onChange,
}: SearchDateFiltersProps) => {
  return (
    <div className={styles.container} role="group" aria-label="Date filters">
      {filters.map((filter) => {
        const isActive = filter.value === value
        return (
          <Chip
            key={filter.value}
            label={filter.label}
            color={isActive ? 'primary' : 'default'}
            variant={isActive ? 'filled' : 'outlined'}
            onClick={() => onChange(filter.value)}
            aria-pressed={isActive}
            className={styles.chip}
          />
        )
      })}
    </div>
  )
}

export default SearchDateFilters
