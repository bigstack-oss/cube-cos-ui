import { ChangeEvent, forwardRef, InputHTMLAttributes, useState } from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import CheckboxUnselected from '../../components/CosIcon/monochrome/checkbox.svg?react'
import CheckboxSelected from '../../components/CosIcon/monochrome/checkbox_checked_filled.svg?react'
import CheckboxIndeterminate from '../../components/CosIcon/monochrome/checkbox_undeterminate_filled.svg?react'
import { CosCheckboxSkeleton } from './CosCheckboxSkeleton'

export type CosCheckboxStatus = 'unselected' | 'selected' | 'indeterminate'

export type CosCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'defaultChecked'
> & {
  label: string
  indeterminate?: boolean
  checked?: boolean | null
  defaultChecked?: boolean | null
  isLoading?: boolean
}

const checkbox = {
  container: cva(
    'inline-flex w-fit cursor-pointer gap-x-2 text-primary-body2',
    {
      variants: {
        disabled: {
          true: 'cursor-default',
        },
      },
    },
  ),
  icon: cva(
    [
      'icon-md mt-0.5 shrink-0',
      'text-functional-border-darker hover:text-functional-hover-primary',
    ],
    {
      variants: {
        isSelected: {
          true: 'text-primary',
        },
        disabled: {
          true: 'text-functional-disable-text hover:text-functional-disable-text',
        },
      },
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

export const CosCheckbox = forwardRef<HTMLInputElement, CosCheckboxProps>(
  (props: CosCheckboxProps, ref) => {
    const {
      label,
      indeterminate,
      id,
      className,
      defaultChecked,
      checked: controlledChecked,
      onChange: onControlledCheckedChange,
      disabled,
      isLoading = false,
      ...restProps
    } = props

    const [uncontrolledChecked, setUncontrolledChecked] = useState<
      boolean | null
    >(defaultChecked || indeterminate ? null : false)

    const isControlled = controlledChecked !== undefined

    const effectiveChecked = isControlled
      ? controlledChecked
      : uncontrolledChecked

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledChecked(event.target.checked)
      }
      onControlledCheckedChange?.(event)
    }

    const renderIcon = (checked: boolean | null, indeterminate?: boolean) => {
      const className = twMerge(
        checkbox.icon({
          disabled,
          isSelected: effectiveChecked === null || effectiveChecked,
        }),
      )

      const IconComponent = (() => {
        if (indeterminate && checked === null) return CheckboxIndeterminate
        return checked ? CheckboxSelected : CheckboxUnselected
      })()

      return <IconComponent className={className} />
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
          className="hidden"
        />
        {renderIcon(effectiveChecked, indeterminate)}
        <span className={twMerge(checkbox.label({ disabled }))}>{label}</span>
      </label>
    )
  },
)
