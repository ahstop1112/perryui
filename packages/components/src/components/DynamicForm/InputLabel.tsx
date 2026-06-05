import React from 'react'
import { Tooltip } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined'
import styles from './DynamicForm.module.css'

export interface InputLabelProps {
  label: string
  isRequired?: boolean
  isPreview?: boolean
  isValid?: boolean
  isTouched?: boolean
  tooltipText?: string
  remarks?: string
  htmlFor?: string
}

export function InputLabel({
  label,
  isRequired = false,
  isPreview = false,
  isValid = true,
  isTouched = false,
  tooltipText,
  remarks,
  htmlFor,
}: InputLabelProps) {
  const hasError = isTouched && !isValid

  return (
    <div className={`${styles.labelContainer} ${remarks ? styles.labelSpaceBetween : ''}`}>
      <label
        htmlFor={htmlFor ?? label}
        className={`${styles.label} ${hasError ? styles.labelError : ''}`}
      >
        {label}
        {isRequired && !isPreview ? ' *' : ''}
      </label>
      {tooltipText && !isPreview && (
        <Tooltip arrow disableFocusListener placement="right" title={tooltipText}>
          <HelpOutlineIcon className={styles.tooltipIcon} />
        </Tooltip>
      )}
      {remarks && !isPreview && (
        <span className={styles.remarks}>({remarks})</span>
      )}
    </div>
  )
}
