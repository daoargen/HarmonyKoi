import * as React from 'react'

import { ObserveInput } from '../../hooks/useTeddyAnimation'
import { cn } from '../../lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  observeInput?: ObserveInput
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, observeInput, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
      onChange={(e) => {
        observeInput?.onChange?.(e)
        props.onChange?.(e)
      }}
      onFocus={(e) => {
        observeInput?.onFocus?.(e)
        props.onFocus?.(e)
      }}
      onBlur={(e) => {
        observeInput?.onBlur?.()
        props.onBlur?.(e)
      }}
    />
  )
})
Input.displayName = 'Input'

export { Input }
