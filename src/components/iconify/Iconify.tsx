import { Icon } from '@iconify/react'
import { Box, BoxProps, SxProps, Theme } from '@mui/material'
import { forwardRef } from 'react'

type IconifyProps = {
  icon: string
  width?: string | number
  sx?: SxProps<Theme>
}

const Iconify = forwardRef<BoxProps, IconifyProps>(({ icon, width = 20, sx, ...other }, ref) => (
  <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
))

Iconify.displayName = 'Iconify'

export default Iconify
