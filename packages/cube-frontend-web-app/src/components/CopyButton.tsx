import { CosButton } from '@cube-frontend/ui-library'
import CopyIcon from '@cube-frontend/ui-library/icons/monochrome/copy.svg?react'
import { MouseEvent } from 'react'

export type CopyButtonProps = {
  copyContent: string
  onMouseEnter?: (e: MouseEvent<HTMLElement>) => void
  onMouseLeave?: (e: MouseEvent<HTMLElement>) => void
  onClick?: (e: MouseEvent<HTMLElement>) => void
}

export const CopyButton = (props: CopyButtonProps) => {
  const { copyContent: copyText, ...restProps } = props

  return (
    <CosButton
      usage="icon-only"
      type="ghost"
      size="sm"
      Icon={CopyIcon}
      {...restProps}
      onClick={() => navigator.clipboard.writeText(copyText)}
    />
  )
}
