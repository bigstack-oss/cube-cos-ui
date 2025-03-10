import { cloneElement, forwardRef, InputHTMLAttributes, useId } from 'react'
import { CosInputSkeleton } from './CosInputSkeleton'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { SvgElement } from '../CosIcon/CosIcon'
import WarningFilled from '../CosIcon/monochrome/warning_filled.svg?react'

export type CosInputProps = InputHTMLAttributes<HTMLInputElement> & {
  isLoading?: boolean
  label?: string
  helpMessage?: string
  errorMessage?: string | boolean
  trailingIcon?: SvgElement
}

const input = cva(
  [
    'primary-body2 w-full truncate rounded-[6px] py-[9px] outline-none',
    'bg-grey-0',
    'text-functional-text placeholder:text-functional-border-darker',
    'border border-functional-border-divider',
    'hover:border-functional-hover-primary focus:border-functional-hover-primary',
  ],
  {
    variants: {
      isError: {
        true: [
          'pl-4 pr-8',
          'border-status-negative hover:border-status-negative',
        ],
      },
      disabled: {
        true: [
          'disabled:border-functional-disable-text disabled:text-functional-disable-text disabled:placeholder:text-functional-border-divider',
          'disabled:hover:border-functional-disable-text',
        ],
      },
      hasIcon: {
        true: 'pl-4 pr-8',
        false: 'px-4',
      },
    },
    compoundVariants: [
      { isError: true, hasIcon: true, class: 'pr-[56px]' },
      { isError: true, hasIcon: false, class: 'pr-9' },
    ],
  },
)

const footer = cva('primary-body4', {
  variants: {
    isError: {
      true: 'text-status-negative',
      false: 'text-functional-text-light',
    },
  },
})

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
      disabled,
      ...restProps
    } = props

    const defaultId = useId()
    const inputId = restProps.id || defaultId

    const isError = !!errorMessage && typeof errorMessage === 'string'
    const hasFooterMessage = !!helpMessage || isError
    const hasIcon = !!trailingIcon

    const renderLabel = () => {
      if (!label) return null

      return isLoading ? (
        <CosInputSkeleton type="label" />
      ) : (
        <div className="primary-body2 flex space-x-1">
          <label htmlFor={inputId} className="font-semibold">
            {label}
          </label>
          {required && <span className="text-status-negative">*</span>}
        </div>
      )
    }

    const renderIcon = () => {
      const errorIcon = (() => {
        if (isError) {
          return <WarningFilled className="icon-md text-status-negative" />
        } else {
          return undefined
        }
      })()

      const customIcon = (() => {
        if (!hasIcon) {
          return undefined
        }
        const colorClass = twMerge(
          disabled ? 'text-functional-border-divider' : 'text-functional-text',
        )
        const cursorClass = twMerge(
          disabled ? 'cursor-default' : 'cursor-pointer',
        )
        return cloneElement(trailingIcon, {
          className: twMerge(
            trailingIcon.props.className,
            // Overrides icon size, color, and cursor style within the input.
            'icon-md',
            colorClass,
            cursorClass,
          ),
        })
      })()

      return (
        <span className="absolute right-0 flex h-4 shrink-0 -translate-x-4 items-center justify-center gap-2 overflow-hidden">
          {errorIcon}
          {customIcon}
        </span>
      )
    }

    const renderFooterMessage = () => {
      if (!hasFooterMessage) return null

      return isLoading ? (
        <CosInputSkeleton type="footerMessage" />
      ) : (
        <div className={twMerge(footer({ isError }))}>
          {errorMessage ?? helpMessage}
        </div>
      )
    }

    return (
      <div className="min-w-[202px] space-y-[6px]">
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
                disabled={disabled}
                className={twMerge(
                  input({ isError, disabled, hasIcon }),
                  className,
                )}
                required={required}
              />
              {renderIcon()}
            </>
          )}
        </div>
        {renderFooterMessage()}
      </div>
    )
  },
)

CosInput.displayName = 'CosInput'
