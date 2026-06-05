export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'date'
  | 'datetime'
  | 'dateRange'
  | 'dropdown'
  | 'dropdownFreeText'
  | 'radio'
  | 'checkbox'
  | 'switcher'
  | 'button'
  | 'notice'
  | 'subTitle'
  | 'tagline'
  | 'multiple'

export interface SelectOption {
  value: string
  label: string
}

export interface DateRangeValue {
  startDate: string
  endDate: string
}

export interface FormField {
  name: string
  type: FieldType
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  options?: SelectOption[]
  span?: { xs?: number; sm?: number; md?: number; lg?: number }
  tooltipText?: string
  remarks?: string
  multiple?: FormField[]
  maxItems?: number
  noticeContent?: string
}

export interface FormSection {
  title?: string
  fields: FormField[]
}

export type DynamicFormLayout = 'standard' | 'accordion' | 'steps' | 'inline'

export interface DynamicFormProps {
  id: string
  sections: FormSection[]
  layout?: DynamicFormLayout
  initialValues?: Record<string, unknown>
  onSubmit: (values: Record<string, unknown>) => void
  onCancel?: () => void
  submitLabel?: string
  cancelLabel?: string
  loading?: boolean
  readOnly?: boolean
  errors?: Record<string, string>
}
