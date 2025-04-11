import {
  CosLoadingSpinner,
  CosTooltip,
  SvgComponent,
} from '@cube-frontend/ui-library'
import { cva } from 'class-variance-authority'

type IconActionButtonProps = {
  Icon: SvgComponent
  /**
   * @default false
   */
  isLoading?: boolean
  hoverMessage?: string
  /**
   * @default false
   */
  disabled?: boolean
  onClick: () => void
}

const icon = cva('icon-md', {
  variants: {
    disabled: {
      true: 'text-functional-disable-text',
      false: 'cursor-pointer text-functional-text',
    },
  },
})

export const IconActionButton = (props: IconActionButtonProps) => {
  const {
    Icon,
    isLoading = false,
    hoverMessage,
    disabled = false,
    onClick: onClickProp,
  } = props

  const onClick = () => {
    if (!disabled) {
      onClickProp()
    }
  }

  const iconElement = <Icon className={icon({ disabled })} onClick={onClick} />

  if (isLoading) {
    return <CosLoadingSpinner variant="dot45" />
  }

  if (hoverMessage) {
    return (
      <CosTooltip hoverContent={{ message: hoverMessage }}>
        {iconElement}
      </CosTooltip>
    )
  }

  return iconElement
}
