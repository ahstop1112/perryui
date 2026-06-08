import React, { useState } from 'react'
import {
  Grid, CircularProgress, Accordion,
  AccordionDetails, AccordionSummary
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SectionHeader from './SectionHeader'
import SectionBody from './SectionBody'
import SectionButtons from './SectionButtons'
import StepperForm from './StepperForm'
import InlineForm from './InlineForm'
import styles from './DynamicForm.module.scss'
import type { FormField, FormSchema, FormSection } from './types'

export interface DynamicFormProps {
  id: string
  schema: FormSchema
  actionTypes?: string[]
  pageAction?: string
  isLoading?: boolean
  disabled?: boolean
  errors?: string[]
  onSubmit: (action: string) => void
  onCancel?: () => void
  renderField: (field: FormField, sectionKey: string, parentField?: string) => React.ReactNode
  onMultipleAdd?: (fieldName: string, sectionKey: string) => void
  onMultipleRemove?: (fieldName: string, sectionKey: string, subItemKey: string) => void
  onStepNext?: (stepKey: string) => boolean
  className?: string
}

const SUBMIT_ON_ENTER = new Set(['search', 'login', 'reject', 'cancel', 'return'])

const DynamicForm = ({
  id,
  schema,
  actionTypes = [],
  pageAction,
  isLoading = false,
  disabled = false,
  errors = [],
  onSubmit,
  onCancel,
  renderField,
  onMultipleAdd,
  onMultipleRemove,
  onStepNext,
  className = '',
}: DynamicFormProps) => {
  const { layout } = schema
  const layoutType = layout.type ?? 'default'
  const shownSections = layout.isSectionShown ?? []

  const sectionKeys = Object.keys(schema).filter(
    k => k !== 'layout' && shownSections.includes(k)
  )

  const [activeStep, setActiveStep] = useState(0)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (!SUBMIT_ON_ENTER.has(pageAction ?? '')) return
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      e.preventDefault()
      onSubmit('SUBMIT')
    }
  }

  const handleStepNext = () => {
    const currentKey = sectionKeys[activeStep]
    if (onStepNext && !onStepNext(currentKey)) return
    setActiveStep(s => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStepBack = () => setActiveStep(s => s - 1)

  return (
    <form
      id={`form_${id}`}
      name={`form_${id}`}
      className={`${styles.form} ${layoutType === 'inline' ? styles.inlineForm : ''} ${className}`}
      onSubmit={e => { e.preventDefault(); onSubmit('SUBMIT') }}
      onKeyDown={handleKeyDown}
    >
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <CircularProgress />
        </div>
      )}

      {layoutType === 'steps' && (
        <StepperForm
          schema={schema}
          stepKeys={sectionKeys}
          activeStep={activeStep}
          onNext={handleStepNext}
          onBack={handleStepBack}
          onSubmit={() => onSubmit('SUBMIT')}
          pageAction={pageAction}
          isLoading={isLoading}
          disabled={disabled}
          errors={errors}
          actionTypes={actionTypes}
          renderField={renderField}
          onMultipleAdd={onMultipleAdd}
          onMultipleRemove={onMultipleRemove}
          onCancel={onCancel}
        />
      )}

      {layoutType === 'inline' && (
        <InlineForm
          schema={schema}
          sectionKeys={sectionKeys}
          pageAction={pageAction}
          disabled={disabled}
          actionTypes={actionTypes}
          isLoading={isLoading}
          renderField={renderField}
          onSubmit={onSubmit}
          onCancel={onCancel}
          onMultipleAdd={onMultipleAdd}
          onMultipleRemove={onMultipleRemove}
        />
      )}

      {(layoutType === 'default' || layoutType === 'accordion') &&
        sectionKeys.map((key, index) => {
          const section = schema[key] as FormSection
          if (!section?.fields) return null

          if (layoutType === 'accordion') {
            return (
              <Accordion
                key={key}
                className={styles.accordion}
                defaultExpanded={layout.isSectionExpanded?.includes(key)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                  className={styles.accordionSummary}
                >
                  <SectionHeader title={section.title} />
                </AccordionSummary>
                <AccordionDetails>
                  <SectionBody
                    section={section}
                    sectionKey={key}
                    pageAction={pageAction}
                    disabled={disabled}
                    renderField={renderField}
                    onMultipleAdd={onMultipleAdd}
                    onMultipleRemove={onMultipleRemove}
                  />
                </AccordionDetails>
              </Accordion>
            )
          }

          return (
            <Grid key={key} container item xs={12} className={styles.section}>
              <SectionHeader title={section.title} />
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

      {errors.length > 0 && layoutType !== 'steps' && (
        <Grid container item xs={12} className={styles.errorContainer}>
          {errors.map(err => <p key={err} className={styles.errorText}>{err}</p>)}
        </Grid>
      )}

      {actionTypes.length > 0 && layoutType !== 'steps' && layoutType !== 'inline' && (
        <Grid container item xs={12} className={styles.submitContainer} justifyContent="flex-end">
          <SectionButtons
            actionTypes={actionTypes}
            pageAction={pageAction}
            isLoading={isLoading}
            disabled={disabled}
            layoutType={layoutType}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        </Grid>
      )}
    </form>
  )
}

export default DynamicForm
