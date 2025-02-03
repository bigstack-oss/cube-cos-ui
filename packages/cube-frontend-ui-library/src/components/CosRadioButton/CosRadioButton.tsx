import { ChangeEvent, InputHTMLAttributes, RefObject, useState } from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import RadioButtonUnselected from '../../components/CosIcon/monochrome/radio_button.svg?react'
import RadioButtonSelected from '../../components/CosIcon/monochrome/radio_button_filled.svg?react'
import { CosRadioButtonSkeleton } from './CosRadioButtonSkeleton'

export type CosRadioButtonProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  isLoading?: boolean
  ref?: RefObject<HTMLInputElement | null>
}

const radioButton = {
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
      'text-functional-border-darker transition-colors duration-100 peer-hover:text-functional-hover-primary',
    ],
    {
      variants: {
        isSelected: {
          true: 'text-primary',
        },
        disabled: {
          true: 'text-functional-disable-text peer-hover:text-functional-disable-text',
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

export const CosRadioButton = (props: CosRadioButtonProps) => {
  const {
    label,
    id,
    ref,
    defaultChecked = false,
    checked: controlledChecked,
    onChange: onControlledCheckedChange,
    disabled,
    isLoading = false,
    ...restProps
  } = props

  const [uncontrolledChecked, setUncontrolledChecked] =
    useState<boolean>(defaultChecked)

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

  const renderIcon = () => {
    const IconComponent = effectiveChecked
      ? RadioButtonSelected
      : RadioButtonUnselected
    return (
      <div
        className={twMerge(
          radioButton.iconWrap({ disabled, isSelected: effectiveChecked }),
        )}
      >
        <IconComponent className="icon-md" />
      </div>
    )
  }

  if (isLoading) return <CosRadioButtonSkeleton />

  return (
    <label
      htmlFor={id}
      className={twMerge(radioButton.container({ disabled }))}
    >
      <input
        {...restProps}
        id={id}
        ref={ref}
        type="radio"
        checked={effectiveChecked ?? false}
        onChange={handleChange}
        disabled={disabled}
        className="peer hidden"
      />
      {renderIcon()}
      <span className={twMerge(radioButton.label({ disabled }))}>{label}</span>
    </label>
  )
}
