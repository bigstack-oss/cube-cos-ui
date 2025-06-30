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
  alertTypes: string[]
  severities: string[]
  categories: string[]
  eventIds: string[]
  onAlertTypeSelect: (alertTypes: string[]) => void
  onSeveritySelect: (severities: string[]) => void
  onCategorySelect: (categories: string[]) => void
  onEventIdSelect: (eventIds: string[]) => void
  onNextClick: () => void
}

export const SelectEvents = (props: SelectEventsProps) => {
  const {
    isLoading,
    payload,
    alertTypes,
    severities,
    categories,
    eventIds,
    onAlertTypeSelect,
    onSeveritySelect,
    onCategorySelect,
    onEventIdSelect,
    onNextClick,
  } = props

  const [isOpen, setIsOpen] = useState(false)

  const onActionClick = (attributes: {
    alertTypes: string[]
    severities: string[]
    categories: string[]
    eventIds: string[]
  }) => {
    const { alertTypes, severities, categories, eventIds } = attributes
    onAlertTypeSelect(alertTypes)
    onSeveritySelect(severities)
    onCategorySelect(categories)
    onEventIdSelect(eventIds)
  }

  const isValueValid = useMemo(() => {
    // TODO: Implement actual validation logic
    return true
  }, [])

  const renderAlertTypeStackCard = () => {
    if (payload.alertTypes.length === 0) return null

    return (
      <TriggersStackCard
        title="Alert Type"
        tags={payload.alertTypes}
        onRemoveClick={() => onAlertTypeSelect([])}
      />
    )
  }

  const renderSeverityStackCard = () => {
    if (payload.severities.length === 0) return null

    return (
      <TriggersStackCard
        title="Severity"
        tags={payload.severities}
        onRemoveClick={() => onSeveritySelect([])}
      />
    )
  }

  const renderCategoryStackCard = () => {
    if (payload.categories.length === 0) return null

    return (
      <TriggersStackCard
        title="Category"
        tags={payload.categories}
        onRemoveClick={() => onCategorySelect([])}
      />
    )
  }

  const renderEventIdStackCard = () => {
    if (payload.eventIds.length === 0) return null

    return (
      <TriggersStackCard
        title="Event ID"
        tags={payload.eventIds}
        onRemoveClick={() => onEventIdSelect([])}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <StepBoard>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <AddAttributeModal
            isModalOpen={isOpen}
            alertTypes={alertTypes}
            severities={severities}
            categories={categories}
            eventIds={eventIds}
            selectedAlertTypes={payload.alertTypes}
            selectedSeverities={payload.severities}
            selectedCategories={payload.categories}
            selectedEventIds={payload.eventIds}
            onModelOpen={() => setIsOpen(true)}
            onModelClose={() => setIsOpen(false)}
            onActionClick={onActionClick}
          />
          <CosButton type="ghost" disabled={true}>
            Reset
          </CosButton>
        </div>
        <CosStroke />
        {renderAlertTypeStackCard()}
        {renderSeverityStackCard()}
        {renderCategoryStackCard()}
        {renderEventIdStackCard()}
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
