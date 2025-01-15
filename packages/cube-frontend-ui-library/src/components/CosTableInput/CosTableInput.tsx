import { forwardRef, InputHTMLAttributes, useId } from 'react'
import classnames from 'classnames'
import { CosTableInputSkeleton } from './CosTableInputSkeleton'

export type CosTableInputProps = InputHTMLAttributes<HTMLInputElement> & {
  isLoading?: boolean
  errorMessage?: string | boolean
}

const getClassName = (isError: boolean) => {
  const inputClasses = classnames(
    'primary-body3 w-full truncate rounded-[6px] border bg-grey-0 px-3 py-2 text-functional-text outline-none',
    'placeholder:text-functional-border-darker',
    'focus:border-functional-hover-primary',
    'disabled:border-functional-disable-text disabled:text-functional-disable-text disabled:placeholder:text-functional-border-divider',
    isError
      ? 'border-status-negative hover:border-status-negative'
      : 'border-functional-border-divider hover:border-functional-hover-primary',
  )
  return inputClasses
}

export const CosTableInput = forwardRef<HTMLInputElement, CosTableInputProps>(
  (props: CosTableInputProps, ref) => {
    const { className, isLoading = false, errorMessage, ...restProps } = props

    const defaultId = useId()
    const inputId = restProps.id || defaultId

    const isError = !!errorMessage

    const inputClasses = getClassName(isError)

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
                className={inputClasses}
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
