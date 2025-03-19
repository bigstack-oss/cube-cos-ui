import { CosButton, CosTooltip } from '@cube-frontend/ui-library'
import InformationCircleFilled from '@cube-frontend/ui-library/icons/monochrome/information_circle_filled.svg?react'
import Plus from '@cube-frontend/ui-library/icons/monochrome/plus.svg?react'

export type EmailRecipientsHeaderProps = {
  onAddButtonClick: () => void
}

export const EmailRecipientsHeader = (props: EmailRecipientsHeaderProps) => {
  const { onAddButtonClick } = props

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <p className="secondary-h5 text-functional-title">Email Recipients</p>
        <CosTooltip
          hoverContent={{
            message:
              'This is a list of email addresses where users receive COS notifications. Limited to 10.',
          }}
        >
          <InformationCircleFilled className="icon-md text-functional-border-divider" />
        </CosTooltip>
      </div>
      <CosButton
        type="secondary"
        usage="icon-left"
        Icon={Plus}
        size="sm"
        onClick={onAddButtonClick}
      >
        Add Email Recipient
      </CosButton>
    </div>
  )
}
