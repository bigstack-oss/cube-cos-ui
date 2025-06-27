import { useMemo, useState } from 'react'
import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { StepBoard } from '@cube-frontend/web-app/components/StepBoard/StepBoard'
import { UpsertTriggersPayload } from '../../upsertTriggersUtils'
import { TriggersStackCard } from '../TriggersStackCard'
import { AddAttributeModal } from './AddAttributeModal'

type SelectEventsProps = {
  isLoading: boolean
  payload: UpsertTriggersPayload
  severities: string[]
  eventIds: string[]
  onNextClick: () => void
}

export const SelectEvents = (props: SelectEventsProps) => {
  const { isLoading, payload, severities, eventIds, onNextClick } = props

  const [isOpen, setIsOpen] = useState(false)

  const isValueValid = useMemo(() => {
    // TODO: Implement actual validation logic
    return true
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <StepBoard>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <AddAttributeModal
            isModalOpen={isOpen}
            severities={severities}
            eventIds={eventIds}
            onModelOpen={() => setIsOpen(true)}
            onModelClose={() => setIsOpen(false)}
            onActionClick={() => alert('Set Response')}
          />
          <CosButton type="ghost" disabled={true}>
            Reset
          </CosButton>
        </div>
        <CosStroke />
        <TriggersStackCard
          title="Alert Type"
          tags={['response', 'response', 'response', 'response']}
          onRemoveClick={() => window.alert('Remove!!!')}
        />
      </StepBoard>
      <CosStroke type="dot" />
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
  )
}
