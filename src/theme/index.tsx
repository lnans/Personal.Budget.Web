import { CssBaseline } from '@mui/material'
import { createTheme, PaletteOptions, ThemeOptions, ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import { ReactNode, useMemo } from 'react'

import breakpoints from './breakpoints'
import componentsOverrides from './overrides'
import palette from './palette'
import shadows, { customShadows } from './shadows'
import typography from './typography'

type ThemeProviderProps = {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const themeMode = 'light' // TODO: handle theme switch
  const isLight = themeMode === 'light'
  const themeOptions = useMemo<ThemeOptions>(
    () => ({
      palette: isLight ? (palette.light as PaletteOptions) : (palette.dark as PaletteOptions),
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight]
  )

  const theme = createTheme(themeOptions)
  theme.components = componentsOverrides(theme)

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}
