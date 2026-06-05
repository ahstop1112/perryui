import React, { useState, useEffect } from 'react'
import { TextField, FormHelperText, InputAdornment } from '@mui/material'
import styles from './NumberField.module.css'

export interface NumberFieldProps {
  name: string
  value: number | ''
  onChange: (value: number | '') => void
  placeholder?: string
  label?: string
  disabled?: boolean
  error?: string
  prefix?: string
  min?: number
  max?: number
  decimalScale?: number
  allowNegative?: boolean
  thousandSeparator?: boolean
  fullWidth?: boolean
  required?: boolean
  id?: string
}

function formatDisplay(
  value: number | '',
  opts: { decimalScale: number; thousandSeparator: boolean },
): string {
  if (value === '' || value === null || value === undefined) return ''
  const num = typeof value === 'number' ? value : parseFloat(String(value))
  if (isNaN(num)) return ''
  return opts.thousandSeparator
    ? num.toLocaleString('en-US', {
        minimumFractionDigits: opts.decimalScale,
        maximumFractionDigits: opts.decimalScale,
      })
    : num.toFixed(opts.decimalScale)
}

function parseRaw(raw: string, allowNegative: boolean): number | '' {
  const cleaned = raw.replace(/,/g, '').trim()
  if (!cleaned) return ''
  if (!allowNegative && cleaned.startsWith('-')) return ''
  const num = parseFloat(cleaned)
  return isNaN(num) ? '' : num
}

export function NumberField({
  name,
  value,
  onChange,
  placeholder,
  label,
  disabled = false,
  error,
  prefix,
  min,
  max,
  decimalScale = 2,
  allowNegative = true,
  thousandSeparator = true,
  fullWidth = true,
  required = false,
  id,
}: NumberFieldProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [inputStr, setInputStr] = useState(
    formatDisplay(value, { decimalScale, thousandSeparator }),
  )

  useEffect(() => {
    if (!isFocused) {
      setInputStr(formatDisplay(value, { decimalScale, thousandSeparator }))
    }
  }, [value, isFocused, decimalScale, thousandSeparator])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setInputStr(raw)
    let parsed = parseRaw(raw, allowNegative)
    if (parsed !== '' && min !== undefined && parsed < min) parsed = min
    if (parsed !== '' && max !== undefined && parsed > max) parsed = max
    onChange(parsed)
  }

  const handleFocus = () => {
    setIsFocused(true)
    setInputStr(value === '' ? '' : String(value))
  }

  const handleBlur = () => {
    setIsFocused(false)
    const parsed = parseRaw(inputStr, allowNegative)
    onChange(parsed)
    setInputStr(formatDisplay(parsed, { decimalScale, thousandSeparator }))
  }

  const errorId = `${name}-error`
  const hasError = Boolean(error)

  return (
    <div className={styles.root}>
      <TextField
        id={id ?? name}
        name={name}
        value={inputStr}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        label={label}
        disabled={disabled}
        error={hasError}
        fullWidth={fullWidth}
        required={required}
        size="small"
        variant="outlined"
        slotProps={{
          htmlInput: {
            inputMode: 'numeric',
            'aria-describedby': hasError ? errorId : undefined,
          },
          input: prefix
            ? { startAdornment: <InputAdornment position="start">{prefix}</InputAdornment> }
            : undefined,
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
