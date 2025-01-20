import { useState } from 'react'
import { CosInput, CosInputProps } from './CosInput'
import View from '../CosIcon/monochrome/view.svg?react'
import ViewOff from '../CosIcon/monochrome/view_off.svg?react'

type CosPasswordInput = Omit<CosInputProps, 'trailingIcon' | 'type'> & {
  initialShowPassword?: boolean
}

export const CosPasswordInput = (props: CosPasswordInput) => {
  const { initialShowPassword = false, disabled, ...restProps } = props
  const [showPassword, setShowPassword] = useState<boolean>(initialShowPassword)
  const handleShowHide = () => {
    setShowPassword((prev) => !prev)
  }

  const IconComponent = showPassword ? View : ViewOff

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
