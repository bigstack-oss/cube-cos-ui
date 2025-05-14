import { ChangeEvent, InputHTMLAttributes, RefObject, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import CheckboxUnselected from '../../components/CosIcon/monochrome/checkbox.svg?react'
import CheckboxSelected from '../../components/CosIcon/monochrome/checkbox_checked_filled.svg?react'
import CheckboxIndeterminate from '../../components/CosIcon/monochrome/checkbox_undeterminate_filled.svg?react'
import { CosCheckboxSkeleton } from './CosCheckboxSkeleton'
import { checkbox } from './styles'

export type CosCheckboxColor =
  | 'primary'
  | 'primary-dark'
  | 'secondary'
  | 'secondary-dark'

export type CosCheckboxStatus = 'unselected' | 'selected' | 'indeterminate'

export type CosCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'defaultChecked'
> & {
  /**
   * @default primary
   */
  color?: CosCheckboxColor
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

export const CosCheckbox = (props: CosCheckboxProps) => {
  const {
    color = 'primary',
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
            color,
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
        <span
          className={twMerge(
            checkbox.label({ color, disabled }),
            labelClassName,
          )}
        >
          {label}
        </span>
      )}
    </label>
  )
}
