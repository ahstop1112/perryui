import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export interface FormAction {
  key: string
  label: string
  variant?: 'contained' | 'outlined' | 'text'
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success'
}

export interface DynamicFormActionButtonsProps {
  actions: FormAction[]
  onAction: (actionKey: string) => void
  loading?: boolean
  disabled?: boolean
}

export function DynamicFormActionButtons({
  actions,
  onAction,
  loading,
  disabled,
}: DynamicFormActionButtonsProps) {
  return (
    <Box display="flex" gap={1} flexWrap="wrap">
      {actions.map((action) => (
        <Button
          key={action.key}
          variant={action.variant ?? 'outlined'}
          color={action.color ?? 'primary'}
          disabled={loading || disabled}
          onClick={() => onAction(action.key)}
        >
          {action.label}
        </Button>
      ))}
    </Box>
  )
}
