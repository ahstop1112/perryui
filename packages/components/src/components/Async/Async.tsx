import React, { Suspense } from 'react'
import Loading from '../Loading/Loading'

export function asyncComponent<T extends object>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  fallback?: React.ReactNode
): React.FC<T> {
  const LazyComponent = React.lazy(importFn)

  function AsyncWrapper(props: T) {
    return (
      <Suspense fallback={fallback ?? <Loading size={25} />}>
        <LazyComponent {...(props as React.JSX.IntrinsicAttributes & T)} />
      </Suspense>
    )
  }

  AsyncWrapper.displayName = 'AsyncWrapper'
  return AsyncWrapper
}

// Re-export the function itself for convenience
const Async = asyncComponent

export default Async
