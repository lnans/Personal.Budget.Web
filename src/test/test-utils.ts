import { cleanup, render } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  })
}

// eslint-disable-next-line import/export
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

// override render export
// eslint-disable-next-line import/export
export { customRender as render }
