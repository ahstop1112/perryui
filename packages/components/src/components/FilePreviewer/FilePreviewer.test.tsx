import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FilePreviewer from './FilePreviewer'

describe('FilePreviewer', () => {
  const pdfFile = { name: 'doc.pdf', type: 'application/pdf', url: 'http://example.com/doc.pdf' }
  const imageFile = { name: 'photo.jpg', type: 'image/jpeg', url: 'http://example.com/photo.jpg' }

  it('renders dialog title with file name', () => {
    render(<FilePreviewer open file={pdfFile} onClose={() => {}} />)
    expect(screen.getByText('doc.pdf')).toBeInTheDocument()
  })

  it('renders iframe for PDF files', () => {
    render(<FilePreviewer open file={pdfFile} onClose={() => {}} />)
    expect(screen.getByTitle('doc.pdf')).toBeInTheDocument()
  })

  it('renders img for image files', () => {
    render(<FilePreviewer open file={imageFile} onClose={() => {}} />)
    expect(screen.getByAltText('photo.jpg')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<FilePreviewer open file={pdfFile} onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: 'Close preview' }))
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onDownload when download button is clicked', () => {
    const onDownload = vi.fn()
    render(<FilePreviewer open file={pdfFile} onClose={() => {}} onDownload={onDownload} />)
    fireEvent.click(screen.getByRole('button', { name: 'Download' }))
    expect(onDownload).toHaveBeenCalledWith(pdfFile)
  })

  it('shows unsupported message for unknown file types', () => {
    const xlsxFile = { name: 'data.xlsx', type: 'application/xlsx', url: '' }
    render(<FilePreviewer open file={xlsxFile} onClose={() => {}} />)
    expect(screen.getByText('Preview not available for this file type.')).toBeInTheDocument()
  })

  it('returns null when file is null', () => {
    const { container } = render(<FilePreviewer open={false} file={null} onClose={() => {}} />)
    expect(container.firstChild).toBeNull()
  })
})
