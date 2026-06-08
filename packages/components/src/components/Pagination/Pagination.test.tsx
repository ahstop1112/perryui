import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from './Pagination'

describe('Pagination', () => {
  it('renders pagination controls when totalCount > pageSize', () => {
    render(<Pagination totalCount={100} pageSize={10} page={1} onChange={vi.fn()} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('returns null when there is only one page', () => {
    const { container } = render(
      <Pagination totalCount={5} pageSize={10} page={1} onChange={vi.fn()} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('returns null when totalCount is 0', () => {
    const { container } = render(
      <Pagination totalCount={0} pageSize={10} page={1} onChange={vi.fn()} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('shows row range info text', () => {
    render(<Pagination totalCount={100} pageSize={10} page={2} onChange={vi.fn()} />)
    expect(screen.getByText('11–20 of 100')).toBeInTheDocument()
  })

  it('clamps end row at totalCount on last page', () => {
    render(<Pagination totalCount={95} pageSize={10} page={10} onChange={vi.fn()} />)
    expect(screen.getByText('91–95 of 95')).toBeInTheDocument()
  })

  it('calls onChange when a page button is clicked', () => {
    const handleChange = vi.fn()
    render(<Pagination totalCount={100} pageSize={10} page={1} onChange={handleChange} />)
    fireEvent.click(screen.getByRole('button', { name: /page 2/i }))
    expect(handleChange).toHaveBeenCalledWith(2)
  })
})
