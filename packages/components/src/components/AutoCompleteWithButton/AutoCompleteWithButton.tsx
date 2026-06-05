import React from 'react'
import {
  Autocomplete,
  TextField,
  FormHelperText,
  Chip,
  Box,
} from '@mui/material'
import { Button } from '../Button/Button'
import styles from './AutoCompleteWithButton.module.css'

export interface SelectOption {
  value: string
  label: string
}

export interface AutoCompleteWithButtonProps {
  name: string
  value: SelectOption | SelectOption[] | null
  onChange: (value: SelectOption | SelectOption[] | null) => void
  options: SelectOption[]
  placeholder?: string
  label?: string
  disabled?: boolean
  error?: string
  multiple?: boolean
  buttonLabel: string
  onButtonClick: () => void
  buttonLoading?: boolean
  required?: boolean
  fullWidth?: boolean
  id?: string
}

export function AutoCompleteWithButton({
  name,
  value,
  onChange,
  options,
  placeholder,
  label,
  disabled = false,
  error,
  multiple = false,
  buttonLabel,
  onButtonClick,
  buttonLoading = false,
  required = false,
  fullWidth = true,
  id,
}: AutoCompleteWithButtonProps) {
  const errorId = `${name}-error`
  const hasError = Boolean(error)

  return (
    <div className={styles.root}>
      <Box className={styles.inputRow}>
        <Autocomplete
          id={id ?? name}
          value={value}
          onChange={(_, newValue) => onChange(newValue)}
          options={options}
          getOptionLabel={(opt) => opt.label}
          isOptionEqualToValue={(opt, val) => opt.value === val.value}
          multiple={multiple}
          disabled={disabled}
          fullWidth={fullWidth}
          className={styles.autocomplete}
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
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onButtonClick}
          disabled={disabled}
          loading={buttonLoading}
          className={styles.button}
        >
          {buttonLabel}
        </Button>
      </Box>
      {hasError && (
        <FormHelperText error id={errorId} role="alert" className={styles.errorText}>
          {error}
        </FormHelperText>
      )}
    </div>
  )
}
