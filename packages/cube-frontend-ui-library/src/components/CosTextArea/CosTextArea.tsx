import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { CosTextAreaSkeleton } from './CosTextAreaSkeleton'
import { assignRefValue, normalizeValue } from './cosTextAreaUtils'

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
    ref,
    className,
    disabled,
    value: valueProps,
    onChange,
    label,
    maxLength,
    isLoading,
    errorMessage,
    ...restProps
  } = props

  /**
   * To turn the value from props into string
   */
  const normalizedValue = normalizeValue(valueProps)

  const [charCount, setCharCount] = useState(normalizedValue.length)

  const [isFocused, setIsFocused] = useState(false)

  const [visibleRowsCount, setVisibleRowsCount] = useState(0)

  const localRef = useRef<HTMLTextAreaElement | null>(null)

  /**
   * Calculate visible rows
   * and update `visibleRowsCount` when the textarea resizes.
   */
  useEffect(() => {
    const textarea = localRef.current

    let observer: ResizeObserver | undefined = undefined

    if (textarea) {
      observer = new ResizeObserver((entries) => {
        const { lineHeight } = getComputedStyle(textarea)
        const lineHeightPx = parseInt(lineHeight)
        const textareaHeight = entries[0]?.contentBoxSize[0]?.blockSize ?? 0
        setVisibleRowsCount(
          Math.ceil((textareaHeight + textarea.scrollTop) / lineHeightPx),
        )
      })
      observer.observe(textarea)
    }

    return () => {
      observer?.disconnect()
    }
  }, [])

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
      <textarea
        {...restProps}
        ref={(element) => {
          /**
           * Assign the textarea element to the external `ref` passed to `CosTextArea` (if any),
           * allowing parent components to access the textarea's reference.
           */
          assignRefValue(ref, element)
          /**
           * Assign the textarea element to the internal `localRef`,
           * which is used for local operations such as calculating visible rows.
           */
          assignRefValue(localRef, element)
        }}
        value={valueProps}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={twMerge(
          textarea({ isError: !!errorMessage, disabled }),
          className,
        )}
        style={
          isFocused
            ? undefined
            : {
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: visibleRowsCount,
              }
        }
      />
      {errorMessage && (
        <p className="primary-body4 text-status-negative">{errorMessage}</p>
      )}
    </div>
  )
}
