import React, { cloneElement, isValidElement, useContext } from 'react'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import {
  CosGeneralPanel,
  CosGeneralPanelContentProps,
} from '@cube-frontend/ui-library'
import { CosCollapsiblePanelsContext } from './cosCollapsiblePanelsContext'
import { isNil } from 'lodash'

export type LeftPanelProps = Pick<
  CosGeneralPanelContentProps,
  'children' | 'topic' | 'leftSlot' | 'rightSlot'
> & {
  customToggleButton?: React.ReactElement<{ onClick?: React.MouseEventHandler }>
}

export const LeftPanel = (props: LeftPanelProps) => {
  const { customToggleButton, rightSlot, children, ...restProps } = props

  const { toggle } = useContext(CosCollapsiblePanelsContext)

  const renderButton = () => {
    const defaultButton = (
      <button
        type="button"
        className="inline-flex size-[26px] items-center justify-center rounded-full bg-blue-150"
        onClick={() => toggle()}
      >
        <InformationCircle className="icon-lg text-functional-text" />
      </button>
    )

    if (isNil(customToggleButton)) {
      return defaultButton
    }

    if (!isValidElement(customToggleButton)) {
      console.warn(
        'CosCollapsiblePanelLayout.LeftPanel: `customToggleButton` is not a valid React element. Falling back to default button.',
      )
      return defaultButton
    }

    return cloneElement(
      customToggleButton as React.ReactElement<{
        onClick?: React.MouseEventHandler
      }>,
      {
        onClick: (e: React.MouseEvent) => {
          customToggleButton.props.onClick?.(e)
          toggle()
        },
      },
    )
  }

  return (
    <CosGeneralPanel
      {...restProps}
      containerClassName="min-w-0 flex-1"
      rightSlot={
        <>
          {rightSlot}
          {renderButton()}
        </>
      }
    >
      {children}
    </CosGeneralPanel>
  )
}
