import { useState } from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import AddSquare from '@cube-frontend/ui-library/icons/monochrome/add_square.svg?react'
import {
  GetPredefinedEventsSeveritiesEnum,
  GetPredefinedEventsTypesEnum,
} from '@cube-frontend/api'
import {
  attributeLabelMap,
  TriggerAttributeKeys,
  TriggerAttributes,
  UpsertTriggersPayload,
} from '../../upsertTriggersUtils'
import { TriggersStackCard } from '../TriggersStackCard'
import { AddAttributeModal } from './AddAttributeModal'

const panel = cva(
  [
    'flex flex-col gap-y-4',
    'rounded-[5px] bg-grey-0 p-6 shadow-[0px_0px_3px_0px_rgba(0,_0,_0,_0.10)]',
    'transition-[width] duration-300',
  ],
  {
    variants: {
      isPanelOpen: {
        true: 'w-1/2',
        false: 'w-full',
      },
    },
  },
)

const filterUnselectedAttributeOptions = (
  payload: UpsertTriggersPayload,
): TriggerAttributeKeys[] => {
  const optionKeys: TriggerAttributeKeys[] = [
    'alertTypes',
    'severities',
    'categories',
    'eventIds',
  ]

  return optionKeys.filter((key) => {
    const value = payload[key]
    return value.length === 0
  })
}

type AttributePanelProps = {
  isPanelOpen: boolean
  isLoading: boolean
  payload: UpsertTriggersPayload
  attributes: TriggerAttributes
  isValueValid: boolean
  onTogglePanel: () => void
  onAlertTypeSelect: (alertTypes: GetPredefinedEventsTypesEnum[]) => void
  onSeveritySelect: (severities: GetPredefinedEventsSeveritiesEnum[]) => void
  onCategorySelect: (categories: string[]) => void
  onEventIdSelect: (eventIds: string[]) => void
  onResetClick: () => void
}

export const AttributePanel = (props: AttributePanelProps) => {
  const {
    isPanelOpen,
    payload,
    attributes,
    isValueValid,
    onTogglePanel,
    onAlertTypeSelect,
    onSeveritySelect,
    onCategorySelect,
    onEventIdSelect,
    onResetClick,
  } = props

  const [isModelOpen, setIsModelOpen] = useState(false)

  const [activeType, setActiveType] = useState<
    TriggerAttributeKeys | undefined
  >(undefined)

  const [dropdownOptions, setDropdownOptions] = useState<
    TriggerAttributeKeys[]
  >([])

  const unselectedAttributeOptions = filterUnselectedAttributeOptions(payload)

  const checkIsAllSelected = () => {
    return unselectedAttributeOptions.length === 0
  }

  const onActionClick = (attributes: TriggerAttributes) => {
    const { alertTypes, severities, categories, eventIds } = attributes
    onAlertTypeSelect(alertTypes)
    onSeveritySelect(severities)
    onCategorySelect(categories)
    onEventIdSelect(eventIds)
  }

  const onActiveTypeChange = (type: TriggerAttributeKeys) => {
    setActiveType(type)
  }

  const onModalClose = () => {
    setIsModelOpen(false)
    setActiveType(undefined)
  }

  const onAddAttributeButtonClick = () => {
    if (unselectedAttributeOptions.length === 0) {
      return
    }
    setDropdownOptions(unselectedAttributeOptions)
    setIsModelOpen(true)
  }

  const onEditAttributeButtonClick = (type: TriggerAttributeKeys) => {
    onActiveTypeChange(type)
    setDropdownOptions([type])
    setIsModelOpen(true)
  }

  const renderAlertTypeStackCard = () => {
    if (payload.alertTypes.length === 0) return null

    return (
      <TriggersStackCard
        title={attributeLabelMap.alertTypes}
        tags={payload.alertTypes}
        onEditClick={() => onEditAttributeButtonClick('alertTypes')}
        onRemoveClick={() => onAlertTypeSelect([])}
      />
    )
  }

  const renderSeverityStackCard = () => {
    if (payload.severities.length === 0) return null

    return (
      <TriggersStackCard
        title={attributeLabelMap.severities}
        tags={payload.severities}
        onEditClick={() => onEditAttributeButtonClick('severities')}
        onRemoveClick={() => onSeveritySelect([])}
      />
    )
  }

  const renderCategoryStackCard = () => {
    if (payload.categories.length === 0) return null

    return (
      <TriggersStackCard
        title={attributeLabelMap.categories}
        tags={payload.categories}
        onEditClick={() => onEditAttributeButtonClick('categories')}
        onRemoveClick={() => onCategorySelect([])}
      />
    )
  }

  const renderEventIdStackCard = () => {
    if (payload.eventIds.length === 0) return null

    return (
      <TriggersStackCard
        title={attributeLabelMap.eventIds}
        tags={payload.eventIds}
        onEditClick={() => onEditAttributeButtonClick('eventIds')}
        onRemoveClick={() => onEventIdSelect([])}
      />
    )
  }

  return (
    <div className={twMerge(panel({ isPanelOpen }))}>
      <div className="flex items-center justify-between">
        <h4 className="secondary-h4 text-functional-title">
          Add Attributes to Select Events
        </h4>
        <CosButton
          className="rounded-full"
          type="ghost"
          usage="icon-only"
          Icon={InformationCircle}
          onClick={onTogglePanel}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <CosButton
          type="ghost"
          usage="icon-left"
          Icon={AddSquare}
          onClick={onAddAttributeButtonClick}
          disabled={checkIsAllSelected()}
        >
          Add Attributes
        </CosButton>

        <div className="flex">
          <CosButton
            type="ghost"
            onClick={onResetClick}
            disabled={!isValueValid}
          >
            Reset
          </CosButton>
        </div>
      </div>
      <CosStroke />
      {renderAlertTypeStackCard()}
      {renderSeverityStackCard()}
      {renderCategoryStackCard()}
      {renderEventIdStackCard()}
      <AddAttributeModal
        isModalOpen={isModelOpen}
        payload={payload}
        attributes={attributes}
        activeType={activeType}
        dropdownOptions={dropdownOptions}
        onModelClose={onModalClose}
        onActiveTypeChange={onActiveTypeChange}
        onActionClick={onActionClick}
      />
    </div>
  )
}
