import { Chip, createStyles } from '@mantine/core'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

type TagProps = {
  label?: string
  color: string
} & ComponentPropsWithoutRef<'div'>

const useStyles = createStyles((_, { color }: { color: string }) => ({
  main: {
    '& label': {
      color,
      borderColor: `${color}5c`,
      backgroundColor: `${color}36`,
      fontWeight: 500,
      '&:hover': {
        backgroundColor: `${color}36`,
      },
    },
  },
}))

const Tag = forwardRef<HTMLDivElement, TagProps>(({ label, color, ...others }: TagProps, ref) => {
  const { classes } = useStyles({ color })
  return (
    <div ref={ref} {...others}>
      <Chip className={classes.main} size="xs" radius="sm" checked={false} role="listitem">
        {label}
      </Chip>
    </div>
  )
})

Tag.displayName = 'Tag'

export { Tag }
