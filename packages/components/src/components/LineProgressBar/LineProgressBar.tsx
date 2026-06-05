import React from 'react'
import { Box, Tooltip } from '@mui/material'
import styles from './LineProgressBar.module.css'

export interface ProgressSegment {
  key: string
  value: number
  color: string
  label?: string
}

export interface LineProgressBarProps {
  segments: ProgressSegment[]
  showZero?: boolean
  height?: number
}

export function LineProgressBar({
  segments,
  showZero = false,
  height = 8,
}: LineProgressBarProps) {
  const visibleSegments = segments.filter((s) => s.value > 0 || showZero)

  return (
    <Box
      className={styles.root}
      sx={{ height }}
      role="progressbar"
      aria-label="Progress bar"
    >
      {visibleSegments.map((segment) => {
        const displayWidth = segment.value > 0 ? segment.value : 0.5
        return (
          <Tooltip
            key={segment.key}
            title={`${segment.label ?? segment.key}: ${segment.value}%`}
          >
            <Box
              sx={{
                width: `${displayWidth}%`,
                bgcolor: segment.color,
                height: '100%',
              }}
            />
          </Tooltip>
        )
      })}
    </Box>
  )
}
