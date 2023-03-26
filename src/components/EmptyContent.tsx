import { styled, Typography } from '@mui/material'
import { ImageBox } from 'components'

const Div = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 2),
}))

type EmptyContentProps = {
  title: string
  description?: string
  img?: string
  height?: number
}

export default function EmptyContent({ title, description, img, height = 240 }: EmptyContentProps) {
  return (
    <Div sx={{ '& span.MuiBox-root': { height } }}>
      <ImageBox alt="empty content" src={img || '/assets/illustrations/illustration_empty_content.svg'} sx={{ height: 240, mb: 3 }} />

      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </Div>
  )
}
