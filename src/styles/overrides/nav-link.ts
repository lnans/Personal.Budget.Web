import { rem } from '@mantine/styles'
import { MantineThemeComponents } from '@mantine/styles/lib/theme/types/MantineTheme'

export function NavLinkStyles(): MantineThemeComponents {
  return {
    NavLink: {
      defaultProps: {
        component: 'a',
      },
      styles: (theme) => ({
        root: {
          marginInlineStart: theme.spacing.xs,
          paddingInline: rem(4),
          height: '100%',
          width: 'unset',
          borderBottomWidth: 2,
          borderBottomStyle: 'solid',
          borderBottomColor: 'transparent',
          ':has([data-active="true"])': {
            color: theme.colorScheme === 'light' ? theme.black : theme.colors.gray[3],
            borderBottomColor:
              theme.colorScheme === 'light' ? theme.colors.indigo[6] : theme.colors.indigo[5],
          },
          ':not([data-active="true"])': {
            color: theme.colors.gray[6],
            ':hover': {
              color: theme.colorScheme === 'light' ? theme.colors.gray[8] : theme.colors.gray[5],
              borderBottomColor:
                theme.colorScheme === 'light' ? theme.colors.gray[4] : theme.colors.gray[7],
            },
          },
          ':hover': {
            background: 'none !important',
          },
        },
        label: {
          fontSize: theme.fontSizes.sm,
          fontWeight: 500,
        },
      }),
    },
  }
}
