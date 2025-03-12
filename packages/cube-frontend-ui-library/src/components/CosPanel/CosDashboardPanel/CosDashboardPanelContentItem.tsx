import { cloneElement, PropsWithChildren } from 'react'
import { PropsWithClassName } from '@cube-frontend/utils'
import { CosButtonProps } from '../../CosButton/CosButton'
import { twMerge } from 'tailwind-merge'
import { baseDashboardPanelBorderStyle } from './utils'
import { CosSkeleton } from '../../CosSkeleton/CosSkeleton'

export type CosDashboardPanelContentItemProps = PropsWithChildren &
  PropsWithClassName & {
    topic?: string
    subtext?: string
    /**
     * @default false
     */
    isSubtextLoading?: boolean
    /**
     * CosPanel will override the button size and type for UI consistency.
     */
    button?: React.ReactElement<CosButtonProps>
    children: React.ReactNode
  }

export const CosDashboardPanelContentItem = (
  props: CosDashboardPanelContentItemProps,
) => {
  const {
    className: classNameProp,
    topic,
    subtext,
    isSubtextLoading = false,
    button,
    children,
  } = props

  const className = twMerge(
    'flex flex-col gap-y-3 p-5',
    baseDashboardPanelBorderStyle,
    classNameProp,
  )

  const renderSubtext = () => {
    if (isSubtextLoading) {
      return <CosSkeleton className="h-[18px] w-[79px]" />
    }
    if (!subtext) {
      return null
    }

    return <span className="primary-body3 text-functional-text">{subtext}</span>
  }

  const renderHeader = () => {
    if (!topic && !subtext && !isSubtextLoading) return null

    return (
      <div className="flex items-center gap-x-3">
        {topic && (
          <span className="primary-body2 font-medium text-functional-title">
            {topic}
          </span>
        )}
        {renderSubtext()}
      </div>
    )
  }

  const renderFooter = () => {
    if (!button) return null

    const panelButton = cloneElement(button, { size: 'md', type: 'primary' })

    return <div className="flex items-center justify-end">{panelButton}</div>
  }

  return (
    <div className={className}>
      {renderHeader()}
      <div className="primary-body5 text-functional-text-light">{children}</div>
      {renderFooter()}
    </div>
  )
}
