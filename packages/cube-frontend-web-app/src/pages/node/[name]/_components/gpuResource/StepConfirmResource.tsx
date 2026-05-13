import { CosButton } from '@cube-frontend/ui-library'
import ChevronLeft from '@cube-frontend/ui-library/icons/monochrome/chevron_left.svg?react'
import { ResourceRow } from '../NodeResources'
import { ConfirmTable } from './tables/ConfirmTable'

export type StepConfirmResourceProps = {
  confirmTableData: ResourceRow
  onGoBackToEditClick: () => void
}

export const StepConfirmResource = (props: StepConfirmResourceProps) => {
  const { confirmTableData, onGoBackToEditClick } = props
  return (
    <div className="flex flex-col items-start gap-y-5">
      <div className="primary-body2 text-functional-text">
        Please confirm your selected profile before proceeding. <br />
        Once a instance is attached, the GPU Profile cannot be modified.
      </div>
      <ConfirmTable confirmTableData={confirmTableData} />
      <CosButton
        type="ghost"
        size="md"
        usage="icon-left"
        Icon={ChevronLeft}
        onClick={onGoBackToEditClick}
      >
        Go Back to Edit
      </CosButton>
    </div>
  )
}
