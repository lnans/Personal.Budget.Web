export const initMocks = async () => {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { server } = await import('./server')
    server.listen({ onUnhandledRequest: 'bypass' })
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { worker } = await import('./browser')
    worker.start({ onUnhandledRequest: 'bypass' })
  }
}
