import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ReactNode } from 'react'
import styles from './FormDialogs.module.css'

export interface FormDialogsProps {
  open: boolean
  title?: string
  onClose: () => void
  children?: ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export function FormDialogs({
  open,
  title,
  onClose,
  children,
  maxWidth = 'sm',
}: FormDialogsProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" className={styles.title}>
        {title ?? 'Form'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          className={styles.closeButton}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.content}>{children}</DialogContent>
    </Dialog>
  )
}
