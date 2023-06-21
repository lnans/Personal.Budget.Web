import { MantineThemeComponents } from '@mantine/styles/lib/theme/types/MantineTheme'

export function InputNumberStyles(): MantineThemeComponents {
  return {
    NumberInput: {
      defaultProps: {
        hideControls: true,
        precision: 2,
      },
    },
  }
}
