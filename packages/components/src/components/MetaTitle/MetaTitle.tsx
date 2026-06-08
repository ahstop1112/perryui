import { useEffect } from 'react'

export interface MetaTitleProps {
  title: string
  suffix?: string
}

const MetaTitle = ({ title, suffix }: MetaTitleProps) => {
  useEffect(() => {
    const prev = document.title
    document.title = suffix ? `${title} - ${suffix}` : title
    return () => {
      document.title = prev
    }
  }, [title, suffix])

  return null
}

export default MetaTitle
