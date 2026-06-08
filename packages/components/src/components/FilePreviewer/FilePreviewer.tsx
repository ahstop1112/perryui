import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import styles from './FilePreviewer.module.scss'

export interface PreviewFile {
  name: string
  type: string // MIME type e.g. 'application/pdf', 'image/jpeg'
  url: string
}

export interface FilePreviewerProps {
  open: boolean
  file: PreviewFile | null
  onClose: () => void
  onDownload?: (file: PreviewFile) => void
}

const FilePreviewer: React.FC<FilePreviewerProps> = ({
  open,
  file,
  onClose,
  onDownload,
}) => {
  if (!file) return null

  const isImage = file.type.startsWith('image/')
  const isPdf = file.type === 'application/pdf'

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth aria-labelledby="file-preview-title">
      <DialogTitle id="file-preview-title" className={styles.title}>
        <span>{file.name}</span>
        <IconButton aria-label="Close preview" onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
          ✕
        </IconButton>
      </DialogTitle>

      <DialogContent className={styles.content} dividers>
        {isImage && (
          <Box className={styles.imageContainer}>
            <img src={file.url} alt={file.name} className={styles.image} />
          </Box>
        )}
        {isPdf && (
          <iframe
            src={file.url}
            title={file.name}
            className={styles.iframe}
            aria-label={`PDF preview: ${file.name}`}
          />
        )}
        {!isImage && !isPdf && (
          <Box className={styles.unsupported}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Preview not available for this file type.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.disabled', mt: 1 }}>
              {file.name}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        {onDownload && (
          <Button onClick={() => onDownload(file)} variant="outlined" size="small">
            Download
          </Button>
        )}
        <Button onClick={onClose} variant="contained" size="small">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FilePreviewer
