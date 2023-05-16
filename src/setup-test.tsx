import '@testing-library/jest-dom'
import { vi } from 'vitest'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn().mockReturnValue({ user: undefined }),
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual<Record<string, unknown>>('@mantine/core')
  return {
    ...actual,
    useMantineColorScheme: vi.fn().mockReturnValue({
      colorScheme: 'light',
      toggleColorScheme: vi.fn(),
    }),
  }
})
