// src/theme/palette.ts
import { tokens } from './tokens'

export const palette = {
  primary: {
    main: '#0057A8',       // Haitong blue
    light: '#3379BC',
    dark: '#003F7A',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#00897B',
    light: '#4DB6AC',
    dark: '#00695C',
    contrastText: '#FFFFFF',
  },
  error: {
    main: tokens.pnl.negative,
  },
  success: {
    main: tokens.pnl.positive,
  },
  background: {
    default: '#F5F6FA',
    paper: '#FFFFFF',
    dark: '#0A0E1A',      // Dark mode trading terminal feel
  },
  text: {
    primary: '#1A1A2E',
    secondary: '#6B7280',
  },
} as const