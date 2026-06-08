import React from 'react'
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
} from '@mui/material'
import styles from './RadioButton.module.scss'

export interface RadioOption {
  value: string
  label: string
}

export interface RadioButtonProps {
  /** Input group name — must be unique on the page */
  name: string
  /** Currently selected value */
  value: string
  /** Available options */
  options: RadioOption[]
  /** Disables all radio inputs */
  disabled?: boolean
  /** Called with the new selected value */
  onChange: (value: string) => void
  /** Optional group label rendered above the radios */
  label?: string
  /** Lay options out horizontally */
  row?: boolean
  /** Validation error message */
  error?: string
}

const RadioButton = ({
  name,
  value,
  options,
  disabled = false,
  onChange,
  label,
  row = false,
  error,
}: RadioButtonProps) => {
  const hasError = Boolean(error)

  return (
    <FormControl
      component="fieldset"
      error={hasError}
      disabled={disabled}
      className={styles.root}
    >
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <RadioGroup
        row={row}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={name}
        className={styles.group}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio color="primary" size="small" />}
            label={option.label}
            className={styles.item}
          />
        ))}
      </RadioGroup>
      {hasError && (
        <FormHelperText role="alert">{error}</FormHelperText>
      )}
    </FormControl>
  )
}

export default RadioButton
