import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined'
import styles from './DynamicFormInputLabel.module.css'

export interface DynamicFormInputLabelProps {
  label: string
  required?: boolean
  readOnly?: boolean
  tooltipText?: string
  remarks?: string
  htmlFor?: string
}

export function DynamicFormInputLabel({
  label,
  required,
  readOnly,
  tooltipText,
  remarks,
  htmlFor,
}: DynamicFormInputLabelProps) {
  return (
    <Box className={styles.root}>
      <label
        htmlFor={htmlFor}
        style={{ fontSize: '0.75rem', color: 'inherit', lineHeight: 1.5 }}
      >
        <Box component="span" sx={{ fontSize: '0.75rem', color: 'text.secondary', lineHeight: 1.5 }}>
          {label}
          {required && !readOnly && ' *'}
        </Box>
      </label>
      {tooltipText && !readOnly && (
        <Tooltip title={tooltipText}>
          <HelpOutlineIcon fontSize="small" sx={{ color: 'text.secondary', cursor: 'help' }} />
        </Tooltip>
      )}
      {remarks && !readOnly && (
        <Typography variant="caption" color="text.disabled">
          ({remarks})
        </Typography>
      )}
    </Box>
  )
}
