export interface LayoutGrid {
  xl?: number
  lg?: number
  md?: number
  sm?: number
  xs?: number
}

export interface FormField {
  name: string
  type: string
  label?: string
  value?: unknown
  isShown?: boolean
  isRequired?: boolean
  isEnabled?: boolean
  isTouched?: boolean
  isValid?: boolean
  isPreview?: boolean
  showLabel?: boolean
  errorMsg?: string
  tooltipText?: string
  remarks?: string
  layoutGrid?: LayoutGrid
  /** For 'multiple' type fields - repeatable sub-groups */
  multiple?: Record<string, Record<string, FormField>>
  /** For 'multipleChild' type fields */
  multipleChild?: Record<string, Record<string, FormField>>
  /** Max sub-items in a multiple group */
  maxLength?: number
  /** Whether the first sub-item can be removed */
  removeFirstOne?: boolean
  canAdd?: boolean
  hideButtons?: boolean
  showItemTitle?: boolean
  [key: string]: unknown
}

export interface FormSection {
  title?: string
  fields: Record<string, FormField>
  /** Optional field group key - fields with same value of this key are grouped under a header */
  fieldGroup?: string
}

export interface FormLayout {
  type: 'default' | 'accordion' | 'steps' | 'inline'
  /** Section keys to show */
  isSectionShown?: string[]
  /** Section keys expanded by default (accordion only) */
  isSectionExpanded?: string[]
}

export interface FormSchema {
  layout: FormLayout
  [sectionKey: string]: FormSection | FormLayout
}

export type ActionType =
  | 'SUBMIT' | 'SAVE' | 'APPROVE' | 'REJECT' | 'CANCEL'
  | 'TERMINATE' | 'RETURN' | 'RETURN_FOR_REJECT' | 'INIT_RETURN'
  | 'DELETE' | 'RELEASE' | 'WITHDRAW' | 'RELEASE_AS_MGR'
  | 'EVALUATION' | 'EVALUATE' | 'REQUEST_INFO' | 'BULK_ASSIGN'
  | 'STOP_EVALUATE' | string
