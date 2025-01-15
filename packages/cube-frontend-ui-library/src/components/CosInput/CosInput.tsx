import { forwardRef, InputHTMLAttributes, useId, ReactNode } from 'react'
import { CosInputSkeleton } from './CosInputSkeleton'
import classnames from 'classnames'

export type CosInputProps = InputHTMLAttributes<HTMLInputElement> & {
  isLoading?: boolean
  label?: string
  helpMessage?: string
  errorMessage?: string | boolean
  trailingIcon?: ReactNode
}

const getClassNames = (isError: boolean, hasIcon: boolean) => {
  const inputClasses = classnames(
    'primary-body2 w-full truncate rounded-[6px] border bg-grey-0 px-4 py-[9px] text-functional-text outline-none',
    'placeholder:text-functional-border-darker',
    'focus:border-functional-hover-primary',
    'disabled:border-functional-disable-text disabled:text-functional-disable-text disabled:placeholder:text-functional-border-divider',
    isError
      ? 'border-status-negative pr-8 hover:border-status-negative'
      : 'border-functional-border-divider hover:border-functional-hover-primary',
    hasIcon && 'pr-8',
    hasIcon && isError && 'pr-[56px]',
  )

  const footerClasses = classnames(
    'text-secondary-body4',
    isError ? 'text-status-negative' : 'text-functional-text-light',
  )

  return {
    inputClasses,
    footerClasses,
  }
}

export const CosInput = forwardRef<HTMLInputElement, CosInputProps>(
  (props: CosInputProps, ref) => {
    const {
      className,
      required = false,
      isLoading = false,
      label,
      helpMessage,
      errorMessage,
      trailingIcon,
      ...restProps
    } = props

    const defaultId = useId()
    const inputId = restProps.id || defaultId

    const hasValidErrorMessageToShow =
      !!errorMessage && typeof errorMessage === 'string'
    const hasFooterMessageToShow = !!helpMessage || hasValidErrorMessageToShow
    const hasCustomIconToShow = !!trailingIcon

    const { inputClasses, footerClasses } = getClassNames(
      hasValidErrorMessageToShow,
      hasCustomIconToShow,
    )

    const renderLabel = () => {
      if (!label) return null

      return isLoading ? (
        <CosInputSkeleton type="label" />
      ) : (
        <div className="primary-body2 flex space-x-1">
          <label className="font-semibold">{label}</label>
          {required && <span className="text-status-negative">*</span>}
        </div>
      )
    }

    const renderIcon = () => {
      const customIcon = (() => {
        if (hasCustomIconToShow) {
          return trailingIcon
        } else {
          return undefined
        }
      })()

      const errorIcon = (() => {
        if (hasValidErrorMessageToShow) {
          return <div className="size-10 rounded-full bg-status-negative"></div>
        } else {
          return undefined
        }
      })()

      return (
        <span className="absolute right-0 flex h-4 shrink-0 -translate-x-4 items-center justify-center gap-2 overflow-hidden [&>*]:size-4">
          {!!errorIcon && errorIcon}
          {!!customIcon && customIcon}
        </span>
      )
    }

    const renderFooterMessage = () => {
      if (!hasFooterMessageToShow) return null

      return isLoading ? (
        <CosInputSkeleton type="footerMessage" />
      ) : (
        <div className={footerClasses}>{errorMessage ?? helpMessage}</div>
      )
    }

    return (
      <div className={className}>
        <div className="min-w-[202px] max-w-[412px] space-y-[6px]">
          {renderLabel()}
          <div className="relative flex items-center">
            {isLoading ? (
              <CosInputSkeleton type="input" />
            ) : (
              <>
                <input
                  {...restProps}
                  id={inputId}
                  ref={ref}
                  className={inputClasses}
                  required={required}
                />
                {renderIcon()}
              </>
            )}
          </div>
          {renderFooterMessage()}
        </div>
      </div>
    )
  },
)

CosInput.displayName = 'CosInput'
