import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import styles from './SearchContainer.module.scss'

export interface SearchFilter {
  key: string
  label: string
  render: (value: string, onChange: (value: string) => void) => React.ReactNode
}

export interface SearchContainerProps {
  keyword: string
  onKeywordChange: (value: string) => void
  onSearch: (keyword: string, filters: Record<string, string>) => void
  onReset?: () => void
  filters?: SearchFilter[]
  searchLabel?: string
  resetLabel?: string
  advancedLabel?: string
  placeholder?: string
}

const SearchContainer: React.FC<SearchContainerProps> = ({
  keyword,
  onKeywordChange,
  onSearch,
  onReset,
  filters = [],
  searchLabel = 'Search',
  resetLabel = 'Reset',
  advancedLabel = 'Advanced',
  placeholder = 'Search...',
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [filterValues, setFilterValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(filters.map((f) => [f.key, '']))
  )

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    onSearch(keyword, filterValues)
  }

  const handleReset = () => {
    setFilterValues(Object.fromEntries(filters.map((f) => [f.key, ''])))
    onKeywordChange('')
    onReset?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  const filterContent = (
    <Box className={styles.filterGrid}>
      {filters.map((f) => (
        <Box key={f.key} className={styles.filterItem}>
          {f.render(filterValues[f.key] ?? '', (v) => handleFilterChange(f.key, v))}
        </Box>
      ))}
    </Box>
  )

  return (
    <Box className={styles.root} sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}>
      {/* Keyword row */}
      <Box className={styles.keywordRow}>
        <TextField
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          size="small"
          fullWidth
          slotProps={{ htmlInput: { 'aria-label': placeholder } }}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ flexShrink: 0 }}>
          {searchLabel}
        </Button>
        <Button variant="outlined" onClick={handleReset} sx={{ flexShrink: 0 }}>
          {resetLabel}
        </Button>
        {filters.length > 0 && (
          <Button
            variant="text"
            onClick={() => setShowAdvanced((v) => !v)}
            sx={{ flexShrink: 0 }}
            aria-expanded={showAdvanced}
          >
            {advancedLabel} {showAdvanced ? '▲' : '▼'}
          </Button>
        )}
      </Box>

      {/* Advanced filters — desktop: Collapse, mobile: Dialog */}
      {filters.length > 0 && (
        <>
          {isMobile ? (
            <Dialog open={showAdvanced} onClose={() => setShowAdvanced(false)} fullWidth>
              <DialogTitle>
                {advancedLabel}
              </DialogTitle>
              <DialogContent>
                {filterContent}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleReset} variant="outlined" size="small">{resetLabel}</Button>
                <Button onClick={() => { handleSearch(); setShowAdvanced(false) }} variant="contained" size="small">{searchLabel}</Button>
              </DialogActions>
            </Dialog>
          ) : (
            <Collapse in={showAdvanced} unmountOnExit>
              <Box className={styles.advancedSection} sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2, mt: 2 }}>
                {filterContent}
              </Box>
            </Collapse>
          )}
        </>
      )}
    </Box>
  )
}

export default SearchContainer
