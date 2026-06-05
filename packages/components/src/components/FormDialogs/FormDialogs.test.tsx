import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FormDialogs } from './FormDialogs'

describe('FormDialogs', () => {
  describe('rendering', () => {
    it('renders the dialog when open', () => {
      render(
        <FormDialogs open={true} title="Test Form" onClose={vi.fn()}>
          <p>Form content</p>
        </FormDialogs>
      )
      expect(screen.getByText('Test Form')).toBeInTheDocument()
      expect(screen.getByText('Form content')).toBeInTheDocument()
    })

    it('renders default title when title is not provided', () => {
      render(<FormDialogs open={true} onClose={vi.fn()} />)
      expect(screen.getByText('Form')).toBeInTheDocument()
    })

    it('does not render when closed', () => {
      render(
        <FormDialogs open={false} title="Hidden Form" onClose={vi.fn()} />
      )
      expect(screen.queryByText('Hidden Form')).not.toBeInTheDocument()
    })

    it('renders children content', () => {
      render(
        <FormDialogs open={true} onClose={vi.fn()}>
          <input data-testid="test-input" />
        </FormDialogs>
      )
      expect(screen.getByTestId('test-input')).toBeInTheDocument()
    })

    it('renders a close button', () => {
      render(<FormDialogs open={true} onClose={vi.fn()} />)
      expect(screen.getByLabelText('close')).toBeInTheDocument()
    })
  })

  describe('interactions', () => {
    it('calls onClose when close button is clicked', () => {
      const handleClose = vi.fn()
      render(<FormDialogs open={true} onClose={handleClose} />)
      fireEvent.click(screen.getByLabelText('close'))
      expect(handleClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('maxWidth variants', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
      'renders with maxWidth=%s without error',
      (maxWidth) => {
        render(
          <FormDialogs open={true} onClose={vi.fn()} maxWidth={maxWidth}>
            <p>Content</p>
          </FormDialogs>
        )
        expect(screen.getByText('Content')).toBeInTheDocument()
      }
    )
  })
})
