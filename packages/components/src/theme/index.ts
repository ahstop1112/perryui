import { createTheme } from '@mui/material/styles'
import { palette } from './palette'
import { typography } from './typography'

export const theme = createTheme({
  palette,
  typography: {
    fontFamily: typography.fontFamily,
    h1: typography.h1,
    h2: typography.h2,
    h3: typography.h3,
    h4: typography.h4,
    h5: typography.h5,
    h6: typography.h6,
  },
})

export { palette } from './palette'
export { tokens } from './tokens'
export { typography } from './typography'
