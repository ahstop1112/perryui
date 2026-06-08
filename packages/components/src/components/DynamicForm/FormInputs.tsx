import React from 'react'
import InputLabel from './InputLabel'
import styles from './DynamicForm.module.scss'
import type { FormField } from './types'

export interface FormInputsProps {
  field: FormField
  sectionKey: string
  renderField: (field: FormField, sectionKey: string) => React.ReactNode
  pageAction?: string
}

const STRUCTURAL_TYPES = new Set([
  'notice', 'subTitle', 'subSubTitle', 'subSubSubTitle',
  'sectionHeader', 'tagline', 'descNoLabel', 'descHasLabel',
])

const NO_LABEL_TYPES = new Set([
  'notice', 'sectionHeader', 'subTitle', 'subSubTitle',
  'subSubSubTitle', 'tagline', 'descHasLabel', 'descNoLabel',
])

const FormInputs = ({ field, sectionKey, renderField, pageAction }: FormInputsProps) => {
  const {
    label = '',
    type = 'text',
    showLabel = true,
    isPreview = false,
    isRequired = false,
    isValid = true,
    isTouched = false,
    tooltipText = '',
    remarks = '',
    name,
  } = field

  const showInputLabel =
    label &&
    showLabel &&
    !NO_LABEL_TYPES.has(type) &&
    !isPreview

  const showPreviewLabel =
    isPreview &&
    !NO_LABEL_TYPES.has(type)

  return (
    <div className={styles.fieldWrapper}>
      {(showInputLabel || showPreviewLabel) && (
        <InputLabel
          label={label}
          isRequired={isRequired}
          isPreview={isPreview}
          isValid={isValid}
          isTouched={isTouched}
          tooltipText={tooltipText}
          remarks={remarks}
          htmlFor={name}
        />
      )}
      <div className={styles.fieldInput}>
        {renderField(field, sectionKey)}
      </div>
    </div>
  )
}

export default FormInputs
