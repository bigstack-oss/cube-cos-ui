import { CosButton } from '@cube-frontend/ui-library'
import { TriggersAddButton } from '../TriggersAddButton'
import { ResponseEmailTable } from './ResponseEmailTable'
import { ResponseSlackTable } from './ResponseSlackTable'

export const TriggersStepResponse = () => {
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
    </div>
  )
}
