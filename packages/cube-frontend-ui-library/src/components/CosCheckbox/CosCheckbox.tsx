import { cva } from 'class-variance-authority'
import { ChangeEvent, InputHTMLAttributes, RefObject, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import CheckboxUnselected from '../../components/CosIcon/monochrome/checkbox.svg?react'
import CheckboxSelected from '../../components/CosIcon/monochrome/checkbox_checked_filled.svg?react'
import CheckboxIndeterminate from '../../components/CosIcon/monochrome/checkbox_undeterminate_filled.svg?react'
import { CosCheckboxSkeleton } from './CosCheckboxSkeleton'

export type CosCheckboxVariant = 'primary' | 'secondary'

export type CosCheckboxStatus = 'unselected' | 'selected' | 'indeterminate'

export type CosCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'defaultChecked'
> & {
  /**
   * @default primary
   */
  variant?: CosCheckboxVariant
  label?: string
  labelClassName?: string
  /**
   * Use `null` for indeterminate state.
   */
  checked?: boolean | null
  /**
   * Use `null` for indeterminate state.
   */
  defaultChecked?: boolean | null
  isLoading?: boolean
  ref?: RefObject<HTMLInputElement | null>
}

const checkbox = {
  container: cva('primary-body2 inline-flex w-fit cursor-pointer gap-x-2', {
    variants: {
      disabled: {
        true: 'cursor-default',
      },
    },
  }),
  iconWrap: cva(
    [
      'shrink-0 p-0.5',
      'text-functional-border-darker transition-colors duration-100',
    ],
    {
      variants: {
        variant: {
          primary: '',
          secondary: '',
        },
        isSelected: {
          true: '',
        },
        disabled: {
          true: '',
        },
      },
      compoundVariants: [
        {
          variant: 'primary',
          isSelected: true,
          className: 'text-primary peer-hover:text-functional-hover-primary',
        },
        {
          variant: 'primary',
          disabled: true,
          className:
            'text-functional-disable-text peer-hover:text-functional-disable-text',
        },
        {
          variant: 'secondary',
          isSelected: true,
          className: 'text-blue-500 peer-hover:text-blue-700',
        },
        {
          variant: 'secondary',
          disabled: true,
          className:
            'text-functional-disable-text peer-hover:text-functional-disable-text',
        },
      ],
    },
  ),
  label: cva('max-w-[152px] text-functional-text', {
    variants: {
      disabled: {
        true: 'text-functional-disable-text',
      },
    },
  }),
}

export const CosCheckbox = (props: CosCheckboxProps) => {
  const {
    variant = 'primary',
    label,
    labelClassName,
    id,
    defaultChecked = false,
    checked: controlledChecked,
    onChange: onControlledCheckedChange,
    disabled,
    isLoading = false,
    ref,
    ...restProps
  } = props

  const [uncontrolledChecked, setUncontrolledChecked] = useState<
    boolean | null
  >(defaultChecked)

  const isControlled = controlledChecked !== undefined

  const effectiveChecked = isControlled
    ? controlledChecked
    : uncontrolledChecked

  const isIndeterminate = effectiveChecked === null

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledChecked(event.target.checked)
    }
    onControlledCheckedChange?.(event)
  }

  const renderIcon = () => {
    const IconComponent = (() => {
      if (isIndeterminate) return CheckboxIndeterminate
      return effectiveChecked ? CheckboxSelected : CheckboxUnselected
    })()

    return (
      <div
        className={twMerge(
          checkbox.iconWrap({
            variant,
            isSelected: effectiveChecked || isIndeterminate,
            disabled,
          }),
        )}
      >
        <IconComponent className="icon-md" />
      </div>
    )
  }

  if (isLoading) return <CosCheckboxSkeleton />

  return (
    <label htmlFor={id} className={twMerge(checkbox.container({ disabled }))}>
      <input
        {...restProps}
        id={id}
        ref={ref}
        type="checkbox"
        checked={effectiveChecked ?? false}
        onChange={handleChange}
        disabled={disabled}
        className="peer hidden"
      />
      {renderIcon()}
      {label && (
        <span className={twMerge(checkbox.label({ disabled }), labelClassName)}>
          {label}
        </span>
      )}
    </label>
  )
}
