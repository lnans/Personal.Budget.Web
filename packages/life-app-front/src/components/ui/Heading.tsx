import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, HtmlHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4'

const htmlTagMap: Record<HeadingVariant, keyof Pick<JSX.IntrinsicElements, HeadingVariant>> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
}

const headingVariants = cva('scroll-m-20 tracking-tight', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
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
