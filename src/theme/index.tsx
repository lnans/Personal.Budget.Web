import { CssBaseline } from '@mui/material'
import { createTheme, StyledEngineProvider, ThemeOptions, ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import { ReactNode, useMemo } from 'react'
import customShadows from './customShadows'
import GlobalStyles from './globalStyles'
import componentsOverrides from './overrides'
import palette from './palette'
import shadows from './shadows'

type ThemeProviderProps = {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const themeOptions = useMemo<ThemeOptions>(
    () => ({
      palette,
      shape: { borderRadius: 6 },
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    []
  )

  const theme = createTheme(themeOptions)
  theme.components = componentsOverrides(theme)

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  )
}
