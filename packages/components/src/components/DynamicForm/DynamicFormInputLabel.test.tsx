import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DynamicFormInputLabel } from './DynamicFormInputLabel'

describe('DynamicFormInputLabel', () => {
  it('renders label text', () => {
    render(<DynamicFormInputLabel label="Email Address" />)
    expect(screen.getByText('Email Address')).toBeInTheDocument()
  })

  it('appends asterisk when required and not readOnly', () => {
    render(<DynamicFormInputLabel label="Name" required />)
    expect(screen.getByText(/Name \*/)).toBeInTheDocument()
  })

  it('does not append asterisk when readOnly', () => {
    render(<DynamicFormInputLabel label="Name" required readOnly />)
    expect(screen.queryByText(/\*/)).not.toBeInTheDocument()
  })

  it('renders tooltip icon when tooltipText provided and not readOnly', () => {
    render(<DynamicFormInputLabel label="Account" tooltipText="Your account number" />)
    expect(screen.getByTestId('HelpOutlinedIcon')).toBeInTheDocument()
  })

  it('does not render tooltip icon when readOnly', () => {
    render(<DynamicFormInputLabel label="Account" tooltipText="Hidden" readOnly />)
    expect(screen.queryByTestId('HelpOutlinedIcon')).not.toBeInTheDocument()
  })

  it('renders remarks when provided and not readOnly', () => {
    render(<DynamicFormInputLabel label="Field" remarks="optional" />)
    expect(screen.getByText('(optional)')).toBeInTheDocument()
  })

  it('does not render remarks when readOnly', () => {
    render(<DynamicFormInputLabel label="Field" remarks="optional" readOnly />)
    expect(screen.queryByText('(optional)')).not.toBeInTheDocument()
  })

  it('associates label with htmlFor', () => {
    render(<DynamicFormInputLabel label="Email" htmlFor="email-input" />)
    const label = document.querySelector('label[for="email-input"]')
    expect(label).toBeInTheDocument()
  })
})
