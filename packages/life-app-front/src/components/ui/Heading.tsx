import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, HtmlHTMLAttributes } from 'react'

import { cn } from '@/lib/tailwind-merge'

export type HeadingVariant = 'h1' | 'h2'

const htmlTagMap: Record<HeadingVariant, keyof Pick<JSX.IntrinsicElements, 'h1' | 'h2'>> = {
  h1: 'h1',
  h2: 'h2',
}

const headingVariants = cva('scroll-m-20 tracking-tight', {
  variants: {
    variant: {
      h1: 'text-4xl font-extrabold lg:text-5xl',
      h2: 'pb-2 text-3xl font-semibold first:mt-0',
    },
  },
  defaultVariants: {
    variant: 'h1',
  },
})

type HeadingProps = HtmlHTMLAttributes<HTMLHeadingElement> & VariantProps<typeof headingVariants>

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(({ className, variant, children, ...props }, ref) => {
  const Comp = htmlTagMap[variant || 'h1']

  return (
    <Comp className={cn(headingVariants({ variant, className }))} ref={ref} {...props}>
      {children}
    </Comp>
  )
})

Heading.displayName = 'Heading'

export default Heading
