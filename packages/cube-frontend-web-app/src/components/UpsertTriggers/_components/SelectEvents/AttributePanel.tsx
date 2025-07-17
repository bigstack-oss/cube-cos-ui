import { useState } from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { isEmpty } from 'lodash'
import { CosButton, CosSkeleton, CosStroke } from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import AddSquare from '@cube-frontend/ui-library/icons/monochrome/add_square.svg?react'
import {
  GetPredefinedEventsCategoriesEnum,
  GetPredefinedEventsIdsEnum,
  GetPredefinedEventsSeveritiesEnum,
  GetPredefinedEventsTypesEnum,
} from '@cube-frontend/api'
import {
  attributeLabelMap,
  TriggerAttribute,
  TriggerAttributeKeys,
  UpsertTriggersPayload,
} from '../../upsertTriggersUtils'
import { TriggersStackCard } from '../TriggersStackCard'
import { AddAttributeModal } from './AddAttributeModal'

const panel = cva(
  [
    'flex flex-col gap-y-4',
    'rounded-[5px] bg-grey-0 p-6 shadow-[0px_0px_3px_0px_rgba(0,_0,_0,_0.10)]',
    'transition-all duration-300',
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
  payload: UpsertTriggersPayload | undefined,
): TriggerAttributeKeys[] => {
  if (!payload) return []

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
  isBuiltIn: boolean
  isPanelOpen: boolean
  isInitialDataLoading: boolean
  isMaterialsLoading: boolean
  isAttributeChanged: boolean
  payload: UpsertTriggersPayload | undefined
  attribute: TriggerAttribute
  onTogglePanel: () => void
  onAlertTypeSelect: (alertTypes: GetPredefinedEventsTypesEnum[]) => void
  onSeveritySelect: (severities: GetPredefinedEventsSeveritiesEnum[]) => void
  onCategorySelect: (categories: GetPredefinedEventsCategoriesEnum[]) => void
  onEventIdSelect: (eventIds: GetPredefinedEventsIdsEnum[]) => void
  onResetClick: () => void
}

export const AttributePanel = (props: AttributePanelProps) => {
  const {
    isBuiltIn,
    isPanelOpen,
    isInitialDataLoading,
    isMaterialsLoading,
    isAttributeChanged,
    payload,
    attribute,
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

  const onActionClick = (attributes: TriggerAttribute) => {
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

  const renderAlertTypeStackCard = (
    alertTypes: GetPredefinedEventsTypesEnum[],
  ) => {
    if (isEmpty(alertTypes)) return null

    return (
      <TriggersStackCard
        title={attributeLabelMap.alertTypes}
        tags={alertTypes}
        actionsDisabled={isBuiltIn}
        onEditClick={() => onEditAttributeButtonClick('alertTypes')}
        onRemoveClick={() => onAlertTypeSelect([])}
      />
    )
  }

  const renderSeverityStackCard = (
    severities: GetPredefinedEventsSeveritiesEnum[],
  ) => {
    if (isEmpty(severities)) return null

    return (
      <TriggersStackCard
        title={attributeLabelMap.severities}
        tags={severities}
        actionsDisabled={isBuiltIn}
        onEditClick={() => onEditAttributeButtonClick('severities')}
        onRemoveClick={() => onSeveritySelect([])}
      />
    )
  }

  const renderCategoryStackCard = (categories: string[]) => {
    if (isEmpty(categories)) return null

    return (
      <TriggersStackCard
        title={attributeLabelMap.categories}
        tags={categories}
        actionsDisabled={isBuiltIn}
        onEditClick={() => onEditAttributeButtonClick('categories')}
        onRemoveClick={() => onCategorySelect([])}
      />
    )
  }

  const renderEventIdStackCard = (eventIds: string[]) => {
    if (isEmpty(eventIds)) return null

    return (
      <TriggersStackCard
        title={attributeLabelMap.eventIds}
        tags={eventIds}
        actionsDisabled={isBuiltIn}
        onEditClick={() => onEditAttributeButtonClick('eventIds')}
        onRemoveClick={() => onEventIdSelect([])}
      />
    )
  }

  const renderStackCards = () => {
    if (isInitialDataLoading) {
      return (
        <div className="flex items-center gap-4">
          <CosSkeleton className="h-[103px] w-full grow" />
          <div className="flex items-center gap-2">
            <CosSkeleton className="size-[34px]" />
            <CosSkeleton className="size-[34px]" />
          </div>
        </div>
      )
    }

    if (!payload) return

    return (
      <>
        {renderAlertTypeStackCard(payload.alertTypes)}
        {renderSeverityStackCard(payload.severities)}
        {renderCategoryStackCard(payload.categories)}
        {renderEventIdStackCard(payload.eventIds)}
      </>
    )
  }

  return (
    <div className={twMerge(panel({ isPanelOpen }))}>
      <div className="flex items-center justify-between">
        <h4 className="secondary-h4 text-functional-title">
          Add Attributes to Select Events
        </h4>
        <button
          type="button"
          className="inline-flex size-[26px] cursor-pointer items-center justify-center rounded-full bg-blue-150"
          onClick={onTogglePanel}
        >
          <InformationCircle className="icon-lg text-functional-text" />
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <CosButton
          type="ghost"
          usage="icon-left"
          Icon={AddSquare}
          onClick={onAddAttributeButtonClick}
          disabled={
            isInitialDataLoading ||
            isMaterialsLoading ||
            isBuiltIn ||
            checkIsAllSelected()
          }
        >
          Add Attributes
        </CosButton>

        <div className="flex">
          <CosButton
            type="ghost"
            onClick={onResetClick}
            disabled={isInitialDataLoading || isBuiltIn || !isAttributeChanged}
          >
            Reset
          </CosButton>
        </div>
      </div>
      <CosStroke />
      {renderStackCards()}
      {!!payload && (
        <AddAttributeModal
          isModalOpen={isModelOpen}
          payload={payload}
          attribute={attribute}
          activeType={activeType}
          dropdownOptions={dropdownOptions}
          onModelClose={onModalClose}
          onActiveTypeChange={onActiveTypeChange}
          onActionClick={onActionClick}
        />
      )}
    </div>
  )
}
