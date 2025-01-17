import { ComponentProps, useState } from 'react'
import { CosInput, CosInputProps } from './CosInput'

const ViewIcon = (props: ComponentProps<'div'>) => (
  <div {...props} className="size-10 rounded-full bg-status-positive"></div>
)

const ViewOffIcon = (props: ComponentProps<'div'>) => (
  <div {...props} className="size-10 rounded-full bg-status-warning"></div>
)

type CosPasswordInput = Omit<CosInputProps, 'trailingIcon' | 'type'> & {
  initialShowPassword?: boolean
}

export const CosPasswordInput = (props: CosPasswordInput) => {
  const { initialShowPassword = false, disabled, ...restProps } = props
  const [showPassword, setShowPassword] = useState<boolean>(initialShowPassword)
  const handleShowHide = () => {
    setShowPassword((prev) => !prev)
  }

  const IconComponent = showPassword ? ViewOffIcon : ViewIcon

  return (
    <CosInput
      {...restProps}
      type={showPassword ? 'text' : 'password'}
      disabled={disabled}
      trailingIcon={
        <IconComponent onClick={disabled ? undefined : handleShowHide} />
      }
    />
  )
}
