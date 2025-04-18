import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import { TriggersAddButton } from '../TriggersAddButton'
import { ResponseEmailTable } from './ResponseEmailTable'
import { ResponseSlackTable } from './ResponseSlackTable'
import { useContext } from 'react'
import { TriggersCreateContext } from '../../context'
import { TriggersNextButton } from '../TriggersNextButton'

export const TriggersStepResponse = () => {
  const { goToDescription, isFormValueValid } = useContext(
    TriggersCreateContext,
  )

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
      <TriggersNextButton
        disabled={!isFormValueValid}
        onClick={goToDescription}
      />
    </div>
  )
}
