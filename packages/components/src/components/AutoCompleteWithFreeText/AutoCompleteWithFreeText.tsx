import React from 'react'
import { Autocomplete, TextField, FormHelperText, Chip, createFilterOptions } from '@mui/material'
import styles from './AutoCompleteWithFreeText.module.css'

export interface SelectOption {
  value: string
  label: string
  inputValue?: string
}

export interface AutoCompleteWithFreeTextProps {
  name: string
  value: string | SelectOption | null
  onChange: (value: string | SelectOption | null) => void
  options: SelectOption[]
  placeholder?: string
  label?: string
  disabled?: boolean
  error?: string
  multiple?: boolean
  required?: boolean
  fullWidth?: boolean
  id?: string
}

const filter = createFilterOptions<SelectOption>()

export function AutoCompleteWithFreeText({
  name,
  value,
  onChange,
  options,
  placeholder,
  label,
  disabled = false,
  error,
  multiple = false,
  required = false,
  fullWidth = true,
  id,
}: AutoCompleteWithFreeTextProps) {
  const errorId = `${name}-error`
  const hasError = Boolean(error)

  return (
    <div className={styles.root}>
      <Autocomplete
        id={id ?? name}
        value={value}
        onChange={(_, newValue) => {
          if (typeof newValue === 'string') {
            onChange(newValue)
          } else if (newValue && 'inputValue' in newValue) {
            onChange(newValue.inputValue ?? newValue.label)
          } else {
            onChange(newValue)
          }
        }}
        filterOptions={(opts, params) => {
          const filtered = filter(opts, params)
          const { inputValue } = params
          const isExisting = opts.some((o) => inputValue === o.label)
          if (inputValue !== '' && !isExisting) {
            filtered.push({ inputValue, label: `Add "${inputValue}"`, value: inputValue })
          }
          return filtered
        }}
        options={options}
        getOptionLabel={(opt) => {
          if (typeof opt === 'string') return opt
          if (opt.inputValue) return opt.inputValue
          return opt.label
        }}
        isOptionEqualToValue={(opt, val) =>
          typeof val === 'string' ? opt.value === val : opt.value === val.value
        }
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo
        multiple={multiple}
        disabled={disabled}
        fullWidth={fullWidth}
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
          (tagValue as SelectOption[]).map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={typeof option === 'string' ? option : option.value}
              label={typeof option === 'string' ? option : option.label}
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
