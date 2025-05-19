import { PropsWithChildren } from 'react'
import Information from '@cube-frontend/ui-library/icons/monochrome/information_circle_filled.svg?react'

type CosInformationProps = PropsWithChildren<{
  /**
   * @default false
   */
  showIcon?: boolean
}>

export const CosInformation = (props: CosInformationProps) => {
  const { children, showIcon = false } = props

  return (
    <div className="primary-body3 flex items-start gap-[10px] rounded-[5px] bg-blue-50 px-5 py-[13px] text-dark-400">
      {showIcon && (
        <div className="flex size-[18px] shrink-0 items-center justify-center">
          <Information className="icon-md" />
        </div>
      )}
      {children}
    </div>
  )
}
