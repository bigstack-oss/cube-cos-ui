import { CosButton, CosButtonProps } from '@cube-frontend/ui-library'
import SubtractSquare from '@cube-frontend/ui-library/icons/monochrome/subtract_square.svg?react'

type ButtonProps = Omit<CosButtonProps, 'usage' | 'Icon'> & {
  children: string
}

export const TriggersSubtractButton = (props: ButtonProps) => {
  const { children, ...restProps } = props
  return (
    <CosButton {...restProps} usage="icon-left" Icon={SubtractSquare}>
      {children}
    </CosButton>
  )
}
