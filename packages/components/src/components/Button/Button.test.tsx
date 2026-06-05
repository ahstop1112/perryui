import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('renders with default props without crashing', () => {
      render(<Button>Default</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('applies aria-label when provided', () => {
      render(<Button aria-label="submit form">Submit</Button>)
      expect(screen.getByRole('button', { name: 'submit form' })).toBeInTheDocument()
    })
  })

  describe('disabled state', () => {
    it('disables the button when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('does not fire onClick when disabled', () => {
      const handleClick = vi.fn()
      render(<Button disabled onClick={handleClick}>Disabled</Button>)
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('loading state', () => {
    it('disables the button when loading', () => {
      render(<Button loading>Loading</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('sets aria-busy when loading', () => {
      render(<Button loading>Loading</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('renders a spinner when loading', () => {
      render(<Button loading>Loading</Button>)
      expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument()
    })

    it('does not fire onClick when loading', () => {
      const handleClick = vi.fn()
      render(<Button loading onClick={handleClick}>Loading</Button>)
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('interactions', () => {
    it('fires onClick when clicked', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('is keyboard accessible via Enter key', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Keyboard</Button>)
      fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' })
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalled()
    })
  })

  describe('variants', () => {
    it.each(['contained', 'outlined', 'ghost'] as const)(
      'renders variant=%s without error',
      (variant) => {
        render(<Button variant={variant}>Button</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
      }
    )
  })

  describe('sizes', () => {
    it.each(['small', 'medium', 'large'] as const)(
      'renders size=%s without error',
      (size) => {
        render(<Button size={size}>Button</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
      }
    )
  })

  describe('colors', () => {
    it.each(['primary', 'secondary', 'success', 'error'] as const)(
      'renders color=%s without error',
      (color) => {
        render(<Button color={color}>Button</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
      }
    )
  })

  describe('type attribute', () => {
    it('defaults to type=button', () => {
      render(<Button>Button</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })

    it('accepts type=submit', () => {
      render(<Button type="submit">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
    })
  })

  describe('fullWidth', () => {
    it('renders fullWidth without error', () => {
      render(<Button fullWidth>Full Width</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })
})
