import { useMemo } from 'react'
import { useOpenState } from '@cube-frontend/web-app/hooks/useOpenState/useOpenState'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import {
  GetPredefinedEventFilterResponseDataEventsInner,
  GetPredefinedEventsSeveritiesEnum,
  GetPredefinedEventsTypesEnum,
} from '@cube-frontend/api'
import {
  isEventsValid,
  TriggerAttributes,
  UpsertTriggersPayload,
} from '../../upsertTriggersUtils'
import { AttributePanel } from './AttributePanel'
import { AttributeResultPanel } from './AttributeResultPanel'
import { isEmpty } from 'lodash'

type SelectEventsProps = {
  isLoading: boolean
  isPredefinedEventsLoading: boolean
  payload: UpsertTriggersPayload
  attributes: TriggerAttributes
  predefinedEvents: GetPredefinedEventFilterResponseDataEventsInner[]
  onAlertTypeSelect: (alertTypes: GetPredefinedEventsTypesEnum[]) => void
  onSeveritySelect: (severities: GetPredefinedEventsSeveritiesEnum[]) => void
  onCategorySelect: (categories: string[]) => void
  onEventIdSelect: (eventIds: string[]) => void
  onNextClick: () => void
  onResetClick: () => void
}

export const SelectEvents = (props: SelectEventsProps) => {
  const {
    isLoading,
    isPredefinedEventsLoading,
    payload,
    attributes,
    predefinedEvents,
    onAlertTypeSelect,
    onSeveritySelect,
    onCategorySelect,
    onEventIdSelect,
    onNextClick,
    onResetClick,
  } = props

  const {
    isOpen: isPanelOpen,
    toggle: onTogglePanel,
    close: onPanelClose,
  } = useOpenState(true)

  const predefinedEventIds = predefinedEvents.map((event) => event.id)

  const isValueValid = useMemo(() => {
    return isEventsValid(payload) && !isEmpty(predefinedEvents)
  }, [payload, predefinedEvents])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-x-3">
        <AttributePanel
          isPanelOpen={isPanelOpen}
          isLoading={isLoading}
          payload={payload}
          attributes={attributes}
          isValueValid={isValueValid}
          onTogglePanel={onTogglePanel}
          onAlertTypeSelect={onAlertTypeSelect}
          onSeveritySelect={onSeveritySelect}
          onCategorySelect={onCategorySelect}
          onEventIdSelect={onEventIdSelect}
          onResetClick={onResetClick}
        />
        <AttributeResultPanel
          isPanelOpen={isPanelOpen}
          isLoading={isPredefinedEventsLoading}
          matchingEventIds={predefinedEventIds}
          onPanelClose={onPanelClose}
        />
      </div>
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
