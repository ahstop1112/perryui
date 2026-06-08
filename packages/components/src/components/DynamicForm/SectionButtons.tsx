import React from 'react'
import { Button } from '@mui/material'
import ActionButtons from './ActionButtons'
import styles from './DynamicForm.module.scss'

export interface SectionButtonsProps {
  actionTypes?: string[]
  pageAction?: string
  isLoading?: boolean
  disabled?: boolean
  layoutType?: string
  onSubmit: (action: string) => void
  onCancel?: () => void
}

const CONFIRM_PAGE_ACTIONS = new Set([
  'reject', 'release', 'resume', 'return', 'returnForReject',
  'terminate', 'submit', 'approve',
])

const ACTION_PAGE_ACTIONS = new Set([
  'add', 'login', 'draft', 'edit', 'resubmit', 'review',
])

const SectionButtons = ({
  actionTypes = [],
  pageAction,
  isLoading,
  disabled,
  layoutType,
  onSubmit,
  onCancel,
}: SectionButtonsProps) => {
  if (pageAction === 'evaluate') {
    return (
      <>
        <Button variant="outlined" className={`${styles.actionButton} ${styles.cancelButton}`} onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" className={styles.actionButton} onClick={() => onSubmit('EVALUATE')}>
          Send Evaluate Request
        </Button>
      </>
    )
  }

  if (CONFIRM_PAGE_ACTIONS.has(pageAction ?? '')) {
    return (
      <>
        <Button variant="outlined" className={`${styles.actionButton} ${styles.cancelButton}`} onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" className={styles.actionButton} onClick={() => onSubmit('SUBMIT')}>
          OK
        </Button>
      </>
    )
  }

  if (pageAction === 'withdraw' && actionTypes.includes('CANCEL')) {
    return (
      <>
        <Button variant="outlined" className={`${styles.actionButton} ${styles.cancelButton}`} onClick={onCancel} disabled={disabled}>
          Cancel
        </Button>
        <Button variant="contained" className={styles.actionButton} onClick={() => onSubmit('WITHDRAW')}>
          Withdraw
        </Button>
      </>
    )
  }

  if (ACTION_PAGE_ACTIONS.has(pageAction ?? '')) {
    return (
      <ActionButtons
        actionTypes={actionTypes}
        pageAction={pageAction}
        isLoading={isLoading}
        disabled={disabled}
        layoutType={layoutType}
        onSubmit={onSubmit}
      />
    )
  }

  if (pageAction === 'bulkAssign') {
    return (
      <Button variant="contained" className={styles.actionButton} onClick={() => onSubmit('BULK_ASSIGN')} disabled={disabled}>
        Bulk Assign
      </Button>
    )
  }

  return null
}

export default SectionButtons
