import React, { Suspense } from 'react'

export function lazyImport<T extends React.ComponentType<any>, I extends { [K2 in K]: T }, K extends keyof I>(
  factory: () => Promise<I>,
  name: K
): I {
  const LazyComponent = React.lazy(() => factory().then((module) => ({ default: module[name] })))

  return Object.create({
    [name]: (props: any) => (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    ),
  })
}

// Usage
// const { Home } = lazyImport(() => import("./Home"), "Home");
