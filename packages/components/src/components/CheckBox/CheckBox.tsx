import React from 'react'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormControl,
} from '@mui/material'
import styles from './CheckBox.module.scss'

export interface CheckboxOption {
  /** Unique key used as the input name attribute */
  name: string
  /** Display label */
  label: string
  /** Whether this option is checked */
  checked: boolean
}

export interface CheckBoxProps {
  /** Field group name */
  name: string
  /** List of checkbox options */
  options: CheckboxOption[]
  /** Disables all checkboxes */
  disabled?: boolean
  /** Called with (optionName, newChecked) on change */
  onChange: (name: string, checked: boolean) => void
  /** Validation error message */
  error?: string
  /** Number of columns to lay out options in */
  columns?: 1 | 2 | 3 | 4 | 6
}

const COLUMN_CLASS: Record<NonNullable<CheckBoxProps['columns']>, string> = {
  1: styles.col1,
  2: styles.col2,
  3: styles.col3,
  4: styles.col4,
  6: styles.col6,
}

const CheckBox = ({
  name,
  options,
  disabled = false,
  onChange,
  error,
  columns = 1,
}: CheckBoxProps) => {
  const hasError = Boolean(error)

  return (
    <FormControl
      component="fieldset"
      error={hasError}
      disabled={disabled}
      className={styles.root}
    >
      <FormGroup className={styles.group} aria-label={name}>
        {options.map((option) => (
          <FormControlLabel
            key={option.name}
            className={`${styles.item} ${COLUMN_CLASS[columns]}`}
            control={
              <Checkbox
                checked={option.checked}
                name={option.name}
                onChange={(e) => onChange(option.name, e.target.checked)}
                color="primary"
                size="small"
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      {hasError && (
        <FormHelperText role="alert">{error}</FormHelperText>
      )}
    </FormControl>
  )
}

export default CheckBox
