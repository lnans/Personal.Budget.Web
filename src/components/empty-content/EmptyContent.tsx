import { Typography } from '@mui/material'
import { Image } from 'components'

import * as Styled from './Styles'

type EmptyContentProps = {
  title: string
  description?: string
  img?: string
  height?: number
}

export default function EmptyContent({ title, description, img, height = 240 }: EmptyContentProps) {
  return (
    <Styled.Div sx={{ '& span.MuiBox-root': { height } }}>
      <Image alt="empty content" src={img || '/assets/illustrations/illustration_empty_content.svg'} sx={{ height: 240, mb: 3 }} />

      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </Styled.Div>
  )
}
