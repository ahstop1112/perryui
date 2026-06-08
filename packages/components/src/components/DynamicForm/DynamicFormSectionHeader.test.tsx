import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DynamicFormSectionHeader from './DynamicFormSectionHeader'

describe('DynamicFormSectionHeader', () => {
  it('renders title text when provided', () => {
    render(<DynamicFormSectionHeader title="Personal Information" />)
    expect(screen.getByText('Personal Information')).toBeInTheDocument()
  })

  it('renders nothing when title is not provided', () => {
    const { container } = render(<DynamicFormSectionHeader />)
    expect(container.firstChild).toBeNull()
  })

  it('renders nothing when title is empty string', () => {
    const { container } = render(<DynamicFormSectionHeader title="" />)
    expect(container.firstChild).toBeNull()
  })
})
