import React from 'react'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import Box from '@mui/material/Box'
import styles from './DateTimePicker.module.scss'

export interface DateTimePickerProps {
  value: string // ISO datetime-local string 'YYYY-MM-DDTHH:mm' or ''
  onChange: (value: string) => void
  label?: string
  disabled?: boolean
  error?: string
  min?: string // 'YYYY-MM-DDTHH:mm'
  max?: string
  fullWidth?: boolean
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  error,
  min,
  max,
  fullWidth = true,
}) => {
  const hasError = Boolean(error)

  return (
    <Box className={styles.root} sx={{ width: fullWidth ? '100%' : 'auto' }}>
      <TextField
        type="datetime-local"
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        error={hasError}
        fullWidth={fullWidth}
        size="small"
        inputProps={{ min, max }}
        InputLabelProps={{ shrink: true }}
      />
      {hasError && (
        <FormHelperText error role="alert" className={styles.errorText}>
          {error}
        </FormHelperText>
      )}
    </Box>
  )
}

export default DateTimePicker
