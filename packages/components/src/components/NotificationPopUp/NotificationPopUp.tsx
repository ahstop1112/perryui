import { Snackbar, Alert, AlertTitle } from '@mui/material'

export type NotificationSeverity = 'success' | 'error' | 'warning' | 'info'

export interface NotificationItem {
  id: string | number
  title?: string
  message: string
  severity?: NotificationSeverity
}

export interface NotificationPopUpProps {
  notifications: NotificationItem[]
  onClose: (id: string | number) => void
  autoHideDuration?: number
}

export function NotificationPopUp({
  notifications,
  onClose,
  autoHideDuration = 6000,
}: NotificationPopUpProps) {
  const latest = notifications[notifications.length - 1]
  if (!latest) return null

  return (
    <Snackbar
      open={notifications.length > 0}
      autoHideDuration={autoHideDuration}
      onClose={() => onClose(latest.id)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        severity={latest.severity ?? 'error'}
        onClose={() => onClose(latest.id)}
        variant="filled"
      >
        {latest.title && <AlertTitle>{latest.title}</AlertTitle>}
        {latest.message}
      </Alert>
    </Snackbar>
  )
}
