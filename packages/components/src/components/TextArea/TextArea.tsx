import React from 'react'
import { TextField, FormHelperText } from '@mui/material'
import styles from './TextArea.module.scss'

export interface TextAreaProps {
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  error?: string
  minRows?: number
  maxRows?: number
  maxLength?: number
  fullWidth?: boolean
  required?: boolean
  id?: string
}

const TextArea = ({
  name,
  value,
  onChange,
  placeholder,
  label,
  disabled = false,
  error,
  minRows = 4,
  maxRows,
  maxLength,
  fullWidth = true,
  required = false,
  id,
}: TextAreaProps) => {
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
        fullWidth={fullWidth}
        required={required}
        multiline
        minRows={minRows}
        maxRows={maxRows}
        variant="outlined"
        size="small"
        inputProps={{
          maxLength,
          'aria-describedby': hasError ? errorId : undefined,
        }}
        className={styles.textarea}
      />
      <div className={styles.footer}>
        {hasError && (
          <FormHelperText error id={errorId} role="alert">
            {error}
          </FormHelperText>
        )}
        {maxLength && (
          <span className={styles.charCount} aria-live="polite">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  )
}

export default TextArea
