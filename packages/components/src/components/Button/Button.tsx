import React from 'react'
import { Button as MuiButton, CircularProgress } from '@mui/material'
import styles from './Button.module.scss'

export interface ButtonProps {
  /** Visual style variant */
  variant?: 'contained' | 'outlined' | 'ghost'
  /** Size preset */
  size?: 'small' | 'medium' | 'large'
  /** Semantic color role */
  color?: 'primary' | 'secondary' | 'success' | 'error'
  /** Shows a spinner and disables interaction */
  loading?: boolean
  /** Disables the button */
  disabled?: boolean
  /** Expands to full container width */
  fullWidth?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  children?: React.ReactNode
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}

const MUI_VARIANT_MAP: Record<
  NonNullable<ButtonProps['variant']>,
  'contained' | 'outlined' | 'text'
> = {
  contained: 'contained',
  outlined: 'outlined',
  ghost: 'text',
}

const SPINNER_SIZE: Record<NonNullable<ButtonProps['size']>, number> = {
  small: 14,
  medium: 16,
  large: 20,
}

const Button = ({
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  children,
  startIcon,
  endIcon,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) => {
  const isDisabled = disabled || loading

  return (
    <MuiButton
      variant={MUI_VARIANT_MAP[variant]}
      size={size}
      color={color}
      disabled={isDisabled}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      className={styles.button}
      startIcon={loading ? undefined : startIcon}
      endIcon={loading ? undefined : endIcon}
    >
      {loading && (
        <span className={styles.spinnerWrapper} aria-hidden="true">
          <CircularProgress size={SPINNER_SIZE[size]} color="inherit" />
        </span>
      )}
      <span className={loading ? styles.hiddenLabel : undefined}>
        {children}
      </span>
    </MuiButton>
  )
}

export default Button
