import { forwardRef, InputHTMLAttributes, useId } from 'react'
import classnames from 'classnames'
import { CosTableInputSkeleton } from './CosTableInputSkeleton'

export type CosTableInputProps = InputHTMLAttributes<HTMLInputElement> & {
  isLoading?: boolean
  errorMessage?: string | boolean
  showEllipsis?: boolean
}

const getClassNames = (isError: boolean, showEllipsis: boolean) => {
  const containerClasses = 'min-w-[60px] max-w-[320px] space-y-[6px]'

  const inputClasses = classnames(
    'w-full rounded-[6px] border px-3 py-2 text-primary-body3 text-functional-text outline-none placeholder:text-functional-border-darker focus:border-functional-hover-primary',
    'disabled:border-functional-disable-text disabled:bg-grey-0 disabled:text-functional-disable-text disabled:placeholder:text-functional-border-divider',
    isError
      ? 'border-status-negative hover:border-status-negative'
      : 'border-functional-border-divider hover:border-functional-hover-primary',
    showEllipsis && 'truncate',
  )

  const iconClasses = classnames(
    'absolute right-0 flex size-4 translate-x-6 items-center justify-center overflow-hidden',
    '[&>*]:z-10 [&>*]:size-4 [&>*]:object-contain',
  )

  return {
    containerClasses,
    inputClasses,
    iconClasses,
  }
}

export const CosTableInput = forwardRef<HTMLInputElement, CosTableInputProps>(
  (props: CosTableInputProps, ref) => {
    const {
      className,

      isLoading = false,
      errorMessage,
      showEllipsis = false,
      ...inputProps
    } = props

    const defaultId = useId()
    const inputId = inputProps.id || defaultId

    const isError = !!errorMessage
    const hasValidErrorMessageToShow =
      isError && typeof errorMessage === 'string' && errorMessage !== ''

    const { containerClasses, inputClasses, iconClasses } = getClassNames(
      isError,
      showEllipsis,
    )

    const renderErrorIcon = () => {
      const Icon = (() => {
        if (hasValidErrorMessageToShow) {
          return <div className="size-10 rounded-full bg-status-negative"></div>
        } else if (isError) {
          return <div className="size-10 rounded-full bg-status-negative"></div>
        } else {
          return null
        }
      })()
      return <div className={iconClasses}>{Icon}</div>
    }

    return (
      <div className={classnames(className)}>
        <div className={containerClasses}>
          <div className="relative flex items-center">
            {isLoading ? (
              <CosTableInputSkeleton />
            ) : (
              <input
                {...inputProps}
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
