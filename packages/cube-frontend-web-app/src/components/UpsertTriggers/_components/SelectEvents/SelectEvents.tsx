import { useMemo } from 'react'
import { useOpenState } from '@cube-frontend/web-app/hooks/useOpenState/useOpenState'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import {
  TriggerAttributes,
  UpsertTriggersPayload,
} from '../../upsertTriggersUtils'
import { AttributePanel } from './AttributePanel'
import { AttributeResultPanel } from './AttributeResultPanel'

type SelectEventsProps = {
  isLoading: boolean
  payload: UpsertTriggersPayload
  attributes: TriggerAttributes
  onAlertTypeSelect: (alertTypes: string[]) => void
  onSeveritySelect: (severities: string[]) => void
  onCategorySelect: (categories: string[]) => void
  onEventIdSelect: (eventIds: string[]) => void
  onNextClick: () => void
  onResetClick: () => void
}

export const SelectEvents = (props: SelectEventsProps) => {
  const {
    isLoading,
    payload,
    attributes,
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

  const isValueValid = useMemo(() => {
    // TODO: Implement actual validation logic
    if (
      payload.alertTypes.length === 0 &&
      payload.severities.length === 0 &&
      payload.categories.length === 0 &&
      payload.eventIds.length === 0
    )
      return false
    return true
  }, [payload])

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
          onPanelClose={onPanelClose}
          resultIds={[]}
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
