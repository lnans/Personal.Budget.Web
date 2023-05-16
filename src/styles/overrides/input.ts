import { rem } from '@mantine/styles'
import { MantineThemeComponents } from '@mantine/styles/lib/theme/types/MantineTheme'

export function InputStyles(): MantineThemeComponents {
  return {
    Input: {
      styles: (theme) => ({
        wrapper: {
          marginBottom: 0,
        },
        input: {
          '&:not(:focus):not([data-invalid="true"]):hover': {
            borderColor:
              theme.colorScheme === 'light' ? theme.colors.gray[7] : theme.colors.gray[6],
          },
        },
      }),
    },
    InputWrapper: {
      styles: {
        root: {
          position: 'relative',
        },
        error: {
          position: 'absolute',
          right: 0,
          marginInline: rem(8),
          marginTop: rem(2),
        },
      },
    },
  }
}
