import { AppBar as MuiAppBar, AppBarProps as MuiAppBarProps } from '@mui/material'
import { alpha, styled, Theme } from '@mui/material/styles'

const HEIGHT = 92
const HEIGHT_OFFSET = HEIGHT - 32

function styles(theme: Theme) {
  return {
    bgBlur: () => {
      const color = theme?.palette.background.default || '#000000'

      const blur = 6
      const opacity = 0.8

      return {
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
      }
    },
  }
}

type AppBarProps = {
  isOffset: boolean
} & MuiAppBarProps

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'isOffset',
})<AppBarProps>(({ isOffset, theme }) => ({
  ...styles(theme).bgBlur(),
  boxShadow: 'none',
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  width: `calc(100% - ${280 + 1}px)`,
  height: HEIGHT,
  ...(isOffset && {
    height: HEIGHT_OFFSET,
  }),
}))

export { AppBar, HEIGHT }
