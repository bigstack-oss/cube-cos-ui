import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { TriggersAddButton } from '../TriggersAddButton'
import { ResponseEmailTable } from './ResponseEmailTable'
import { ResponseSlackTable } from './ResponseSlackTable'
import { useContext } from 'react'
import { TriggersCreateContext } from '../../context'

export const TriggersStepResponse = () => {
  const { goToDescription, isFormValueValid, errorMessage } = useContext(
    TriggersCreateContext,
  )

  const renderErrorMessage = () => {
    if (!errorMessage) return null
    return (
      <div className="primary-body3 text-status-negative">{errorMessage}</div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <TriggersAddButton disabled={true} type="ghost">
          Set Responses
        </TriggersAddButton>
        <CosButton disabled={true} type="ghost">
          Reset
        </CosButton>
      </div>
      <ResponseEmailTable />
      <ResponseSlackTable />
      <CosStroke type="dot" />
      <div className="flex flex-col gap-2">
        {renderErrorMessage()}
        <CosButton
          size="md"
          type="primary"
          usage="icon-right"
          Icon={ChevronRight}
          disabled={!isFormValueValid}
          onClick={goToDescription}
          className="w-fit"
        >
          Next
        </CosButton>
      </div>
    </div>
  )
}
