import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SearchContainer from './SearchContainer'

describe('SearchContainer', () => {
  it('renders keyword input', () => {
    render(<SearchContainer keyword="" onKeywordChange={() => {}} onSearch={() => {}} placeholder="Search..." />)
    expect(screen.getByRole('textbox', { name: 'Search...' })).toBeInTheDocument()
  })

  it('calls onKeywordChange when typing', () => {
    const onKeywordChange = vi.fn()
    render(<SearchContainer keyword="" onKeywordChange={onKeywordChange} onSearch={() => {}} placeholder="Search..." />)
    fireEvent.change(screen.getByRole('textbox', { name: 'Search...' }), { target: { value: 'test' } })
    expect(onKeywordChange).toHaveBeenCalledWith('test')
  })

  it('calls onSearch when Search button clicked', () => {
    const onSearch = vi.fn()
    render(<SearchContainer keyword="hello" onKeywordChange={() => {}} onSearch={onSearch} />)
    fireEvent.click(screen.getByRole('button', { name: 'Search' }))
    expect(onSearch).toHaveBeenCalledWith('hello', {})
  })

  it('calls onSearch when Enter is pressed', () => {
    const onSearch = vi.fn()
    render(<SearchContainer keyword="test" onKeywordChange={() => {}} onSearch={onSearch} placeholder="Search..." />)
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Search...' }), { key: 'Enter' })
    expect(onSearch).toHaveBeenCalledWith('test', {})
  })

  it('calls onReset when Reset button clicked', () => {
    const onReset = vi.fn()
    const onKeywordChange = vi.fn()
    render(<SearchContainer keyword="test" onKeywordChange={onKeywordChange} onSearch={() => {}} onReset={onReset} />)
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(onReset).toHaveBeenCalled()
    expect(onKeywordChange).toHaveBeenCalledWith('')
  })

  it('shows Advanced button when filters are provided', () => {
    const filters = [{
      key: 'status',
      label: 'Status',
      render: (value: string, onChange: (v: string) => void) => (
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      ),
    }]
    render(<SearchContainer keyword="" onKeywordChange={() => {}} onSearch={() => {}} filters={filters} />)
    expect(screen.getByRole('button', { name: /Advanced/i })).toBeInTheDocument()
  })

  it('does not show Advanced button when no filters', () => {
    render(<SearchContainer keyword="" onKeywordChange={() => {}} onSearch={() => {}} />)
    expect(screen.queryByRole('button', { name: /Advanced/i })).not.toBeInTheDocument()
  })
})
