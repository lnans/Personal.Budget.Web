import { createContext, ReactNode, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { STORAGE_KEYS } from '@/config/constants'

export type Theme = 'dark' | 'light'

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'dark',
  setTheme: () => null,
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, defaultTheme = 'dark', ...props }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<Theme>(STORAGE_KEYS.theme, defaultTheme)
  const contextValue = { theme, setTheme }

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    root.classList.add(theme)
  }, [theme])

  return (
    <ThemeProviderContext.Provider {...props} value={contextValue}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
