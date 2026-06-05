import React from 'react'
import { Button, CircularProgress } from '@mui/material'
import styles from './DynamicForm.module.css'

export interface ActionButtonsProps {
  actionTypes: string[]
  pageAction?: string
  isLoading?: boolean
  disabled?: boolean
  layoutType?: string
  onSubmit: (action: string) => void
}

const ERROR_ACTIONS = new Set(['REJECT', 'TERMINATE', 'DELETE', 'RETURN', 'RETURN_FOR_REJECT', 'INIT_RETURN'])
const PRIMARY_ACTIONS = new Set(['APPROVE'])

function getButtonVariant(action: string): 'contained' | 'outlined' {
  return PRIMARY_ACTIONS.has(action) ? 'contained' : 'outlined'
}

function getButtonColor(action: string): 'primary' | 'error' | 'inherit' {
  if (PRIMARY_ACTIONS.has(action)) return 'primary'
  if (ERROR_ACTIONS.has(action)) return 'error'
  return 'inherit'
}

const ACTION_LABELS: Record<string, string> = {
  SUBMIT: 'Submit',
  SAVE: 'Save',
  APPROVE: 'Approve',
  REJECT: 'Reject',
  CANCEL: 'Cancel',
  TERMINATE: 'Terminate',
  RETURN: 'Return',
  RETURN_FOR_REJECT: 'Return for Reject',
  INIT_RETURN: 'Return',
  DELETE: 'Delete',
  RELEASE: 'Release',
  WITHDRAW: 'Withdraw',
  EVALUATION: 'Evaluation',
  EVALUATE: 'Evaluate',
  REQUEST_INFO: 'Request Info',
  BULK_ASSIGN: 'Bulk Assign',
  STOP_EVALUATE: 'Stop Evaluate',
  BACK: 'Back',
  NEXT: 'Next',
}

export function ActionButtons({
  actionTypes,
  pageAction,
  isLoading = false,
  disabled = false,
  layoutType,
  onSubmit,
}: ActionButtonsProps) {
  const filteredActions = layoutType === 'steps'
    ? actionTypes.filter(a => a !== 'SUBMIT')
    : actionTypes

  // Exclude DELETE and CANCEL from the main loop — handled separately
  const mainActions = filteredActions.filter(a => a !== 'DELETE' && a !== 'CANCEL')
  const showDelete = pageAction === 'edit' && filteredActions.includes('DELETE')
  const showCancelAsWithdraw = pageAction === 'review' && filteredActions.includes('CANCEL')

  return (
    <>
      {mainActions.map(action => (
        <Button
          key={action}
          variant={getButtonVariant(action)}
          color={getButtonColor(action)}
          className={styles.actionButton}
          disabled={disabled || isLoading}
          onClick={() => onSubmit(action)}
          endIcon={isLoading ? <CircularProgress size={16} /> : undefined}
        >
          {ACTION_LABELS[action] ?? action}
        </Button>
      ))}
      {showDelete && (
        <Button
          key="DELETE"
          variant="outlined"
          color="error"
          className={styles.actionButton}
          disabled={disabled || isLoading}
          onClick={() => onSubmit('DELETE')}
        >
          Delete
        </Button>
      )}
      {showCancelAsWithdraw && (
        <Button
          key="WITHDRAW"
          variant="outlined"
          color="inherit"
          className={styles.actionButton}
          disabled={disabled || isLoading}
          onClick={() => onSubmit('WITHDRAW')}
        >
          Withdraw
        </Button>
      )}
    </>
  )
}
