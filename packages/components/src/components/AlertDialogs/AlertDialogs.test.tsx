import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AlertDialogs from './AlertDialogs'

describe('AlertDialogs', () => {
  describe('rendering', () => {
    it('renders title and content when open', () => {
      render(
        <AlertDialogs
          open={true}
          title="Test Title"
          content="Test content"
          onOk={vi.fn()}
          onCancel={vi.fn()}
        />
      )
      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    it('renders default title when title is not provided', () => {
      render(<AlertDialogs open={true} onOk={vi.fn()} />)
      expect(screen.getByText('Confirm')).toBeInTheDocument()
    })

    it('renders default content when content is not provided', () => {
      render(<AlertDialogs open={true} onOk={vi.fn()} />)
      expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    })

    it('appends keyId to content', () => {
      render(
        <AlertDialogs
          open={true}
          content="Delete record"
          keyId="TXN-001"
          onOk={vi.fn()}
        />
      )
      expect(screen.getByText(/TXN-001/)).toBeInTheDocument()
    })

    it('does not render when closed', () => {
      render(
        <AlertDialogs
          open={false}
          title="Hidden Dialog"
          onOk={vi.fn()}
        />
      )
      expect(screen.queryByText('Hidden Dialog')).not.toBeInTheDocument()
    })
  })

  describe('OK button', () => {
    it('calls onOk when OK button is clicked', () => {
      const handleOk = vi.fn()
      render(
        <AlertDialogs open={true} onOk={handleOk} onCancel={vi.fn()} />
      )
      fireEvent.click(screen.getByText('OK'))
      expect(handleOk).toHaveBeenCalledTimes(1)
    })

    it('renders custom text4Ok label', () => {
      render(
        <AlertDialogs open={true} text4Ok="Confirm Delete" onOk={vi.fn()} />
      )
      expect(screen.getByText('Confirm Delete')).toBeInTheDocument()
    })

    it('does not render OK button when onOk is not provided', () => {
      render(
        <AlertDialogs open={true} onCancel={vi.fn()} />
      )
      expect(screen.queryByText('OK')).not.toBeInTheDocument()
    })
  })

  describe('Cancel button', () => {
    it('calls onCancel when Cancel button is clicked', () => {
      const handleCancel = vi.fn()
      render(
        <AlertDialogs open={true} onOk={vi.fn()} onCancel={handleCancel} />
      )
      fireEvent.click(screen.getByText('Cancel'))
      expect(handleCancel).toHaveBeenCalledTimes(1)
    })

    it('hides Cancel button when onCancel is not provided', () => {
      render(
        <AlertDialogs open={true} onOk={vi.fn()} />
      )
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    })

    it('renders custom text4Cancel label', () => {
      render(
        <AlertDialogs open={true} text4Cancel="Go Back" onOk={vi.fn()} onCancel={vi.fn()} />
      )
      expect(screen.getByText('Go Back')).toBeInTheDocument()
    })
  })
})
