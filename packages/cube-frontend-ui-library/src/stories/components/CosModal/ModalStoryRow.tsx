import { CosButton, CosModal, CosModalProps } from '@cube-frontend/ui-library'
import { Fragment, ReactNode, useState } from 'react'

type ModalStoryRowProps = {
  label: string
  content: ReactNode
} & Pick<CosModalProps, 'size' | 'actionText'>

export const ModalStoryRow = (props: ModalStoryRowProps) => {
  const { label, content, size, actionText } = props

  const [isOpen, setIsOpen] = useState(false)

  const onOpenClick = (): void => {
    setIsOpen(true)
  }

  const onCloseClick = (): void => {
    setIsOpen(false)
  }

  return (
    <div className="flex items-center [&+*]:mt-3">
      <label className="primary-body2 w-32 font-medium">{label}</label>
      <CosButton usage="text-only" onClick={onOpenClick}>
        Open
      </CosButton>
      <CosModal
        size={size}
        isOpen={isOpen}
        title={label}
        actionText={actionText}
        onActionClick={() => alert('Action!')}
        onCloseClick={onCloseClick}
      >
        {/* Use fragment with key to reset checkboxes states when opening/closing the modal. */}
        <Fragment key={isOpen.toString()}>{content}</Fragment>
      </CosModal>
    </div>
  )
}
