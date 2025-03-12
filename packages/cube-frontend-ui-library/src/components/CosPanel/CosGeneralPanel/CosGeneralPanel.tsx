import { PropsWithClassName } from '@cube-frontend/utils'
import React, { cloneElement, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { CosButtonProps } from '../../CosButton/CosButton'
import { CosDropdownProps } from '../../CosDropdown/CosDropdown'
import { CosDropdownType } from '../../CosDropdown/utils'

export type CosGeneralPanelContentProps = PropsWithChildren &
  PropsWithClassName & {
    topic?: string
    button?: React.ReactElement<CosButtonProps>
    icon?: React.ReactNode
    dropdown?: React.ReactElement<CosDropdownProps<unknown, CosDropdownType>>
    subtext?: string
  }

export const CosGeneralPanel = (props: CosGeneralPanelContentProps) => {
  const {
    children,
    className: classNameProps,
    topic,
    button,
    icon,
    dropdown,
    subtext,
  } = props

  const panelButton = button
    ? cloneElement(button, { size: 'sm', type: 'primary' })
    : null

  const renderHeader = () => {
    if (!topic && !panelButton && !icon && !dropdown) {
      return null
    }

    return (
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-x-3">
          {topic && (
            <span className="secondary-h4 font-semibold text-functional-title">
              {topic}
            </span>
          )}
          {panelButton}
        </div>
        <div className="flex items-center gap-x-3">
          {icon}
          {dropdown}
        </div>
      </div>
    )
  }

  return (
    <div
      className={twMerge(
        'flex flex-col gap-y-4 rounded-[5px] bg-grey-0 p-6',
        classNameProps,
      )}
      style={{ boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.20)' }}
    >
      {renderHeader()}
      {subtext && (
        <span className="primary-body3 text-functional-text">{subtext}</span>
      )}
      <div className="primary-body5 text-functional-text-light">{children}</div>
    </div>
  )
}
