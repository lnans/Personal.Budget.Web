import { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/tailwind-merge'

type ButtonIconProps = HTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode
}

function ButtonIcon({ icon, className, ...props }: ButtonIconProps) {
  return (
    <button
      className={cn(
        'border border-solid border-neutral-300 p-1 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors',
        className
      )}
      {...props}
    >
      {icon}
    </button>
  )
}

export default ButtonIcon
