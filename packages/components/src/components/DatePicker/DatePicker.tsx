import React from 'react'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import Box from '@mui/material/Box'
import styles from './DatePicker.module.scss'

export interface DatePickerProps {
  value: string // ISO date string 'YYYY-MM-DD' or ''
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  min?: string // 'YYYY-MM-DD'
  max?: string // 'YYYY-MM-DD'
  fullWidth?: boolean
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder,
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
        type="date"
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        error={hasError}
        placeholder={placeholder}
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

export default DatePicker
