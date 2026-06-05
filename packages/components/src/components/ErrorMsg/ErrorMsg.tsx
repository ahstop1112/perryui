import React from 'react'
import { Typography } from '@mui/material'
import styles from './ErrorMsg.module.css'

export interface ErrorMsgProps {
  /** Single error string or array of error strings */
  message: string | string[]
  /** Optional id for aria-describedby linkage */
  id?: string
}

export function ErrorMsg({ message, id }: ErrorMsgProps) {
  const messages = Array.isArray(message) ? message : [message]

  return (
    <div className={styles.container} role="alert" id={id}>
      {messages.map((text, index) => (
        <Typography
          key={index}
          variant="caption"
          component="p"
          className={styles.text}
          sx={{ color: 'error.main', lineHeight: 1.5, mb: 0 }}
        >
          {text}
        </Typography>
      ))}
    </div>
  )
}
