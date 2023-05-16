import { MantineThemeComponents } from '@mantine/styles/lib/theme/types/MantineTheme'

export function CardStyles(): MantineThemeComponents {
  return {
    Card: {
      defaultProps: {
        padding: 'xl',
        withBorder: true,
      },
      styles: (theme) => ({
        cardSection: {
          paddingBlock: theme.spacing.md,
        },
      }),
    },
    CardSection: {
      defaultProps: {
        inheritPadding: true,
      },
    },
  }
}
