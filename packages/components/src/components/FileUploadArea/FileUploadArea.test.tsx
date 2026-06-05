import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { FileUploadArea } from './FileUploadArea'

describe('FileUploadArea', () => {
  it('renders drop zone with label', () => {
    render(<FileUploadArea files={[]} onFilesChange={() => {}} label="Upload here" />)
    expect(screen.getByRole('button', { name: 'Upload here' })).toBeInTheDocument()
  })

  it('renders uploaded files', () => {
    const files = [{ name: 'test.pdf', size: 1024, type: 'application/pdf', file: new File([], 'test.pdf') }]
    render(<FileUploadArea files={files} onFilesChange={() => {}} />)
    expect(screen.getByText('test.pdf')).toBeInTheDocument()
  })

  it('calls onFilesChange when a file is removed', () => {
    const onFilesChange = vi.fn()
    const files = [{ name: 'test.pdf', size: 1024, type: 'application/pdf', file: new File([], 'test.pdf') }]
    render(<FileUploadArea files={files} onFilesChange={onFilesChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Remove test.pdf' }))
    expect(onFilesChange).toHaveBeenCalledWith([])
  })

  it('does not show remove button when disabled', () => {
    const files = [{ name: 'test.pdf', size: 1024, type: 'application/pdf', file: new File([], 'test.pdf') }]
    render(<FileUploadArea files={files} onFilesChange={() => {}} disabled />)
    expect(screen.queryByRole('button', { name: 'Remove test.pdf' })).not.toBeInTheDocument()
  })
})
