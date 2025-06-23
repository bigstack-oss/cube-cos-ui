import { CosButton, CosTooltip } from '@cube-frontend/ui-library'
import CopyIcon from '@cube-frontend/ui-library/icons/monochrome/copy.svg?react'
import { MouseEvent } from 'react'

export type CopyButtonProps = {
  copyContent: string
  onMouseEnter?: (e: MouseEvent<HTMLElement>) => void
  onMouseLeave?: (e: MouseEvent<HTMLElement>) => void
  onClick?: (e: MouseEvent<HTMLElement>) => void
}

export const CopyButton = (props: CopyButtonProps) => {
  const { copyContent: copyText, onClick: onClickProp, ...restProps } = props

  const onClick = (e: MouseEvent<HTMLElement>): void => {
    navigator.clipboard.writeText(copyText)
    onClickProp?.(e)
  }

  return (
    <CosTooltip clickContent={{ message: 'Copied' }}>
      <CosButton
        usage="icon-only"
        type="ghost"
        size="sm"
        Icon={CopyIcon}
        {...restProps}
        disabled={!copyText}
        onClick={onClick}
      />
    </CosTooltip>
  )
}
