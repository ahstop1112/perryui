import React from 'react'
import { Switch, FormControlLabel } from '@mui/material'
import styles from './Switcher.module.css'

export interface SwitcherProps {
  /** Input name attribute */
  name: string
  /** Whether the switch is on */
  checked: boolean
  /** Disables the switch */
  disabled?: boolean
  /** Called with the new checked value */
  onChange: (checked: boolean) => void
  /** Optional label rendered beside the switch */
  label?: string
  /** Size of the switch */
  size?: 'small' | 'medium'
}

export function Switcher({
  name,
  checked,
  disabled = false,
  onChange,
  label,
  size = 'medium',
}: SwitcherProps) {
  const switchEl = (
    <Switch
      name={name}
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
      color="primary"
      size={size}
      inputProps={{ 'aria-label': label ?? name }}
      className={styles.switch}
    />
  )

  if (label) {
    return (
      <FormControlLabel
        control={switchEl}
        label={label}
        className={styles.root}
        sx={{ color: 'text.secondary' }}
      />
    )
  }

  return <span className={styles.root}>{switchEl}</span>
}
