import { Icon } from '@iconify/react'
import { Box, BoxProps, SxProps, Theme } from '@mui/material'
import { forwardRef } from 'react'

type IconifyProps = {
  icon: string
  width?: string | number
  height?: string | number
  sx?: SxProps<Theme>
}

const Iconify = forwardRef<BoxProps, IconifyProps>(({ icon, width = 20, height = 20, sx, ...other }, ref) => (
  <Box ref={ref} component={Icon} icon={icon} sx={{ width, height, ...sx }} {...other} />
))

Iconify.displayName = 'Iconify'

export default Iconify
