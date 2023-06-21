import { MantineThemeComponents } from '@mantine/styles/lib/theme/types/MantineTheme'

export function LoaderStyles(): MantineThemeComponents {
  return {
    Loader: {
      defaultProps: {
        variant: 'dots',
      },
    },
  }
}
