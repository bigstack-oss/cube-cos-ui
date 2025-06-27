import { useMemo, useState } from 'react'
import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { StepBoard } from '@cube-frontend/web-app/components/StepBoard/StepBoard'
import { UpsertTriggersPayload } from '../../upsertTriggersUtils'
import { TriggersPreviousButton } from '../TriggersPreviousButton'
import { TriggersStackCard } from '../TriggersStackCard'
import { SendNotificationModal } from './SendNotificationModal'
import { PersonalizedScriptModal } from './PersonalizedScriptModal'

export type SetResponseProps = {
  isLoading: boolean
  payload: UpsertTriggersPayload | undefined
  onNextClick: () => void
}

export const SetResponse = (props: SetResponseProps) => {
  const { onNextClick } = props

  const [isSendNotificationOpen, setIsSendNotificationOpen] = useState(false)

  const [isPersonalizedScriptOpen, setIsPersonalizedScriptOpen] =
    useState(false)

  const isValueValid = useMemo(() => {
    // TODO: Implement actual validation logic
    return true
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <StepBoard>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <SendNotificationModal
              isModalOpen={isSendNotificationOpen}
              onModelOpen={() => setIsSendNotificationOpen(true)}
              onModelClose={() => setIsSendNotificationOpen(false)}
              onActionClick={() => alert('Send Notification Set!!')}
            />
            <PersonalizedScriptModal
              isModalOpen={isPersonalizedScriptOpen}
              onModelOpen={() => setIsPersonalizedScriptOpen(true)}
              onModelClose={() => setIsPersonalizedScriptOpen(false)}
              onActionClick={() => alert('Personalized Script Set!!')}
            />
          </div>
          <CosButton type="ghost" disabled={true}>
            Reset
          </CosButton>
        </div>
        <CosStroke />
        <TriggersStackCard
          title="Notification"
          tags={['response', 'response', 'response', 'response']}
          onRemoveClick={() => window.alert('Remove!!!')}
        />
        <TriggersStackCard
          title="Personalized Script"
          tags={['response', 'response', 'response', 'response']}
          onRemoveClick={() => window.alert('Remove!!!')}
        />
      </StepBoard>
      <CosStroke type="dot" />
      <div className="flex items-center gap-x-4">
        <TriggersPreviousButton />
        <CosButton
          className="self-start"
          usage="icon-right"
          Icon={ChevronRight}
          disabled={!isValueValid}
          onClick={onNextClick}
        >
          Next
        </CosButton>
      </div>
    </div>
  )
}
