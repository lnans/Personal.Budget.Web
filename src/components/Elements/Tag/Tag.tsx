import { Badge, MantineColor } from '@mantine/core'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

type TagProps = {
  label?: string
  color: MantineColor
} & Omit<ComponentPropsWithoutRef<'div'>, 'color'>

const Tag = forwardRef<HTMLDivElement, TagProps>(({ label, color, ...others }: TagProps, ref) => {
  return (
    <div ref={ref} {...others}>
      <Badge radius="sm" role="listitem" color={color} variant="dot">
        {label}
      </Badge>
    </div>
  )
})

Tag.displayName = 'Tag'

export { Tag }
