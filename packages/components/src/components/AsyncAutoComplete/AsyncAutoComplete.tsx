import React, { useState, useEffect, useRef } from 'react'
import {
  Autocomplete,
  TextField,
  FormHelperText,
  Chip,
} from '@mui/material'
import styles from './AsyncAutoComplete.module.css'

export interface SelectOption {
  value: string
  label: string
}

export interface AsyncAutoCompleteProps {
  name: string
  value: SelectOption | SelectOption[] | null
  onChange: (value: SelectOption | SelectOption[] | null) => void
  loadOptions: (inputValue: string) => Promise<SelectOption[]>
  placeholder?: string
  label?: string
  disabled?: boolean
  error?: string
  multiple?: boolean
  debounceMs?: number
  minInputLength?: number
  required?: boolean
  fullWidth?: boolean
  id?: string
}

export function AsyncAutoComplete({
  name,
  value,
  onChange,
  loadOptions,
  placeholder,
  label,
  disabled = false,
  error,
  multiple = false,
  debounceMs = 500,
  minInputLength = 3,
  required = false,
  fullWidth = true,
  id,
}: AsyncAutoCompleteProps) {
  const [options, setOptions] = useState<SelectOption[]>([])
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (inputValue.length < minInputLength) {
      setOptions([])
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const result = await loadOptions(inputValue)
        setOptions(result)
      } finally {
        setLoading(false)
      }
    }, debounceMs)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [inputValue, minInputLength, debounceMs, loadOptions])

  const errorId = `${name}-error`
  const hasError = Boolean(error)

  return (
    <div className={styles.root}>
      <Autocomplete
        id={id ?? name}
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        inputValue={inputValue}
        onInputChange={(_, newInput) => setInputValue(newInput)}
        options={options}
        getOptionLabel={(opt) => (typeof opt === 'string' ? opt : opt.label)}
        isOptionEqualToValue={(opt, val) => opt.value === val.value}
        filterOptions={(x) => x}
        multiple={multiple}
        disabled={disabled}
        loading={loading}
        fullWidth={fullWidth}
        noOptionsText={
          inputValue.length < minInputLength
            ? `Type at least ${minInputLength} characters to search`
            : 'No options'
        }
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            placeholder={placeholder}
            label={label}
            error={hasError}
            required={required}
            size="small"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              'aria-describedby': hasError ? errorId : undefined,
            }}
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option.value}
              label={option.label}
              size="small"
            />
          ))
        }
        className={styles.autocomplete}
      />
      {hasError && (
        <FormHelperText error id={errorId} role="alert" className={styles.errorText}>
          {error}
        </FormHelperText>
      )}
    </div>
  )
}
