import { CosButton } from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { useContext } from 'react'
import { TriggersCreateContext } from '../context'

type TriggersNextButtonProps = {
  /**
   * @default false
   */
  isLoading?: boolean
  /**
   * @default false
   */
  disabled?: boolean
  onClick: () => void
}

export const TriggersNextButton = (props: TriggersNextButtonProps) => {
  const { isLoading, disabled, onClick } = props

  const { errorMessage } = useContext(TriggersCreateContext)

  return (
    <div className="flex flex-col gap-2">
      {errorMessage && (
        <div className="primary-body3 text-status-negative">{errorMessage}</div>
      )}
      <CosButton
        size="md"
        type="primary"
        usage="icon-right"
        Icon={ChevronRight}
        loading={isLoading}
        disabled={disabled}
        onClick={onClick}
        className="w-fit"
      >
        Next
      </CosButton>
    </div>
  )
}
