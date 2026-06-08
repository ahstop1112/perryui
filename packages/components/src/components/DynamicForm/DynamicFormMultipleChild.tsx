import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import type { FormField } from './DynamicForm.types'
import DynamicFormInputs from './DynamicFormInputs'
import styles from './DynamicFormMultipleChild.module.scss'

export interface MultipleChildItem {
  [key: string]: unknown
}

export interface DynamicFormMultipleChildProps {
  fields: FormField[]
  items: MultipleChildItem[]
  label?: string
  onAdd: () => void
  onRemove: (index: number) => void
  onChange: (index: number, fieldName: string, value: unknown) => void
  readOnly?: boolean
  maxItems?: number
  errors?: Record<string, string>
}

const DynamicFormMultipleChild = ({
  fields,
  items,
  label,
  onAdd,
  onRemove,
  onChange,
  readOnly,
  maxItems,
  errors,
}: DynamicFormMultipleChildProps) => {
  const canAdd = !readOnly && (maxItems === undefined || items.length < maxItems)

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        {label && (
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            {label}
          </Typography>
        )}
        {canAdd && (
          <Button
            size="small"
            variant="text"
            startIcon={<AddIcon />}
            onClick={onAdd}
          >
            Add
          </Button>
        )}
      </Box>

      {items.map((item, index) => (
        <Box
          key={index}
          className={styles.childSection}
          sx={{ borderColor: 'divider' }}
        >
          <Box display="flex" justifyContent="flex-end">
            {!readOnly && (
              <IconButton
                size="small"
                aria-label={`Remove item ${index + 1}`}
                onClick={() => onRemove(index)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
          {fields.map((field) => (
            <Box key={field.name} sx={{ mb: 1 }}>
              <DynamicFormInputs
                field={field}
                value={item[field.name] ?? ''}
                onChange={(name, value) => onChange(index, name, value)}
                readOnly={readOnly}
                error={errors?.[`${field.name}_${index}`]}
              />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}

export default DynamicFormMultipleChild
