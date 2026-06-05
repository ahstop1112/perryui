import React, { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import styles from './PDFViewer.module.css'

export interface PDFViewerProps {
  url: string
  title?: string
  zoomable?: boolean
  initialZoom?: number // 1.0 = 100%
  onDownload?: () => void
}

const ZOOM_STEP = 0.25
const MIN_ZOOM = 0.5
const MAX_ZOOM = 3.0

export const PDFViewer: React.FC<PDFViewerProps> = ({
  url,
  title = 'PDF Document',
  zoomable = true,
  initialZoom = 1.0,
  onDownload,
}) => {
  const [zoom, setZoom] = useState(initialZoom)

  const handleZoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)))
  const handleZoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)))
  const handleReset = () => setZoom(1.0)

  return (
    <Box className={styles.root}>
      {(zoomable || onDownload) && (
        <Box className={styles.toolbar} sx={{ bgcolor: 'grey.100', borderBottom: '1px solid', borderColor: 'divider' }}>
          {zoomable && (
            <>
              <Tooltip title="Zoom out">
                <span>
                  <IconButton size="small" onClick={handleZoomOut} disabled={zoom <= MIN_ZOOM} aria-label="Zoom out">
                    −
                  </IconButton>
                </span>
              </Tooltip>
              <Typography
                variant="body2"
                className={styles.zoomLabel}
                onClick={handleReset}
                role="button"
                tabIndex={0}
                aria-label="Reset zoom"
                onKeyDown={(e) => { if (e.key === 'Enter') handleReset() }}
                sx={{ cursor: 'pointer', userSelect: 'none', color: 'text.secondary' }}
              >
                {Math.round(zoom * 100)}%
              </Typography>
              <Tooltip title="Zoom in">
                <span>
                  <IconButton size="small" onClick={handleZoomIn} disabled={zoom >= MAX_ZOOM} aria-label="Zoom in">
                    +
                  </IconButton>
                </span>
              </Tooltip>
            </>
          )}
          {onDownload && (
            <Tooltip title="Download">
              <IconButton size="small" onClick={onDownload} aria-label="Download PDF" sx={{ ml: 'auto' }}>
                ↓
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}

      <Box className={styles.viewerContainer}>
        <Box
          className={styles.scaleWrapper}
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
        >
          <iframe
            src={url}
            title={title}
            className={styles.iframe}
            aria-label={title}
          />
        </Box>
      </Box>
    </Box>
  )
}
