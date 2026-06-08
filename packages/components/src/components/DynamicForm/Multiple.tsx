import React from 'react'
import { Grid, Button } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import FormInputs from './FormInputs'
import styles from './DynamicForm.module.scss'
import type { FormField } from './types'

export interface MultipleProps {
  field: FormField
  sectionKey: string
  pageAction?: string
  disabled?: boolean
  renderField: (field: FormField, sectionKey: string, parentField?: string) => React.ReactNode
  onAdd: (fieldName: string, sectionKey: string) => void
  onRemove: (fieldName: string, sectionKey: string, subItemKey: string) => void
}

const Multiple = ({
  field,
  sectionKey,
  pageAction,
  disabled = false,
  renderField,
  onAdd,
  onRemove,
}: MultipleProps) => {
  const {
    name = '',
    label = '',
    hideButtons = false,
    multiple = {},
    removeFirstOne = false,
    canAdd = true,
    maxLength,
    showLabel = true,
    showItemTitle = true,
  } = field

  const isView = pageAction === 'view'
  const subItems = Object.keys(multiple)
  const atMax = maxLength != null && subItems.length >= maxLength

  return (
    <Grid container item xs={12} className={styles.multipleSection}>
      <Grid container item xs={12} className={styles.multipleHeader} alignItems="center">
        <Grid item xs={8}>
          {showLabel && label && <h4 className={styles.multipleLabel}>{label}</h4>}
        </Grid>
        <Grid item xs={4} container justifyContent="flex-end">
          {!isView && !hideButtons && (
            <Button
              size="small"
              variant="contained"
              className={styles.addButton}
              disabled={!canAdd || atMax || disabled}
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
            {showItemTitle && (
              <Grid item xs={8}>
                <span className={styles.multipleItemTitle}>
                  {label ? `${label} ${subIndex + 1}` : `Item ${subIndex + 1}`}
                </span>
              </Grid>
            )}
            {!isView && !hideButtons && (removeFirstOne || subIndex > 0) && (
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
            {Object.keys(multiple[subItemKey])
              .filter(subInput => multiple[subItemKey][subInput].isShown !== false)
              .map(subInput => {
                const subField = multiple[subItemKey][subInput]
                return (
                  <Grid
                    key={subInput}
                    container
                    item
                    xl={subField.layoutGrid?.xl}
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
                      renderField={(f, s) => renderField(f, s, name)}
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

export default Multiple
