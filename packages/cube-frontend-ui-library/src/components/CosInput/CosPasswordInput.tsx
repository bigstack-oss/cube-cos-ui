import { ComponentProps, useState } from 'react'
import { CosInput, CosInputProps } from './CosInput'

const ViewIcon = (props: ComponentProps<'div'>) => (
  <div {...props} className="size-10 rounded-full bg-status-positive"></div>
)

const ViewOffIcon = (props: ComponentProps<'div'>) => (
  <div {...props} className="size-10 rounded-full bg-status-warning"></div>
)

type CosPasswordInput = Omit<CosInputProps, 'trailingIcon' | 'type'> & {
  defaultShowText?: boolean
}

export const CosPasswordInput = (props: CosPasswordInput) => {
  const { defaultShowText = false, disabled } = props
  const [showPassword, setShowPassword] = useState<boolean>(defaultShowText)
  const handleShowHide = () => {
    setShowPassword((prev) => !prev)
  }

  const IconComponent = showPassword ? ViewOffIcon : ViewIcon

  return (
    <CosInput
      {...props}
      type={showPassword ? 'text' : 'password'}
      trailingIcon={
        <IconComponent onClick={disabled ? undefined : handleShowHide} />
      }
    />
  )
}
