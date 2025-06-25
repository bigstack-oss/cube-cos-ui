import { CosButton, CosButtonProps } from '@cube-frontend/ui-library'
import AddSquare from '@cube-frontend/ui-library/icons/monochrome/add_square.svg?react'

type ButtonProps = Omit<CosButtonProps, 'usage' | 'Icon'> & {
  children: string
}

export const TriggersAddButton = (props: ButtonProps) => {
  const { children, ...restProps } = props
  return (
    <CosButton {...restProps} usage="icon-left" Icon={AddSquare}>
      {children}
    </CosButton>
  )
}
