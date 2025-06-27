import { Fragment } from 'react'
import { CosButton, CosModal } from '@cube-frontend/ui-library'
import AddSquare from '@cube-frontend/ui-library/icons/monochrome/add_square.svg?react'

type PersonalizedScriptModalProps = {
  isModalOpen: boolean
  onModelOpen: () => void
  onModelClose: () => void
  onActionClick: () => void
}

export const PersonalizedScriptModal = (
  props: PersonalizedScriptModalProps,
) => {
  const { isModalOpen, onModelOpen, onModelClose, onActionClick } = props
  return (
    <div>
      <CosButton
        type="ghost"
        usage="icon-left"
        Icon={AddSquare}
        onClick={onModelOpen}
      >
        Personalized Script
      </CosButton>
      <CosModal
        isOpen={isModalOpen}
        title="Personalized Script"
        actionText="Set Response"
        onActionClick={onActionClick}
        onCloseClick={onModelClose}
      >
        <Fragment key={onActionClick.toString()}>Personalized Script</Fragment>
      </CosModal>
    </div>
  )
}
