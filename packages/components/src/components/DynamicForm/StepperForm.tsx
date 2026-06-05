import React from 'react'
import { Grid, Box, Stepper, Step, StepLabel, Button, Typography } from '@mui/material'
import { SectionHeader } from './SectionHeader'
import { SectionBody } from './SectionBody'
import { SectionButtons } from './SectionButtons'
import styles from './DynamicForm.module.css'
import type { FormField, FormSchema, FormSection } from './types'

export interface StepperFormProps {
  schema: FormSchema
  stepKeys: string[]
  activeStep: number
  onNext: () => void
  onBack: () => void
  onSubmit: () => void
  pageAction?: string
  isLoading?: boolean
  disabled?: boolean
  errors?: string[]
  actionTypes?: string[]
  renderField: (field: FormField, sectionKey: string, parentField?: string) => React.ReactNode
  onMultipleAdd?: (fieldName: string, sectionKey: string) => void
  onMultipleRemove?: (fieldName: string, sectionKey: string, subItemKey: string) => void
  onCancel?: () => void
}

export function StepperForm({
  schema,
  stepKeys,
  activeStep,
  onNext,
  onBack,
  onSubmit,
  pageAction,
  isLoading,
  disabled,
  errors = [],
  actionTypes = [],
  renderField,
  onMultipleAdd,
  onMultipleRemove,
  onCancel,
}: StepperFormProps) {
  const isFinished = activeStep >= stepKeys.length
  const currentKey = stepKeys[activeStep]
  const currentSection = currentKey ? (schema[currentKey] as FormSection) : null

  return (
    <Box sx={{ width: '100%' }}>
      <div className={styles.stepperHeader}>
        <Stepper activeStep={activeStep} className={styles.stepper}>
          {stepKeys.map(key => {
            const section = schema[key] as FormSection
            return (
              <Step key={key}>
                <StepLabel>{section?.title ?? key}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </div>

      {isFinished ? (
        <Box sx={{ mt: 2, mb: 1 }}>
          <Typography>All steps completed</Typography>
          <Button onClick={onBack} className={styles.actionButton}>Reset</Button>
        </Box>
      ) : (
        currentSection && (
          <Grid container item xs={12} className={styles.section}>
            <SectionHeader title={currentSection.title} />
            <SectionBody
              section={currentSection}
              sectionKey={currentKey}
              pageAction={pageAction}
              disabled={disabled}
              renderField={renderField}
              onMultipleAdd={onMultipleAdd}
              onMultipleRemove={onMultipleRemove}
            />
          </Grid>
        )
      )}

      {errors.length > 0 && (
        <Grid container item xs={12} className={styles.errorContainer}>
          {errors.map(err => <p key={err} className={styles.errorText}>{err}</p>)}
        </Grid>
      )}

      <Grid container item xs={12} className={styles.stepperButtons} justifyContent="flex-end">
        {activeStep > 0 && (
          <Button variant="outlined" onClick={onBack} className={`${styles.actionButton} ${styles.backButton}`}>
            Back
          </Button>
        )}
        {!isFinished && activeStep < stepKeys.length - 1 && (
          <Button variant="contained" onClick={onNext} className={styles.actionButton} disabled={disabled}>
            Next
          </Button>
        )}
        {!isFinished && activeStep === stepKeys.length - 1 && (
          <Button variant="contained" onClick={onSubmit} className={styles.actionButton} disabled={disabled || isLoading}>
            Submit
          </Button>
        )}
        <SectionButtons
          actionTypes={actionTypes}
          pageAction={pageAction}
          isLoading={isLoading}
          disabled={disabled}
          layoutType="steps"
          onSubmit={(action) => { if (action === 'SUBMIT') onSubmit() }}
          onCancel={onCancel}
        />
      </Grid>
    </Box>
  )
}
