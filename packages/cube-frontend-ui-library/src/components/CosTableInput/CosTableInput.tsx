import { forwardRef, InputHTMLAttributes, useId } from 'react'
import { CosTableInputSkeleton } from './CosTableInputSkeleton'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

export type CosTableInputProps = InputHTMLAttributes<HTMLInputElement> & {
  isLoading?: boolean
  errorMessage?: string | boolean
}

const input = cva(
  [
    'primary-body3 w-full truncate rounded-[6px] px-3 py-2 outline-none',
    'bg-grey-0',
    'text-functional-text placeholder:text-functional-border-darker',
    'border border-functional-border-divider',
    'hover:border-functional-hover-primary focus:border-functional-hover-primary',
  ],
  {
    variants: {
      isError: {
        true: 'border-status-negative hover:border-status-negative',
      },
      disabled: {
        true: [
          'disabled:border-functional-disable-text disabled:text-functional-disable-text disabled:placeholder:text-functional-border-divider',
          'disabled:hover:border-functional-disable-text',
        ],
      },
    },
  },
)

export const CosTableInput = forwardRef<HTMLInputElement, CosTableInputProps>(
  (props: CosTableInputProps, ref) => {
    const {
      className,
      isLoading = false,
      errorMessage,
      disabled,
      ...restProps
    } = props

    const defaultId = useId()
    const inputId = restProps.id || defaultId

    const isError = !!errorMessage

    const renderErrorIcon = () => {
      const Icon = (() => {
        if (isError) {
          return <div className="size-10 rounded-full bg-status-negative"></div>
        }
      })()

      return (
        <div className="absolute right-0 flex size-4 shrink-0 translate-x-6 items-center justify-center overflow-hidden [&>*]:size-4">
          {Icon}
        </div>
      )
    }

    return (
      <div className={className}>
        <div className="min-w-[59px] max-w-[344px] space-y-[6px]">
          <div className="relative flex items-center">
            {isLoading ? (
              <CosTableInputSkeleton />
            ) : (
              <input
                {...restProps}
                id={inputId}
                ref={ref}
                disabled={disabled}
                className={twMerge(input({ isError, disabled }))}
              />
            )}
            {renderErrorIcon()}
          </div>
        </div>
      </div>
    )
  },
)

CosTableInput.displayName = 'CosTableInput'
