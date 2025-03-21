import X from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { CosButton } from '../CosButton/CosButton'
import { backdrop, modal } from './cosModalStyles'
import { useCloseModalWithEsc } from './useCloseModalWithEsc'

export type CosModalProps = {
  children: ReactNode
  /**
   * @default 'md'
   */
  size?: CosModalSize
  isOpen: boolean
  title: string
  /**
   * @default true
   */
  isActionButtonVisible?: boolean
  /**
   * @default 'Action'
   */
  actionText?: string
  onActionClick?: () => void
  onCloseClick: () => void
}

export type CosModalSize = 'sm' | 'md'

export const CosModal = (props: CosModalProps) => {
  const {
    children,
    size = 'md',
    isOpen,
    title,
    isActionButtonVisible = true,
    actionText = 'Action',
    onActionClick,
    onCloseClick,
  } = props

  useCloseModalWithEsc({
    isOpen,
    onCloseClick,
  })

  return createPortal(
    <>
      <div className={backdrop({ isOpen })} onClick={onCloseClick} />
      <div
        className={modal({ size, isOpen })}
        style={{
          boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.20)',
        }}
      >
        <div className="flex items-center justify-between border-b border-functional-border-divider px-7 py-4 pr-5">
          <div className="primary-h4 truncate text-cosmos-primary">{title}</div>
          <CosButton
            className="rounded-full text-functional-text"
            usage="icon-only"
            type="ghost"
            Icon={X}
            onClick={onCloseClick}
          />
        </div>
        <div className="flex-1 overflow-auto p-7">{children}</div>
        <div className="flex items-center justify-end gap-x-2.5 border-t border-functional-border-divider px-7 py-4">
          {isActionButtonVisible && (
            <CosButton usage="text-only" size="lg" onClick={onActionClick}>
              {actionText}
            </CosButton>
          )}
          <CosButton
            type="secondary"
            usage="text-only"
            size="lg"
            onClick={onCloseClick}
          >
            Cancel
          </CosButton>
        </div>
      </div>
    </>,
    document.body,
  )
}
