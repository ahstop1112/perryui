import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ErrorMsg from './ErrorMsg'

describe('ErrorMsg', () => {
  it('renders a single error message', () => {
    render(<ErrorMsg message="This field is required." />)
    expect(screen.getByText('This field is required.')).toBeInTheDocument()
  })

  it('renders multiple error messages', () => {
    render(<ErrorMsg message={['Error one.', 'Error two.']} />)
    expect(screen.getByText('Error one.')).toBeInTheDocument()
    expect(screen.getByText('Error two.')).toBeInTheDocument()
  })

  it('has role=alert for accessibility', () => {
    render(<ErrorMsg message="Error" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('applies optional id', () => {
    render(<ErrorMsg message="Error" id="name-error" />)
    expect(document.getElementById('name-error')).toBeInTheDocument()
  })

  it('treats a single string the same as a one-element array', () => {
    const { getByText: single } = render(<ErrorMsg message="Same" />)
    expect(single('Same')).toBeInTheDocument()
  })
})
