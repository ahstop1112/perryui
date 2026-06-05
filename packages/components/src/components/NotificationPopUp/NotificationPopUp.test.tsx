import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { NotificationPopUp } from './NotificationPopUp'
import type { NotificationItem } from './NotificationPopUp'

const makeNotification = (overrides: Partial<NotificationItem> = {}): NotificationItem => ({
  id: 1,
  message: 'Test message',
  severity: 'info',
  ...overrides,
})

describe('NotificationPopUp', () => {
  describe('rendering', () => {
    it('renders nothing when notifications array is empty', () => {
      const { container } = render(
        <NotificationPopUp notifications={[]} onClose={vi.fn()} />
      )
      expect(container).toBeEmptyDOMElement()
    })

    it('renders the latest notification message', () => {
      render(
        <NotificationPopUp
          notifications={[makeNotification({ message: 'Hello World' })]}
          onClose={vi.fn()}
        />
      )
      expect(screen.getByText('Hello World')).toBeInTheDocument()
    })

    it('renders notification title when provided', () => {
      render(
        <NotificationPopUp
          notifications={[makeNotification({ title: 'Alert Title', message: 'Alert body' })]}
          onClose={vi.fn()}
        />
      )
      expect(screen.getByText('Alert Title')).toBeInTheDocument()
    })

    it('does not render title element when title is not provided', () => {
      render(
        <NotificationPopUp
          notifications={[makeNotification({ title: undefined })]}
          onClose={vi.fn()}
        />
      )
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })

    it('shows the last notification when multiple are present', () => {
      render(
        <NotificationPopUp
          notifications={[
            makeNotification({ id: 1, message: 'First' }),
            makeNotification({ id: 2, message: 'Second' }),
          ]}
          onClose={vi.fn()}
        />
      )
      expect(screen.getByText('Second')).toBeInTheDocument()
      expect(screen.queryByText('First')).not.toBeInTheDocument()
    })
  })

  describe('severity variants', () => {
    it.each(['success', 'error', 'warning', 'info'] as const)(
      'renders severity=%s without error',
      (severity) => {
        render(
          <NotificationPopUp
            notifications={[makeNotification({ severity })]}
            onClose={vi.fn()}
          />
        )
        expect(screen.getByText('Test message')).toBeInTheDocument()
      }
    )
  })

  describe('interactions', () => {
    it('calls onClose with the notification id when close button is clicked', () => {
      const handleClose = vi.fn()
      render(
        <NotificationPopUp
          notifications={[makeNotification({ id: 42 })]}
          onClose={handleClose}
        />
      )
      const closeButton = screen.getByRole('button', { name: /close/i })
      fireEvent.click(closeButton)
      expect(handleClose).toHaveBeenCalledWith(42)
    })
  })
})
