import { MantineThemeComponents } from '@mantine/styles/lib/theme/types/MantineTheme'

export function TableStyles(): MantineThemeComponents {
  return {
    Table: {
      defaultProps: {
        verticalSpacing: 'lg',
        highlightOnHover: true,
      },
      styles: {
        root: {
          td: {
            cursor: 'pointer',
          },
          'td:last-child, th:last-child': {
            textAlign: 'right',
          },
          'td:first-of-type, td:last-child': {
            fontWeight: 500,
          },
        },
      },
    },
  }
}
