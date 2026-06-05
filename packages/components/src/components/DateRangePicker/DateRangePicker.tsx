import React from 'react'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import styles from './DateRangePicker.module.css'

export interface DateRangeValue {
  startDate: string // 'YYYY-MM-DD' or ''
  endDate: string   // 'YYYY-MM-DD' or ''
}

export interface DateRangePickerProps {
  value: DateRangeValue
  onChange: (value: DateRangeValue) => void
  startLabel?: string
  endLabel?: string
  disabled?: boolean
  error?: string
  min?: string
  max?: string
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  startLabel = 'From',
  endLabel = 'To',
  disabled = false,
  error,
  min,
  max,
}) => {
  const hasError = Boolean(error)

  const handleStartChange = (startDate: string) => {
    onChange({
      startDate,
      endDate: value.endDate && startDate && value.endDate < startDate ? '' : value.endDate,
    })
  }

  const handleEndChange = (endDate: string) => {
    onChange({ ...value, endDate })
  }

  return (
    <Box className={styles.root}>
      <Box className={styles.row}>
        <TextField
          type="date"
          label={startLabel}
          value={value.startDate}
          onChange={(e) => handleStartChange(e.target.value)}
          disabled={disabled}
          error={hasError}
          size="small"
          fullWidth
          inputProps={{ min, max }}
          InputLabelProps={{ shrink: true }}
        />
        <Typography className={styles.separator} sx={{ color: 'text.secondary' }}>
          —
        </Typography>
        <TextField
          type="date"
          label={endLabel}
          value={value.endDate}
          onChange={(e) => handleEndChange(e.target.value)}
          disabled={disabled}
          error={hasError}
          size="small"
          fullWidth
          inputProps={{ min: value.startDate || min, max }}
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      {hasError && (
        <FormHelperText error role="alert" className={styles.errorText}>
          {error}
        </FormHelperText>
      )}
    </Box>
  )
}
