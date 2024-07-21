import { cva } from 'class-variance-authority'
import { forwardRef, LabelHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70')

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/no-noninteractive-element-interactions
    <label
      {...props}
      ref={ref}
      className={cn(labelVariants(), className)}
      onMouseDown={(event) => {
        // only prevent text selection if clicking inside the label itself
        const target = event.target as HTMLElement
        if (target.closest('button, input, select, textarea')) return

        props.onMouseDown?.(event)
        // prevent text selection when double clicking label
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault()
      }}
    />
  )
})

Label.displayName = 'Label'

export { Label }
