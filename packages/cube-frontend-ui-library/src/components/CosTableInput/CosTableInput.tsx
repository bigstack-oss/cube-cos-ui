import { cva } from 'class-variance-authority'
import { forwardRef, InputHTMLAttributes, useId } from 'react'
import { twMerge } from 'tailwind-merge'
import WarningFilled from '../CosIcon/monochrome/warning_filled.svg?react'
import { CosTooltip } from '../CosTooltip/CosTooltip'
import { CosTableInputSkeleton } from './CosTableInputSkeleton'

export type CosTableInputProps = InputHTMLAttributes<HTMLInputElement> & {
  isLoading?: boolean
  errorMessage?: string | boolean
}

const input = cva(
  [
    'primary-body3 h-full min-w-[35px] max-w-[320px] grow truncate rounded-[6px] px-3 py-2 outline-none',
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
      return (
        <div className="flex size-4 shrink-0 items-center justify-center">
          {isError && (
            <CosTooltip
              hoverContent={{
                message: errorMessage?.toString(),
              }}
            >
              <WarningFilled className="icon-md text-status-negative" />
            </CosTooltip>
          )}
        </div>
      )
    }

    return (
      <div className="flex items-center gap-x-2">
        {isLoading ? (
          <CosTableInputSkeleton />
        ) : (
          <input
            {...restProps}
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={twMerge(input({ isError, disabled }), className)}
          />
        )}
        {renderErrorIcon()}
      </div>
    )
  },
)

CosTableInput.displayName = 'CosTableInput'
