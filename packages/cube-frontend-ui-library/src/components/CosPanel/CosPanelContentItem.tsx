import { cloneElement, PropsWithChildren } from 'react'
import { PropsWithClassName } from '@cube-frontend/utils'
import { CosButtonProps } from '../CosButton/CosButton'
import { twMerge } from 'tailwind-merge'
import { basePanelBorderStyle } from './utils'

export type CosPanelContentItem = PropsWithChildren &
  PropsWithClassName & {
    topic?: string
    subtext?: string
    /**
     * CosPanel will override the button size and type for UI consistency.
     */
    button?: React.ReactElement<CosButtonProps>
    children: React.ReactNode
  }

export const CosPanelContentItem = (props: CosPanelContentItem) => {
  const { className: classNameProp, topic, subtext, button, children } = props

  const renderFooter = () => {
    if (!button) return null

    const panelButton = cloneElement(button, { size: 'md', type: 'primary' })

    return <div className="flex items-center justify-end">{panelButton}</div>
  }

  const className = twMerge(
    'flex flex-col gap-y-3 p-5',
    basePanelBorderStyle,
    classNameProp,
  )

  const renderHeader = () => {
    if (!topic && !subtext) return null

    return (
      <div className="flex items-center gap-x-3">
        {topic && (
          <span className="primary-body2 font-medium text-functional-title">
            {topic}
          </span>
        )}
        {subtext && (
          <span className="primary-body3 text-functional-text">{subtext}</span>
        )}
      </div>
    )
  }

  return (
    <div className={className}>
      {renderHeader()}
      <div className="primary-body5 text-functional-text-light">{children}</div>
      {renderFooter()}
    </div>
  )
}
