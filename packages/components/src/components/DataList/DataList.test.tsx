import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DataList } from './DataList'
import type { DataListItem } from './DataList'

const sampleItems: DataListItem[] = [
  { id: 1, label: 'Document A.pdf', url: 'https://example.com/a.pdf', mimeType: 'application/pdf' },
  { id: 2, label: 'Image B.jpg', url: 'https://example.com/b.jpg', mimeType: 'image/jpeg' },
]

describe('DataList', () => {
  describe('rendering', () => {
    it('renders item labels', () => {
      render(<DataList items={sampleItems} />)
      expect(screen.getByText('Document A.pdf')).toBeInTheDocument()
      expect(screen.getByText('Image B.jpg')).toBeInTheDocument()
    })

    it('renders mimeType as secondary text', () => {
      render(<DataList items={sampleItems} />)
      expect(screen.getByText('application/pdf')).toBeInTheDocument()
    })

    it('renders empty message when items array is empty', () => {
      render(<DataList items={[]} />)
      expect(screen.getByText('No attachments available.')).toBeInTheDocument()
    })

    it('renders custom empty message when provided', () => {
      render(<DataList items={[]} emptyMessage="No files uploaded yet." />)
      expect(screen.getByText('No files uploaded yet.')).toBeInTheDocument()
    })

    it('renders items without id using index as key', () => {
      render(
        <DataList
          items={[
            { label: 'No ID Doc', url: 'https://example.com/doc' },
          ]}
        />
      )
      expect(screen.getByText('No ID Doc')).toBeInTheDocument()
    })
  })

  describe('interactions', () => {
    it('calls onItemClick with the clicked item when provided', () => {
      const handleClick = vi.fn()
      render(<DataList items={sampleItems} onItemClick={handleClick} />)
      fireEvent.click(screen.getByText('Document A.pdf'))
      expect(handleClick).toHaveBeenCalledWith(sampleItems[0])
    })

    it('opens URL in new tab when onItemClick is not provided', () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
      render(<DataList items={sampleItems} />)
      fireEvent.click(screen.getByText('Document A.pdf'))
      expect(openSpy).toHaveBeenCalledWith('https://example.com/a.pdf', '_blank')
      openSpy.mockRestore()
    })
  })
})
