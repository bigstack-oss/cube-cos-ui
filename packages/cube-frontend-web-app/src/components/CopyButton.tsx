import { CosButton } from '@cube-frontend/ui-library'
import CopyIcon from '@cube-frontend/ui-library/icons/monochrome/copy.svg?react'

export type CopyButtonProps = {
  copyContent: string
}

export const CopyButton = (props: CopyButtonProps) => {
  const { copyContent: copyText } = props

  return (
    <CosButton
      usage="icon-only"
      type="ghost"
      size="sm"
      Icon={CopyIcon}
      onClick={() => navigator.clipboard.writeText(copyText)}
    />
  )
}
