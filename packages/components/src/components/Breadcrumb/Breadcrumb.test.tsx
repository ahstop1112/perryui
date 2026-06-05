import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Breadcrumb } from './Breadcrumb'

describe('Breadcrumb', () => {
  it('renders the current page label', () => {
    render(<Breadcrumb current="Trade Details" />)
    expect(screen.getByText('Trade Details')).toBeInTheDocument()
  })

  it('marks the current page with aria-current=page', () => {
    render(<Breadcrumb current="Trade Details" />)
    expect(screen.getByText('Trade Details')).toHaveAttribute('aria-current', 'page')
  })

  it('renders ancestor links', () => {
    render(
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Trades', href: '/trades' }]}
        current="Detail"
      />
    )
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Trades' })).toBeInTheDocument()
  })

  it('renders without items prop', () => {
    render(<Breadcrumb current="Dashboard" />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('has aria-label=breadcrumb for accessibility', () => {
    render(<Breadcrumb current="Page" />)
    expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeInTheDocument()
  })
})
