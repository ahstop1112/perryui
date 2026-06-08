import React from 'react'
import { TextField, FormHelperText, InputAdornment } from '@mui/material'
import styles from './FilledTextField.module.scss'

export interface FilledTextFieldProps {
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  error?: string
  type?: 'text' | 'password'
  startIcon?: React.ReactNode
  autoFocus?: boolean
  fullWidth?: boolean
  required?: boolean
  id?: string
}

const FilledTextField = ({
  name,
  value,
  onChange,
  placeholder,
  label,
  disabled = false,
  error,
  type = 'text',
  startIcon,
  autoFocus = false,
  fullWidth = true,
  required = false,
  id,
}: FilledTextFieldProps) => {
  const errorId = `${name}-error`
  const hasError = Boolean(error)

  return (
    <div className={styles.root}>
      <TextField
        id={id ?? name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        label={label}
        disabled={disabled}
        error={hasError}
        type={type}
        autoFocus={autoFocus}
        fullWidth={fullWidth}
        required={required}
        variant="filled"
        size="small"
        slotProps={{
          htmlInput: {
            'aria-describedby': hasError ? errorId : undefined,
          },
          input: startIcon
            ? {
                startAdornment: (
                  <InputAdornment position="start" className={styles.icon}>
                    {startIcon}
                  </InputAdornment>
                ),
                disableUnderline: true,
              }
            : { disableUnderline: true },
        }}
        className={styles.input}
      />
      {hasError && (
        <FormHelperText error id={errorId} role="alert" className={styles.errorText}>
          {error}
        </FormHelperText>
      )}
    </div>
  )
}

export default FilledTextField
