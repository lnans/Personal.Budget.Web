import { MantineThemeComponents } from '@mantine/styles/lib/theme/types/MantineTheme'

export function ModalStyles(): MantineThemeComponents {
  return {
    Modal: {
      defaultProps: (theme) => ({
        padding: 'xl',
        overlayProps: {
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        },
      }),
    },
  }
}
