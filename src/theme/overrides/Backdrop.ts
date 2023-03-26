import { alpha, Theme } from '@mui/material/styles'

export default function Backdrop(theme: Theme) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: alpha(theme.palette.grey[900], 0.6),
          '&.MuiBackdrop-invisible': {
            background: 'transparent',
          },
        },
      },
    },
  }
}
