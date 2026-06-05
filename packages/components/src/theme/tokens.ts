// src/theme/tokens.ts
export const tokens = {
  // PnL Colors
  pnl: {
    positive: '#00C853',
    negative: '#D50000',
    neutral: '#9E9E9E',
  },

  // Trade Status
  status: {
    pending: '#FF9800',
    executed: '#00C853',
    rejected: '#D50000',
    cancelled: '#9E9E9E',
    partial: '#2196F3',
  },

  // Risk Level
  risk: {
    low: '#00C853',
    medium: '#FF9800',
    high: '#FF5722',
    critical: '#D50000',
  },

  // Market
  market: {
    bid: '#00C853',
    ask: '#D50000',
    spread: '#9E9E9E',
  },
} as const

export type Tokens = typeof tokens