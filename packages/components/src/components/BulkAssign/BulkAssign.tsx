import { useState } from 'react'
import { Button } from '@mui/material'
import { AlertDialogs } from '../AlertDialogs'
import styles from './BulkAssign.module.css'

export interface BulkAssignProps {
  selectedCount: number
  assigneeName?: string
  disabled?: boolean
  onAssign: () => void
  buttonLabel?: string
}

export function BulkAssign({
  selectedCount,
  assigneeName,
  disabled = false,
  onAssign,
  buttonLabel = 'Bulk Assign',
}: BulkAssignProps) {
  const [open, setOpen] = useState(false)

  const isButtonDisabled = disabled || selectedCount < 1

  const handleOpen = () => setOpen(true)
  const handleCancel = () => setOpen(false)
  const handleConfirm = () => {
    setOpen(false)
    onAssign()
  }

  const dialogContent = assigneeName
    ? `Assign ${selectedCount} selected item(s) to ${assigneeName}?`
    : `Assign ${selectedCount} selected item(s)?`

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        disabled={isButtonDisabled}
        onClick={handleOpen}
        className={styles.button}
      >
        {buttonLabel}
      </Button>
      <AlertDialogs
        open={open}
        title="Confirm Bulk Assign"
        content={dialogContent}
        text4Ok="Assign"
        text4Cancel="Cancel"
        onOk={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  )
}
