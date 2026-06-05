import React from 'react'
import { Box, Typography } from '@mui/material'

// Placeholder icon constants — replace with actual asset imports in your application
export const logoLight: string = ''
export const logoDark: string = ''
export const logoIcon: string = ''
export const placeholderImage: string = ''

// Generic file type icons (data URIs for basic SVG icons — inline so no file imports needed)
const PDF_ICON = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23f44336' d='M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7H20.5v1.5z'/%3E%3C/svg%3E`

export const pdfIcon: string = PDF_ICON

export interface IconsExports {
  logoLight: string
  logoDark: string
  logoIcon: string
  placeholderImage: string
  pdfIcon: string
}

export const IconsDisplay: React.FC = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="caption">
      Replace placeholder strings with actual asset imports in your app.
    </Typography>
    <Box
      component="img"
      src={pdfIcon}
      sx={{ width: 48, height: 48 }}
      alt="PDF icon"
    />
  </Box>
)
