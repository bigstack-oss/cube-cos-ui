import React, { cloneElement, isValidElement, useContext } from 'react'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import {
  CosGeneralPanel,
  CosGeneralPanelContentProps,
} from '@cube-frontend/ui-library'
import { CollapsiblePanelsContext } from './collapsiblePanelsContext'

export type LeftPanelProps = Pick<
  CosGeneralPanelContentProps,
  'children' | 'topic' | 'leftSlot' | 'rightSlot'
> & {
  customToggleButton?: React.ReactElement<{ onClick?: React.MouseEventHandler }>
}

export const LeftPanel = (props: LeftPanelProps) => {
  const { customToggleButton, rightSlot, children, ...restProps } = props

  const { toggleOpen } = useContext(CollapsiblePanelsContext)

  const button = isValidElement(customToggleButton) ? (
    cloneElement(
      customToggleButton as React.ReactElement<{
        onClick?: React.MouseEventHandler
      }>,
      {
        onClick: (e: React.MouseEvent) => {
          customToggleButton.props.onClick?.(e)
          toggleOpen()
        },
      },
    )
  ) : (
    <button
      type="button"
      className="inline-flex size-[26px] items-center justify-center rounded-full bg-blue-150"
      onClick={() => toggleOpen()}
    >
      <InformationCircle className="icon-lg text-functional-text" />
    </button>
  )

  return (
    <CosGeneralPanel
      {...restProps}
      containerClassName="min-w-0 flex-1"
      rightSlot={
        <>
          {rightSlot}
          {button}
        </>
      }
    >
      {children}
    </CosGeneralPanel>
  )
}
