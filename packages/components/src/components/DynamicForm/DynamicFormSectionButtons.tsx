import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

export interface DynamicFormSectionButtonsProps {
  onSubmit: () => void
  onCancel?: () => void
  submitLabel?: string
  cancelLabel?: string
  loading?: boolean
  disabled?: boolean
}

const DynamicFormSectionButtons = ({
  onSubmit,
  onCancel,
  submitLabel,
  cancelLabel,
  loading,
  disabled,
}: DynamicFormSectionButtonsProps) => {
  return (
    <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
      {onCancel && (
        <Button variant="outlined" onClick={onCancel} disabled={loading}>
          {cancelLabel ?? 'Cancel'}
        </Button>
      )}
      <Button
        variant="contained"
        onClick={onSubmit}
        disabled={loading || disabled}
      >
        {loading ? <CircularProgress size={16} /> : (submitLabel ?? 'Submit')}
      </Button>
    </Box>
  )
}

export default DynamicFormSectionButtons
