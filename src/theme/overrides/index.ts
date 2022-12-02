import { Theme } from '@mui/material/styles'
import Button from './button'

declare module '@mui/material/styles' {
  interface CustomTheme {
    customShadows: {
      z1: string
      z4: string
      z8: string
      z12: string
      z16: string
      z20: string
      z24: string

      primary: string
      info: string
      secondary: string
      success: string
      warning: string
      error: string

      card: string
      dialog: string
      dropdown: string
    }
  }

  interface Theme extends CustomTheme {} // eslint-disable-line @typescript-eslint/no-empty-interface
  interface ThemeOptions extends CustomTheme {} // eslint-disable-line @typescript-eslint/no-empty-interface
}

export default function componentsOverrides(theme: Theme) {
  return Object.assign(Button(theme))
}
