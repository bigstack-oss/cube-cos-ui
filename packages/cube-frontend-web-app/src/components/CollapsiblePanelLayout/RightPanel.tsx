import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import X from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import {
  CosGeneralPanel,
  CosGeneralPanelContentProps,
} from '@cube-frontend/ui-library'
import { useContext } from 'react'
import { CollapsiblePanelsContext } from './collapsiblePanelsContext'
import { PropsWithClassName } from '@cube-frontend/utils'

export type RightPanelProps = PropsWithClassName &
  Pick<
    CosGeneralPanelContentProps,
    'children' | 'topic' | 'leftSlot' | 'rightSlot'
  >

const container = cva(
  [
    'overflow-hidden transition-all duration-300',
    'shadow-[0_0_2px_rgba(0,0,0,0.2)]',
  ],
  {
    variants: {
      isOpen: {
        true: 'flex-1 shrink-0',
        false: 'w-0 whitespace-nowrap px-0',
      },
    },
  },
)

export const RightPanel = (props: RightPanelProps) => {
  const { rightSlot, children, className, ...restProps } = props

  const { rightPanelWidth, isOpen, close } = useContext(
    CollapsiblePanelsContext,
  )

  const closeButton = (
    <button
      type="button"
      className="inline-flex size-[26px] cursor-pointer items-center justify-center"
      onClick={close}
    >
      <X className="icon-lg text-functional-text" />
    </button>
  )

  return (
    <div
      className={twMerge(container({ isOpen }), className)}
      style={{
        width: isOpen ? rightPanelWidth : '0',
        height: isOpen ? '100%' : '0',
        minWidth: isOpen ? rightPanelWidth : '0',
        maxWidth: isOpen ? rightPanelWidth : '0',
      }}
    >
      <CosGeneralPanel
        {...restProps}
        className="overflow-hidden"
        rightSlot={
          <>
            {rightSlot}
            {closeButton}
          </>
        }
      >
        {children}
      </CosGeneralPanel>
    </div>
  )
}
