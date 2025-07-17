import { useOpenState } from '@cube-frontend/web-app/hooks/useOpenState/useOpenState'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import {
  GetPredefinedEventFilterResponseDataInner,
  GetPredefinedEventsCategoriesEnum,
  GetPredefinedEventsIdsEnum,
  GetPredefinedEventsSeveritiesEnum,
  GetPredefinedEventsTypesEnum,
} from '@cube-frontend/api'
import {
  isEventsValid,
  TriggerAttribute,
  UpsertTriggersPayload,
} from '../../upsertTriggersUtils'
import { AttributePanel } from './AttributePanel'
import { AttributeResultPanel } from './AttributeResultPanel'
import { isEmpty } from 'lodash'

type SelectEventsProps = {
  /**
   * @default false
   */
  isBuiltIn?: boolean
  isInitialDataLoading: boolean
  isMatchingEventsLoading: boolean
  isMaterialsLoading: boolean
  isAttributeChanged: boolean
  payload: UpsertTriggersPayload | undefined
  attribute: TriggerAttribute
  matchingEvents: GetPredefinedEventFilterResponseDataInner[]
  onAlertTypeSelect: (alertTypes: GetPredefinedEventsTypesEnum[]) => void
  onSeveritySelect: (severities: GetPredefinedEventsSeveritiesEnum[]) => void
  onCategorySelect: (categories: GetPredefinedEventsCategoriesEnum[]) => void
  onEventIdSelect: (eventIds: GetPredefinedEventsIdsEnum[]) => void
  onNextClick: () => void
  onResetClick: () => void
}

export const SelectEvents = (props: SelectEventsProps) => {
  const {
    isBuiltIn = false,
    isInitialDataLoading,
    isMatchingEventsLoading,
    isMaterialsLoading,
    isAttributeChanged,
    payload,
    attribute,
    matchingEvents,
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

  const isValueValid =
    !!payload && isEventsValid(payload) && !isEmpty(matchingEvents)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-x-3">
        <AttributePanel
          isBuiltIn={isBuiltIn}
          isPanelOpen={isPanelOpen}
          isInitialDataLoading={isInitialDataLoading}
          isMaterialsLoading={isMaterialsLoading}
          isAttributeChanged={isAttributeChanged}
          payload={payload}
          attribute={attribute}
          onTogglePanel={onTogglePanel}
          onAlertTypeSelect={onAlertTypeSelect}
          onSeveritySelect={onSeveritySelect}
          onCategorySelect={onCategorySelect}
          onEventIdSelect={onEventIdSelect}
          onResetClick={onResetClick}
        />
        <AttributeResultPanel
          isPanelOpen={isPanelOpen}
          isMatchingEventsLoading={isMatchingEventsLoading}
          matchingEvents={matchingEvents ?? []}
          onPanelClose={onPanelClose}
        />
      </div>
      <CosStroke type="dot" />
      <CosButton
        className="self-start"
        usage="icon-right"
        Icon={ChevronRight}
        disabled={isInitialDataLoading || !isValueValid}
        onClick={onNextClick}
      >
        Next
      </CosButton>
    </div>
  )
}
