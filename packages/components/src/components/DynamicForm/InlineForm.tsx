import React from 'react'
import { Grid } from '@mui/material'
import SectionBody from './SectionBody'
import SectionButtons from './SectionButtons'
import styles from './DynamicForm.module.scss'
import type { FormField, FormSchema, FormSection } from './types'

export interface InlineFormProps {
  schema: FormSchema
  sectionKeys: string[]
  pageAction?: string
  disabled?: boolean
  actionTypes?: string[]
  isLoading?: boolean
  renderField: (field: FormField, sectionKey: string, parentField?: string) => React.ReactNode
  onSubmit: (action: string) => void
  onCancel?: () => void
  onMultipleAdd?: (fieldName: string, sectionKey: string) => void
  onMultipleRemove?: (fieldName: string, sectionKey: string, subItemKey: string) => void
}

const InlineForm = ({
  schema,
  sectionKeys,
  pageAction,
  disabled,
  actionTypes = [],
  isLoading,
  renderField,
  onSubmit,
  onCancel,
  onMultipleAdd,
  onMultipleRemove,
}: InlineFormProps) => {
  return (
    <>
      {sectionKeys.map(key => {
        const section = schema[key] as FormSection
        if (!section?.fields) return null
        return (
          <Grid key={key} container item xs={12} className={styles.section}>
            <SectionBody
              section={section}
              sectionKey={key}
              pageAction={pageAction}
              disabled={disabled}
              renderField={renderField}
              onMultipleAdd={onMultipleAdd}
              onMultipleRemove={onMultipleRemove}
            />
          </Grid>
        )
      })}
      {actionTypes.length > 0 && (
        <SectionButtons
          actionTypes={actionTypes}
          pageAction={pageAction}
          isLoading={isLoading}
          disabled={disabled}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      )}
    </>
  )
}

export default InlineForm
