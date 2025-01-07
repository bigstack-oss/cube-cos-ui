import { forwardRef, InputHTMLAttributes, useId, ReactNode } from 'react'
import { CosInputSkeleton } from './CosInputSkeleton'
import classnames from 'classnames'

export type CosInputProps = InputHTMLAttributes<HTMLInputElement> & {
  isLoading?: boolean
  label?: string
  helpMessage?: string
  errorMessage?: string | boolean
  trailingIcon?: ReactNode
  showEllipsis?: boolean
}

const getClassNames = (
  isError: boolean,
  isIcon: boolean,
  showEllipsis: boolean,
) => {
  const containerClasses = 'min-w-[170px] max-w-[380px] space-y-[6px]'

  const inputClasses = classnames(
    'w-full rounded-[6px] border px-4 py-[9px] text-primary-body2 text-functional-text outline-none',
    'placeholder:text-functional-border-darker',
    'focus:border-functional-hover-primary',
    'disabled:border-functional-disable-text disabled:bg-grey-0 disabled:text-functional-disable-text disabled:placeholder:text-functional-border-divider',
    isError
      ? 'border-status-negative pr-8 hover:border-status-negative'
      : 'border-functional-border-divider hover:border-functional-hover-primary',
    isIcon && 'pr-8',
    isIcon && isError && 'pr-[64px]',
    showEllipsis && 'truncate',
  )

  const iconClasses = classnames(
    'absolute right-0 flex h-4 -translate-x-4 items-center justify-center gap-2 overflow-hidden',
    '[&>*]:size-4 [&>*]:object-contain',
  )

  const footerClasses = classnames(
    'text-secondary-body4',
    isError ? 'text-status-negative' : 'text-functional-text-light',
  )

  return {
    containerClasses,
    inputClasses,
    iconClasses,
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
      showEllipsis = false,
      ...inputProps
    } = props

    const defaultId = useId()
    const inputId = inputProps.id || defaultId

    const hasValidErrorMessageToShow =
      !!errorMessage && typeof errorMessage === 'string'
    const hasFooterMessageToShow = !!helpMessage || hasValidErrorMessageToShow
    const hasCustomIconToShow = !!trailingIcon

    const { containerClasses, inputClasses, iconClasses, footerClasses } =
      getClassNames(
        hasValidErrorMessageToShow,
        hasCustomIconToShow,
        showEllipsis,
      )

    const renderLabel = () => {
      if (!label) return null

      return isLoading ? (
        <CosInputSkeleton type="label" />
      ) : (
        <div className="flex space-x-1 font-inter text-secondary-body2">
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
        <span className={iconClasses}>
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
      <div className={classnames(className)}>
        <div className={containerClasses}>
          {renderLabel()}
          <div className="relative flex items-center">
            {isLoading ? (
              <CosInputSkeleton type="input" />
            ) : (
              <input
                {...inputProps}
                id={inputId}
                ref={ref}
                className={inputClasses}
                required={required}
              />
            )}
            {!isLoading && renderIcon()}
          </div>
          {renderFooterMessage()}
        </div>
      </div>
    )
  },
)

CosInput.displayName = 'CosInput'
