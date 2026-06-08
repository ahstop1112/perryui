import React from 'react'
import { Grid } from '@mui/material'
import FormInputs from './FormInputs'
import Multiple from './Multiple'
import styles from './DynamicForm.module.scss'
import type { FormField, FormSection } from './types'

export interface SectionBodyProps {
  section: FormSection
  sectionKey: string
  pageAction?: string
  disabled?: boolean
  renderField: (field: FormField, sectionKey: string, parentField?: string) => React.ReactNode
  onMultipleAdd?: (fieldName: string, sectionKey: string) => void
  onMultipleRemove?: (fieldName: string, sectionKey: string, subItemKey: string) => void
}

const SectionBody = ({
  section,
  sectionKey,
  pageAction,
  disabled,
  renderField,
  onMultipleAdd,
  onMultipleRemove,
}: SectionBodyProps) => {
  const { fields } = section

  const shownFields = Object.keys(fields).filter(
    key => fields[key].isShown !== false && typeof fields[key] === 'object'
  )

  return (
    <Grid container item xs={12} className={styles.sectionBody}>
      {shownFields.map(fieldKey => {
        const field = fields[fieldKey]

        if (field.type === 'multiple') {
          return (
            <Grid key={fieldKey} container item xs={12} className={styles.fieldItem}>
              <Multiple
                field={field}
                sectionKey={sectionKey}
                pageAction={pageAction}
                disabled={disabled}
                renderField={renderField}
                onAdd={onMultipleAdd ?? (() => {})}
                onRemove={onMultipleRemove ?? (() => {})}
              />
            </Grid>
          )
        }

        return (
          <Grid
            key={fieldKey}
            container
            item
            xl={field.layoutGrid?.xl}
            lg={field.layoutGrid?.lg}
            md={field.layoutGrid?.md}
            sm={field.layoutGrid?.sm}
            xs={field.layoutGrid?.xs ?? 12}
            className={styles.fieldItem}
          >
            <FormInputs
              field={field}
              sectionKey={sectionKey}
              pageAction={pageAction}
              renderField={renderField}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default SectionBody
