import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PDFViewer from './PDFViewer'

describe('PDFViewer', () => {
  it('renders iframe with correct title', () => {
    render(<PDFViewer url="http://example.com/doc.pdf" title="My PDF" />)
    expect(screen.getByTitle('My PDF')).toBeInTheDocument()
  })

  it('shows zoom controls when zoomable', () => {
    render(<PDFViewer url="about:blank" zoomable />)
    expect(screen.getByRole('button', { name: 'Zoom in' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Zoom out' })).toBeInTheDocument()
  })

  it('hides zoom controls when not zoomable', () => {
    render(<PDFViewer url="about:blank" zoomable={false} />)
    expect(screen.queryByRole('button', { name: 'Zoom in' })).not.toBeInTheDocument()
  })

  it('increments zoom on zoom in click', () => {
    render(<PDFViewer url="about:blank" zoomable initialZoom={1.0} />)
    expect(screen.getByText('100%')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }))
    expect(screen.getByText('125%')).toBeInTheDocument()
  })

  it('decrements zoom on zoom out click', () => {
    render(<PDFViewer url="about:blank" zoomable initialZoom={1.0} />)
    fireEvent.click(screen.getByRole('button', { name: 'Zoom out' }))
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('resets zoom when percentage label is clicked', () => {
    render(<PDFViewer url="about:blank" zoomable initialZoom={1.5} />)
    fireEvent.click(screen.getByRole('button', { name: 'Reset zoom' }))
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('calls onDownload when download button clicked', () => {
    const onDownload = vi.fn()
    render(<PDFViewer url="about:blank" onDownload={onDownload} />)
    fireEvent.click(screen.getByRole('button', { name: 'Download PDF' }))
    expect(onDownload).toHaveBeenCalled()
  })
})
