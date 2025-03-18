import { ChangeEvent, useState } from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { CosTextAreaSkeleton } from './CosTextAreaSkeleton'
import { useTextAreaOverflow } from './useTextAreaOverflow'

const textarea = cva(
  [
    'primary-body2 rounded-[5px] bg-grey-0 px-4 py-[10px] outline-none',
    'max-h-[260px] min-h-[140px] min-w-[280px]',
    'text-functional-text placeholder:text-functional-border-darker',
    'border border-functional-border-divider',
    'hover:border-functional-hover-primary focus:border-functional-hover-primary',
  ],
  {
    variants: {
      isError: {
        true: 'border-status-negative hover:border-status-negative',
      },
      isFocused: {
        true: 'overflow-auto',
        false: 'overflow-hidden',
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

export type CosTextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label: string
  maxLength: number
  isLoading?: boolean
  errorMessage?: string
}

export const CosTextArea = (props: CosTextAreaProps) => {
  const {
    id: textAreaId,
    className,
    disabled,
    value: valueProps,
    onChange,
    label,
    maxLength,
    isLoading,
    errorMessage,
  } = props

  const {
    formattedValue,
    displayValue,
    textareaRef,
    mirrorRef,
    isFocused,
    setIsFocused,
  } = useTextAreaOverflow({ valueProps, maxLength })

  const [charCount, setCharCount] = useState(formattedValue.length)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setCharCount(newValue.length)
    onChange?.(e)
  }

  if (isLoading) {
    return <CosTextAreaSkeleton />
  }

  return (
    <div className="flex flex-col gap-[6px]">
      <div className="flex items-center justify-between">
        <label
          htmlFor={textAreaId}
          className="primary-body2 font-semibold text-functional-text"
        >
          {label}
        </label>
        <div className="secondary-body4 text-functional-text-light">
          {charCount}/{maxLength}
        </div>
      </div>
      {/**
       * Mirror div is set for calculation of the displayed texts
       * When textarea is not focused, displays text according to the textarea  size
       */}
      <div
        ref={mirrorRef}
        className="pointer-events-none absolute left-0 top-0 w-full whitespace-pre-wrap break-words opacity-0"
      ></div>
      <textarea
        {...props}
        ref={textareaRef}
        value={isFocused ? valueProps : displayValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={twMerge(
          textarea({ isError: !!errorMessage, isFocused, disabled }),
          className,
        )}
      />

      {errorMessage && (
        <p className="primary-body4 text-status-negative">{errorMessage}</p>
      )}
    </div>
  )
}
