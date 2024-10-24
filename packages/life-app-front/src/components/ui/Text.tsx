import { forwardRef, HtmlHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type TextProps = HtmlHTMLAttributes<HTMLParagraphElement>

const Text = forwardRef<HTMLParagraphElement, TextProps>(({ className, children, ...props }, ref) => {
  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} ref={ref} {...props}>
      {children}
    </p>
  )
})

Text.displayName = 'Text'

export default Text
