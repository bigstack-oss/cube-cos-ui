import { CosButton } from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'

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

  return (
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
  )
}
