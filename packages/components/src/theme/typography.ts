// src/theme/typography.ts
export const typography = {
  fontFamily: '"Noto Sans HK", -apple-system, sans-serif',
  
  h1: { fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em' },
  h2: { fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.01em' },
  h3: { fontSize: '1.75rem', fontWeight: 600 },
  h4: { fontSize: '1.5rem', fontWeight: 600 },
  h5: { fontSize: '1.25rem', fontWeight: 600 },
  h6: { fontSize: '1rem', fontWeight: 600 },

  mono: {
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    fontSize: '0.875rem',
  },
  price: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '1rem',
    fontWeight: 600,
    letterSpacing: '0.02em',
  },
} as const