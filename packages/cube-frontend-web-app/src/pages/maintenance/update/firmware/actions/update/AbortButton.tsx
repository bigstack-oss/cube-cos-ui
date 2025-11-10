import { CosButton } from '@cube-frontend/ui-library'
import { useOpenState } from '@cube-frontend/web-app/hooks/useOpenState/useOpenState'
import { ConfirmAbortModal } from './ConfirmAbortModal'

type AbortButtonProps = {
  firmwareVersion: string
  onAborted: () => unknown
}

export const AbortButton = (props: AbortButtonProps) => {
  const { firmwareVersion, onAborted: onAbortedProp } = props

  const { isOpen, open: openModal, close: closeModal } = useOpenState()

  const onAborted = (): void => {
    onAbortedProp()
    closeModal()
  }

  return (
    <>
      <CosButton
        htmlType="button"
        type="secondary"
        className="ml-auto"
        size="lg"
        onClick={openModal}
      >
        Abort
      </CosButton>
      <ConfirmAbortModal
        isOpen={isOpen}
        firmwareVersion={firmwareVersion}
        onAborted={onAborted}
        onCloseClick={closeModal}
      />
    </>
  )
}
