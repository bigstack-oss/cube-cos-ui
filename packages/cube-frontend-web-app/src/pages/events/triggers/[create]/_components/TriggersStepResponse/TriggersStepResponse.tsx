import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import { useContext } from 'react'
import { TriggersCreateContext } from '../../context'
import { TriggersAddButton } from '../TriggersAddButton'
import { TriggersNextButton } from '../TriggersNextButton'
import { TriggersPreviousButton } from '../TriggersPreviousButton'
import { ResponseEmailTable } from './ResponseEmailTable'
import { ResponseSlackTable } from './ResponseSlackTable'

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
      <div className="flex items-center gap-x-4">
        <TriggersPreviousButton />
        <TriggersNextButton
          disabled={!isFormValueValid}
          onClick={goToDescription}
        />
      </div>
    </div>
  )
}
