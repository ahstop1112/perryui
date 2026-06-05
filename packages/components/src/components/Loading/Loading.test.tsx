import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Loading } from './Loading'

describe('Loading', () => {
  it('renders a spinner svg', () => {
    const { container } = render(<Loading />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('has role=status for accessibility', () => {
    const { getByRole } = render(<Loading />)
    expect(getByRole('status')).toBeInTheDocument()
  })

  it('renders with custom size without error', () => {
    const { container } = render(<Loading size={60} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders in fullPage mode without error', () => {
    const { container } = render(<Loading fullPage />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it.each(['primary', 'secondary', 'inherit'] as const)(
    'renders color=%s without error',
    (color) => {
      const { container } = render(<Loading color={color} />)
      expect(container.querySelector('svg')).toBeInTheDocument()
    }
  )
})
