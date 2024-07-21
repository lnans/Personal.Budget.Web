import { Slot } from '@radix-ui/react-slot'
import { Icon, IconLoader2, IconProps } from '@tabler/icons-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react'

import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300',
  {
    variants: {
      variant: {
        default: 'bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90',
        destructive: 'bg-red-500 text-zinc-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90',
        outline:
          'border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
        secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80',
        ghost: 'hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
        link: 'text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const iconVariants = cva('', {
  variants: {
    size: {
      default: 'mr-2 size-4.5',
      sm: 'mr-2 size-4.5',
      lg: 'mr-2 size-4.5',
      icon: 'size-5.5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
    icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>
    asChild?: boolean
  }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, loading, disabled, icon: Icon, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} disabled={disabled || loading}>
        <div className="inline-flex items-center justify-center whitespace-nowrap">
          {loading && <IconLoader2 className="mr-2 size-4.5 animate-spin" />}
          {!loading && Icon && <Icon className={iconVariants({ size })} />}
          {children}
        </div>
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button }
