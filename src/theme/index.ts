import { ColorScheme, MantineThemeOverride } from '@mantine/styles'

import { CardStyles } from './overrides/card'
import { InputStyles } from './overrides/input'
import { InputNumberStyles } from './overrides/input-number'
import { LoaderStyles } from './overrides/loader'
import { ModalStyles } from './overrides/modal'
import { NavLinkStyles } from './overrides/nav-link'
import { TableStyles } from './overrides/table'

export function themeOverride(colorScheme: ColorScheme): MantineThemeOverride {
  return {
    colorScheme,
    defaultRadius: 'md',
    black: '#202123',
    fontFamily: 'Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
    primaryColor: 'indigo',
    colors: {
      indigo: ['#f6f8ff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81'],
    },
    components: {
      ...CardStyles(),
      ...InputStyles(),
      ...InputNumberStyles(),
      ...LoaderStyles(),
      ...ModalStyles(),
      ...NavLinkStyles(),
      ...TableStyles(),
    },
  }
}
