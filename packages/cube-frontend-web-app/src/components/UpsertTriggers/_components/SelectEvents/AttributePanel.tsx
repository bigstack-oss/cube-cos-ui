import { useState, useEffect } from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import {
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
  onAlertTypeSelect: (alertTypes: string[]) => void
  onSeveritySelect: (severities: string[]) => void
  onCategorySelect: (categories: string[]) => void
  onEventIdSelect: (eventIds: string[]) => void
  onResetClick: () => void
}

export const AttributePanel = (props: AttributePanelProps) => {
  const {
    isPanelOpen,
    isLoading,
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

  const [unselectedAttributeOptions, setUnselectedAttributeOptions] = useState<
    TriggerAttributeKeys[]
  >(() => filterUnselectedAttributeOptions(payload))

  useEffect(() => {
    const newDropdownOptions = filterUnselectedAttributeOptions(payload)
    setUnselectedAttributeOptions(newDropdownOptions)
  }, [payload])

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
    <div className={twMerge(panel({ isPanelOpen }))}>
      <div className="flex items-center justify-between">
        <h4 className="secondary-h4 text-functional-title">
          Add Attributes to select events
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
        <AddAttributeModal
          isModalOpen={isModelOpen}
          payload={payload}
          attributes={attributes}
          dropdownOptions={unselectedAttributeOptions}
          disabled={unselectedAttributeOptions.length === 0}
          onModelOpen={() => setIsModelOpen(true)}
          onModelClose={() => setIsModelOpen(false)}
          onActionClick={onActionClick}
        />
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
    </div>
  )
}
