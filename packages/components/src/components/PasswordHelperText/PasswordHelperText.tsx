import React from 'react'
import { Box, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import styles from './PasswordHelperText.module.scss'

export interface PasswordHelperTextProps {
  label: string
  success?: boolean | null
  hasInput?: boolean
}

const PasswordHelperText = ({
  label,
  success = null,
  hasInput = false,
}: PasswordHelperTextProps) => {
  const renderIcon = () => {
    if (!hasInput) {
      return (
        <RadioButtonUncheckedIcon
          fontSize="inherit"
          sx={{ color: 'text.disabled', fontSize: '0.875rem' }}
          aria-hidden="true"
        />
      )
    }
    if (success) {
      return (
        <CheckCircleIcon
          fontSize="inherit"
          sx={{ color: 'success.main', fontSize: '0.875rem' }}
          aria-hidden="true"
        />
      )
    }
    return (
      <CancelIcon
        fontSize="inherit"
        sx={{ color: 'error.main', fontSize: '0.875rem' }}
        aria-hidden="true"
      />
    )
  }

  const textColor = hasInput
    ? success
      ? 'success.main'
      : 'error.main'
    : 'text.disabled'

  return (
    <Box className={styles.row} display="flex" alignItems="center" gap={0.5} mt={0.5}>
      {renderIcon()}
      <Typography variant="caption" sx={{ color: textColor }}>
        {label}
      </Typography>
    </Box>
  )
}

export default PasswordHelperText
