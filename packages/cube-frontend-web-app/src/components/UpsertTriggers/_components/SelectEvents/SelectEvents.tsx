import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import {
  CosButton,
  CosCollapsiblePanelLayout,
  CosStroke,
} from '@cube-frontend/ui-library'
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
import { useTranslation } from 'react-i18next'

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

  const isValueValid =
    !!payload && isEventsValid(payload) && !isEmpty(matchingEvents)

  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      <CosCollapsiblePanelLayout>
        <CosCollapsiblePanelLayout.LeftPanel
          topic={t('events.triggers.upsert.addAttributes.title')}
        >
          <AttributePanel
            isBuiltIn={isBuiltIn}
            isInitialDataLoading={isInitialDataLoading}
            isMaterialsLoading={isMaterialsLoading}
            isAttributeChanged={isAttributeChanged}
            payload={payload}
            attribute={attribute}
            onAlertTypeSelect={onAlertTypeSelect}
            onSeveritySelect={onSeveritySelect}
            onCategorySelect={onCategorySelect}
            onEventIdSelect={onEventIdSelect}
            onResetClick={onResetClick}
          />
        </CosCollapsiblePanelLayout.LeftPanel>
        <CosCollapsiblePanelLayout.RightPanel
          topic={t('events.triggers.upsert.attributeResult.title')}
        >
          <AttributeResultPanel
            isMatchingEventsLoading={isMatchingEventsLoading}
            matchingEvents={matchingEvents ?? []}
          />
        </CosCollapsiblePanelLayout.RightPanel>
      </CosCollapsiblePanelLayout>
      <CosStroke type="dot" />
      <CosButton
        className="self-start"
        usage="icon-right"
        Icon={ChevronRight}
        disabled={isInitialDataLoading || !isValueValid}
        onClick={onNextClick}
      >
        {t('events.triggers.upsert.next')}
      </CosButton>
    </div>
  )
}
