import { ChangeEvent, forwardRef, InputHTMLAttributes, useState } from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import RadioButtonUnselected from '../../components/CosIcon/monochrome/radio_button.svg?react'
import RadioButtonSelected from '../../components/CosIcon/monochrome/radio_button_filled.svg?react'
import { CosRadioButtonSkeleton } from './CosRadioButtonSkeleton'

export type CosRadioButtonProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  isLoading?: boolean
}

const radioButton = {
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

export const CosRadioButton = forwardRef<HTMLInputElement, CosRadioButtonProps>(
  (props: CosRadioButtonProps, ref) => {
    const {
      label,
      id,
      className,
      defaultChecked,
      checked: controlledChecked,
      onChange: onControlledCheckedChange,
      disabled,
      isLoading = false,
      ...restProps
    } = props

    const [uncontrolledChecked, setUncontrolledChecked] = useState<boolean>(
      defaultChecked || false,
    )

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

    const renderIcon = (checked: boolean) => {
      const className = twMerge(
        radioButton.icon({ disabled, isSelected: effectiveChecked }),
      )

      const IconComponent = (() => {
        return checked ? RadioButtonSelected : RadioButtonUnselected
      })()

      return <IconComponent className={className} />
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
          className="hidden"
        />
        {renderIcon(effectiveChecked)}
        <span className={twMerge(radioButton.label({ disabled }))}>
          {label}
        </span>
      </label>
    )
  },
)
