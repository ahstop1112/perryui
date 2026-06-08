import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TabPanel from './TabPanel'

describe('TabPanel', () => {
  it('renders children when value matches index', () => {
    render(<TabPanel value={0} index={0}>Tab content</TabPanel>)
    expect(screen.getByText('Tab content')).toBeInTheDocument()
  })

  it('does not render children when value does not match index', () => {
    render(<TabPanel value={1} index={0}>Hidden content</TabPanel>)
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument()
  })

  it('has role=tabpanel', () => {
    render(<TabPanel value={0} index={0}>Content</TabPanel>)
    expect(screen.getByRole('tabpanel')).toBeInTheDocument()
  })

  it('sets correct id from idPrefix and index', () => {
    render(<TabPanel value={0} index={2} idPrefix="nav">Content</TabPanel>)
    expect(document.getElementById('navpanel-2')).toBeInTheDocument()
  })

  it('sets aria-labelledby matching the associated tab id', () => {
    render(<TabPanel value={0} index={0} idPrefix="main">Content</TabPanel>)
    const panel = screen.getByRole('tabpanel')
    expect(panel).toHaveAttribute('aria-labelledby', 'main-0')
  })

  it('sets hidden attribute when value does not match', () => {
    render(<TabPanel value={1} index={0}>Hidden</TabPanel>)
    const panel = screen.getByRole('tabpanel', { hidden: true })
    expect(panel).toHaveAttribute('hidden')
  })
})
