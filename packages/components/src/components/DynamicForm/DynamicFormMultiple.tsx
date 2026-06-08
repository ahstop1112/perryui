import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import type { FormField } from './DynamicForm.types'
import DynamicFormInputs from './DynamicFormInputs'
import styles from './DynamicFormMultiple.module.scss'

export interface MultipleItem {
  [key: string]: unknown
}

export interface DynamicFormMultipleProps {
  field: FormField
  items: MultipleItem[]
  onAdd: () => void
  onRemove: (index: number) => void
  onChange: (index: number, fieldName: string, value: unknown) => void
  readOnly?: boolean
  errors?: Record<string, string>
}

const DynamicFormMultiple = ({
  field,
  items,
  onAdd,
  onRemove,
  onChange,
  readOnly,
  errors,
}: DynamicFormMultipleProps) => {
  const subFields = field.multiple ?? []
  const canAdd = !readOnly && (field.maxItems === undefined || items.length < field.maxItems)

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        {field.label && (
          <Typography variant="subtitle2" fontWeight={600}>
            {field.label}
          </Typography>
        )}
        {canAdd && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={onAdd}
            aria-label={`Add ${field.label ?? 'item'}`}
          >
            Add {field.label}
          </Button>
        )}
      </Box>

      {items.map((item, i) => (
        <Box
          key={i}
          className={styles.item}
          sx={{ borderBottomColor: 'divider' }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {field.label} {i + 1}
            </Typography>
            {!readOnly && items.length > 1 && (
              <IconButton
                size="small"
                aria-label={`Remove ${field.label ?? 'item'} ${i + 1}`}
                onClick={() => onRemove(i)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
          <Grid container spacing={1}>
            {subFields.map((subField) => (
              <Grid
                key={subField.name}
                item
                xs={subField.span?.xs ?? 12}
                sm={subField.span?.sm}
                md={subField.span?.md}
                lg={subField.span?.lg}
              >
                <DynamicFormInputs
                  field={subField}
                  value={item[subField.name] ?? ''}
                  onChange={(name, value) => onChange(i, name, value)}
                  readOnly={readOnly}
                  error={errors?.[`${subField.name}_${i}`]}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  )
}

export default DynamicFormMultiple
