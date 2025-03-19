import { CosButton, CosTooltip } from '@cube-frontend/ui-library'
import InformationCircleFilled from '@cube-frontend/ui-library/icons/monochrome/information_circle_filled.svg?react'
import Plus from '@cube-frontend/ui-library/icons/monochrome/plus.svg?react'

export type EmailSendersHeaderProps = {
  isAddButtonVisible: boolean
  onAddButtonClick: () => void
}

export const EmailSendersHeader = (props: EmailSendersHeaderProps) => {
  const { isAddButtonVisible, onAddButtonClick } = props

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <p className="secondary-h5 text-functional-title">Email Sender</p>
        <CosTooltip
          hoverContent={{
            message:
              'This is the address COS uses to send emails. Limited to 1.',
          }}
        >
          <InformationCircleFilled className="icon-md text-functional-border-divider" />
        </CosTooltip>
      </div>
      {isAddButtonVisible && (
        <CosButton
          type="secondary"
          usage="icon-left"
          Icon={Plus}
          size="sm"
          onClick={onAddButtonClick}
        >
          Add Email Sender
        </CosButton>
      )}
    </div>
  )
}
