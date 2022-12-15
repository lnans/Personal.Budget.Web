import { Box, BoxProps, SxProps } from '@mui/material'

type ImageProps = {
  src: string
  alt: string
  sx: SxProps
} & BoxProps

export default function Image({ src, alt, sx }: ImageProps) {
  return (
    <Box
      component="span"
      sx={{
        lineHeight: 0,
        display: 'block',
        overflow: 'hidden',
        '& .wrapper': { width: 1, height: 1, backgroundSize: 'cover !important' },
        ...sx,
      }}
    >
      <Box component="img" sx={{ width: 1, height: 1, objectFit: 'cover' }} src={src} alt={alt} />
    </Box>
  )
}
