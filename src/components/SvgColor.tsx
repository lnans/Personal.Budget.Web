import { Box, BoxProps, SxProps, Theme } from '@mui/material'
import { forwardRef } from 'react'

type SvgColorProps = {
  src: string
  sx: SxProps<Theme>
}

const SvgColor = forwardRef<BoxProps, SvgColorProps>(({ src, sx, ...other }, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
))

SvgColor.displayName = 'SvgColor'

export default SvgColor
