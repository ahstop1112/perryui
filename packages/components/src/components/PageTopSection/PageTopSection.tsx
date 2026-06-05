import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'
import styles from './PageTopSection.module.css'

export interface PageTopSectionProps {
  children: React.ReactNode
  sticky?: boolean
}

export function PageTopSection({ children, sticky = true }: PageTopSectionProps) {
  const [isSticky, setIsSticky] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sticky) return

    const handleScroll = () => {
      if (sentinelRef.current) {
        const rect = sentinelRef.current.getBoundingClientRect()
        setIsSticky(rect.top < 0)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sticky])

  if (!sticky) {
    return (
      <div className={styles.root}>
        {children}
      </div>
    )
  }

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />
      <Box
        className={`${styles.root} ${isSticky ? styles.sticky : ''}`}
        sx={isSticky ? { bgcolor: 'background.paper' } : undefined}
        data-sticky={isSticky}
      >
        {children}
      </Box>
    </>
  )
}
