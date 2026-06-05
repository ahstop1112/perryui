import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import styles from './FileUploadArea.module.css'

export interface UploadedFile {
  name: string
  size: number
  type: string
  file: File
}

export interface FileUploadAreaProps {
  files: UploadedFile[]
  onFilesChange: (files: UploadedFile[]) => void
  accept?: string
  multiple?: boolean
  maxSizeMB?: number
  disabled?: boolean
  variant?: 'normal' | 'compact'
  label?: string
  hint?: string
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  files,
  onFilesChange,
  accept,
  multiple = false,
  maxSizeMB = 10,
  disabled = false,
  variant = 'normal',
  label = 'Drop files here or click to upload',
  hint,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const processFiles = (fileList: FileList) => {
    const maxBytes = maxSizeMB * 1024 * 1024
    const accepted: UploadedFile[] = []
    Array.from(fileList).forEach((file) => {
      if (file.size <= maxBytes) {
        accepted.push({ name: file.name, size: file.size, type: file.type, file })
      }
    })
    if (accepted.length > 0) {
      onFilesChange(multiple ? [...files, ...accepted] : accepted)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (disabled) return
    processFiles(e.dataTransfer.files)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files)
      e.target.value = ''
    }
  }

  const handleRemove = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index))
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <Box className={styles.root}>
      <Box
        className={`${styles.dropzone} ${variant === 'compact' ? styles.compact : ''} ${isDragOver ? styles.dragOver : ''} ${disabled ? styles.disabled : ''}`}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragEnter={(e) => { e.preventDefault(); if (!disabled) setIsDragOver(true) }}
        onDragLeave={() => setIsDragOver(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={label}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click() } }}
        sx={{
          borderColor: isDragOver ? 'primary.main' : 'divider',
          bgcolor: isDragOver ? 'primary.light' : disabled ? 'action.disabledBackground' : 'background.paper',
          cursor: disabled ? 'not-allowed' : 'pointer',
          '&:hover': disabled ? {} : { borderColor: 'primary.main' },
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className={styles.hiddenInput}
          aria-hidden
        />
        <Typography variant={variant === 'compact' ? 'body2' : 'body1'} sx={{ color: disabled ? 'text.disabled' : 'text.secondary' }}>
          {label}
        </Typography>
        {hint && (
          <Typography variant="caption" sx={{ color: 'text.disabled', mt: 0.5 }}>
            {hint}
          </Typography>
        )}
      </Box>

      {files.length > 0 && (
        <List dense className={styles.fileList}>
          {files.map((f, i) => (
            <ListItem
              key={`${f.name}-${i}`}
              secondaryAction={
                !disabled && (
                  <IconButton edge="end" aria-label={`Remove ${f.name}`} size="small" onClick={() => handleRemove(i)} sx={{ color: 'error.main' }}>
                    ✕
                  </IconButton>
                )
              }
              sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
            >
              <ListItemText
                primary={f.name}
                secondary={formatSize(f.size)}
                primaryTypographyProps={{ variant: 'body2', noWrap: true }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )
}
