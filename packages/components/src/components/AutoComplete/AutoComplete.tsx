import React from 'react'
import {
  Autocomplete,
  TextField,
  FormHelperText,
  Chip,
} from '@mui/material'
import styles from './AutoComplete.module.scss'

export interface SelectOption {
  value: string
  label: string
}

export interface AutoCompleteProps {
  name: string
  value: SelectOption | SelectOption[] | null
  onChange: (value: SelectOption | SelectOption[] | null) => void
  options: SelectOption[]
  placeholder?: string
  label?: string
  disabled?: boolean
  error?: string
  multiple?: boolean
  clearable?: boolean
  loading?: boolean
  required?: boolean
  fullWidth?: boolean
  id?: string
}

const AutoComplete = ({
  name,
  value,
  onChange,
  options,
  placeholder,
  label,
  disabled = false,
  error,
  multiple = false,
  clearable = true,
  loading = false,
  required = false,
  fullWidth = true,
  id,
}: AutoCompleteProps) => {
  const errorId = `${name}-error`
  const hasError = Boolean(error)

  return (
    <div className={styles.root}>
      <Autocomplete
        id={id ?? name}
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        options={options}
        getOptionLabel={(opt) => (typeof opt === 'string' ? opt : opt.label)}
        isOptionEqualToValue={(opt, val) => opt.value === val.value}
        multiple={multiple}
        disableClearable={!clearable}
        disabled={disabled}
        loading={loading}
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

export default AutoComplete
