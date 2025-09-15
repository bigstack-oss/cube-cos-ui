import { CosModal, CosModalProps } from '@cube-frontend/ui-library'
import { ReactNode } from 'react'

type UpdateFirmwareModalProps = {
  version: string | undefined
  title: string
  content: () => ReactNode
  updateModalActionProps: Pick<
    CosModalProps,
    'actionText' | 'onActionClick' | 'actionButtonProps'
  >
  onCloseClick: () => void
}

export const UpdateFirmwareModal = (props: UpdateFirmwareModalProps) => {
  const { version, title, content, updateModalActionProps, onCloseClick } =
    props

  return (
    <CosModal
      isOpen={!!version}
      title={title}
      {...updateModalActionProps}
      onCloseClick={onCloseClick}
    >
      {content()}
    </CosModal>
  )
}
