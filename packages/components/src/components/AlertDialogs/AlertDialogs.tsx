import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'
import { ReactNode } from 'react'
import styles from './AlertDialogs.module.css'

export interface AlertDialogsProps {
  open: boolean
  title?: string
  content?: ReactNode
  contentTable?: ReactNode
  keyId?: string
  text4Ok?: string
  text4Cancel?: string
  okColor?: 'primary' | 'error' | 'inherit'
  onOk?: () => void
  onCancel?: () => void
}

export function AlertDialogs({
  open,
  title,
  content,
  contentTable,
  keyId,
  text4Ok,
  text4Cancel,
  okColor = 'primary',
  onOk,
  onCancel,
}: AlertDialogsProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: styles.paper }}
      slotProps={{ transition: { unmountOnExit: true } }}
    >
      <DialogTitle id="alert-dialog-title" className={styles.title}>
        {title ?? 'Confirm'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content ?? 'Are you sure?'}
          {keyId && `: ${keyId}`}
        </DialogContentText>
        {contentTable}
      </DialogContent>
      <DialogActions className={styles.actions}>
        {onCancel && (
          <Button variant="outlined" color="inherit" onClick={onCancel}>
            {text4Cancel ?? 'Cancel'}
          </Button>
        )}
        {onOk && (
          <Button variant="contained" color={okColor} onClick={onOk} autoFocus>
            {text4Ok ?? 'OK'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
