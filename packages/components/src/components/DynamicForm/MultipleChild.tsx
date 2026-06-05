import React from 'react'
import { Grid, Button } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { FormInputs } from './FormInputs'
import styles from './DynamicForm.module.css'
import type { FormField } from './types'

export interface MultipleChildProps {
  field: FormField
  sectionKey: string
  grandParentField: string
  pageAction?: string
  disabled?: boolean
  renderField: (
    field: FormField,
    sectionKey: string,
    parentField?: string,
    grandParentField?: string
  ) => React.ReactNode
  onAdd: (fieldName: string, sectionKey: string) => void
  onRemove: (fieldName: string, sectionKey: string, subItemKey: string) => void
}

export function MultipleChild({
  field,
  sectionKey,
  grandParentField,
  pageAction,
  disabled = false,
  renderField,
  onAdd,
  onRemove,
}: MultipleChildProps) {
  const { name = '', label = '', multipleChild = {} } = field
  const isView = pageAction === 'view'
  const subItems = Object.keys(multipleChild)

  return (
    <Grid container item xs={12} className={styles.multipleChildSection}>
      <Grid container item xs={12} alignItems="center">
        <Grid item xs={8}>
          {label && <h4 className={styles.multipleLabel}>{label}</h4>}
        </Grid>
        <Grid item xs={4} container justifyContent="flex-end">
          {!isView && (
            <Button
              size="small"
              variant="contained"
              className={styles.addButton}
              disabled={disabled}
              onClick={() => onAdd(name, sectionKey)}
              startIcon={<Add />}
            >
              Add
            </Button>
          )}
        </Grid>
      </Grid>

      {subItems.map((subItemKey, subIndex) => (
        <Grid container item xs={12} key={subItemKey} className={styles.multipleItem}>
          <Grid container item xs={12} justifyContent="space-between" alignItems="center">
            <Grid item xs={8}>
              <span className={styles.multipleItemTitle}>
                {label ? `${label} ${subIndex + 1}` : `Item ${subIndex + 1}`}
              </span>
            </Grid>
            {!isView && subIndex > 0 && (
              <Grid item xs={4} container justifyContent="flex-end">
                <Button
                  size="small"
                  variant="outlined"
                  className={styles.removeButton}
                  onClick={() => onRemove(name, sectionKey, subItemKey)}
                  startIcon={<Remove />}
                >
                  Remove
                </Button>
              </Grid>
            )}
          </Grid>

          <Grid container item xs={12}>
            {Object.keys(multipleChild[subItemKey])
              .filter(subInput => {
                const f = multipleChild[subItemKey][subInput]
                return f.isShown !== false && typeof f === 'object' && f !== null
              })
              .map(subInput => {
                const subField = multipleChild[subItemKey][subInput]
                return (
                  <Grid
                    key={subInput}
                    container
                    item
                    lg={subField.layoutGrid?.lg}
                    md={subField.layoutGrid?.md}
                    sm={subField.layoutGrid?.sm}
                    xs={subField.layoutGrid?.xs ?? 12}
                    className={styles.fieldItem}
                  >
                    <FormInputs
                      field={subField}
                      sectionKey={sectionKey}
                      pageAction={pageAction}
                      renderField={(f, s) => renderField(f, s, name, grandParentField)}
                    />
                  </Grid>
                )
              })}
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
