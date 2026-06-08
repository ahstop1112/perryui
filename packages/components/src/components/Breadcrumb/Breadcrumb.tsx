import React from 'react'
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material'
import styles from './Breadcrumb.module.scss'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  /** Ancestor navigation items, rendered left to right */
  items?: BreadcrumbItem[]
  /** Label of the current active page (not a link) */
  current: string
}

const Breadcrumb = ({ items = [], current }: BreadcrumbProps) => {
  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      className={styles.breadcrumb}
      sx={{ display: { xs: 'none', md: 'block' } }}
    >
      {items.map((item, index) =>
        item.href ? (
          <Link
            key={index}
            href={item.href}
            underline="hover"
            color="text.secondary"
            className={styles.link}
          >
            {item.label}
          </Link>
        ) : (
          <Typography key={index} color="text.secondary" className={styles.link}>
            {item.label}
          </Typography>
        )
      )}
      <Typography
        color="text.primary"
        aria-current="page"
        className={styles.current}
      >
        {current}
      </Typography>
    </MuiBreadcrumbs>
  )
}

export default Breadcrumb
