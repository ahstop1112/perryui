import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import type { FormField, DateRangeValue, SelectOption } from './DynamicForm.types'
import { DynamicFormInputLabel } from './DynamicFormInputLabel'

export interface DynamicFormInputsProps {
  field: FormField
  value: unknown
  onChange: (name: string, value: unknown) => void
  readOnly?: boolean
  error?: string
}

function renderInput(
  field: FormField,
  value: unknown,
  onChange: (name: string, value: unknown) => void,
  readOnly?: boolean,
  error?: string
): React.ReactNode {
  const isDisabled = readOnly || field.disabled

  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
      return (
        <TextField
          id={field.name}
          type={field.type}
          value={String(value ?? '')}
          onChange={(e) => onChange(field.name, e.target.value)}
          error={!!error}
          helperText={error}
          disabled={isDisabled}
          size="small"
          fullWidth
          placeholder={field.placeholder}
        />
      )

    case 'number':
      return (
        <TextField
          id={field.name}
          type="number"
          value={String(value ?? '')}
          onChange={(e) => onChange(field.name, e.target.value)}
          error={!!error}
          helperText={error}
          disabled={isDisabled}
          size="small"
          fullWidth
          placeholder={field.placeholder}
        />
      )

    case 'textarea':
      return (
        <TextField
          id={field.name}
          value={String(value ?? '')}
          onChange={(e) => onChange(field.name, e.target.value)}
          error={!!error}
          helperText={error}
          disabled={isDisabled}
          size="small"
          fullWidth
          multiline
          minRows={4}
          placeholder={field.placeholder}
        />
      )

    case 'date':
      return (
        <TextField
          id={field.name}
          type="date"
          value={String(value ?? '')}
          onChange={(e) => onChange(field.name, e.target.value)}
          error={!!error}
          helperText={error}
          disabled={isDisabled}
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          placeholder={field.placeholder}
        />
      )

    case 'datetime':
      return (
        <TextField
          id={field.name}
          type="datetime-local"
          value={String(value ?? '')}
          onChange={(e) => onChange(field.name, e.target.value)}
          error={!!error}
          helperText={error}
          disabled={isDisabled}
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          placeholder={field.placeholder}
        />
      )

    case 'dateRange': {
      const rangeValue = (value as DateRangeValue | undefined) ?? { startDate: '', endDate: '' }
      return (
        <Box display="flex" gap={1}>
          <TextField
            type="date"
            value={rangeValue.startDate}
            onChange={(e) =>
              onChange(field.name, { startDate: e.target.value, endDate: rangeValue.endDate })
            }
            error={!!error}
            disabled={isDisabled}
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            placeholder="Start date"
          />
          <TextField
            type="date"
            value={rangeValue.endDate}
            onChange={(e) =>
              onChange(field.name, { startDate: rangeValue.startDate, endDate: e.target.value })
            }
            error={!!error}
            helperText={error}
            disabled={isDisabled}
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            placeholder="End date"
          />
        </Box>
      )
    }

    case 'dropdown': {
      const options = field.options ?? []
      const selectedOption = options.find((o) => o.value === value) ?? null
      return (
        <Autocomplete<SelectOption>
          options={options}
          getOptionLabel={(o) => o.label}
          value={selectedOption}
          onChange={(_, v) => onChange(field.name, v?.value ?? '')}
          disabled={isDisabled}
          renderInput={(params) => (
            <TextField
              {...params}
              id={field.name}
              size="small"
              error={!!error}
              helperText={error}
              placeholder={field.placeholder}
            />
          )}
        />
      )
    }

    case 'dropdownFreeText': {
      const options = field.options ?? []
      return (
        <Autocomplete<SelectOption, false, false, true>
          freeSolo
          options={options}
          getOptionLabel={(o) => (typeof o === 'string' ? o : o.label)}
          value={String(value ?? '')}
          onInputChange={(_, v) => onChange(field.name, v)}
          disabled={isDisabled}
          renderInput={(params) => (
            <TextField
              {...params}
              id={field.name}
              size="small"
              error={!!error}
              helperText={error}
              placeholder={field.placeholder}
            />
          )}
        />
      )
    }

    case 'radio':
      return (
        <RadioGroup
          value={String(value ?? '')}
          onChange={(e) => onChange(field.name, e.target.value)}
        >
          {(field.options ?? []).map((o) => (
            <FormControlLabel
              key={o.value}
              value={o.value}
              control={<Radio />}
              label={o.label}
              disabled={isDisabled}
            />
          ))}
        </RadioGroup>
      )

    case 'checkbox': {
      const checkedValues = (value as string[] | undefined) ?? []
      return (
        <FormGroup>
          {(field.options ?? []).map((o) => (
            <FormControlLabel
              key={o.value}
              control={
                <Checkbox
                  checked={checkedValues.includes(o.value)}
                  onChange={(e) => {
                    const arr = checkedValues
                    onChange(
                      field.name,
                      e.target.checked ? [...arr, o.value] : arr.filter((x) => x !== o.value)
                    )
                  }}
                  disabled={isDisabled}
                />
              }
              label={o.label}
            />
          ))}
        </FormGroup>
      )
    }

    case 'switcher':
      return (
        <Switch
          checked={Boolean(value)}
          onChange={(e) => onChange(field.name, e.target.checked)}
          disabled={isDisabled}
          inputProps={{ 'aria-label': field.label ?? field.name }}
        />
      )

    case 'button':
      return (
        <Button
          variant="outlined"
          size="small"
          disabled={isDisabled}
          onClick={() => onChange(field.name, 'click')}
        >
          {field.label ?? 'Button'}
        </Button>
      )

    case 'notice':
      return (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {field.noticeContent ?? field.label}
        </Typography>
      )

    case 'subTitle':
      return <Typography variant="subtitle2">{field.label}</Typography>

    case 'tagline':
      return <Divider sx={{ my: 1 }} />

    case 'multiple':
      return null

    default:
      return null
  }
}

const noLabelTypes: Array<FormField['type']> = ['notice', 'subTitle', 'tagline', 'multiple', 'button']

export function DynamicFormInputs({
  field,
  value,
  onChange,
  readOnly,
  error,
}: DynamicFormInputsProps) {
  const inputNode = renderInput(field, value, onChange, readOnly, error)

  if (noLabelTypes.includes(field.type)) {
    return <>{inputNode}</>
  }

  return (
    <Box>
      <DynamicFormInputLabel
        label={field.label ?? ''}
        required={field.required}
        readOnly={readOnly}
        tooltipText={field.tooltipText}
        remarks={field.remarks}
        htmlFor={field.name}
      />
      {inputNode}
    </Box>
  )
}
