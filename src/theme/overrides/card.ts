import { MantineThemeComponents } from '@mantine/styles/lib/theme/types/MantineTheme'

export function CardStyles(): MantineThemeComponents {
  return {
    Card: {
      defaultProps: {
        padding: 'xl',
        withBorder: true,
      },
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colorScheme === 'light' ? theme.white : theme.colors.dark[7],
        },
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
