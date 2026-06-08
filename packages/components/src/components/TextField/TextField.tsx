import React from 'react'
import { TextField as MuiTextField, FormHelperText } from '@mui/material'
import styles from './TextField.module.scss'

export interface TextFieldProps {
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  error?: string
  type?: 'text' | 'email' | 'tel' | 'url' | 'search'
  maxLength?: number
  autoFocus?: boolean
  fullWidth?: boolean
  required?: boolean
  id?: string
}

const TextField = ({
  name,
  value,
  onChange,
  placeholder,
  label,
  disabled = false,
  error,
  type = 'text',
  maxLength,
  autoFocus = false,
  fullWidth = true,
  required = false,
  id,
}: TextFieldProps) => {
  const errorId = `${name}-error`
  const hasError = Boolean(error)

  return (
    <div className={styles.root}>
      <MuiTextField
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
        size="small"
        variant="outlined"
        inputProps={{
          maxLength,
          'aria-describedby': hasError ? errorId : undefined,
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault()
        }}
      />
      {hasError && (
        <FormHelperText error id={errorId} role="alert" className={styles.errorText}>
          {error}
        </FormHelperText>
      )}
    </div>
  )
}

export default TextField
