import { ReactNode, useEffect, useState } from 'react'
import { CosButton, CosDropdown, CosModal } from '@cube-frontend/ui-library'
import AddSquare from '@cube-frontend/ui-library/icons/monochrome/add_square.svg?react'
import { AttributeCheckboxGroup } from './AttributeCheckboxGroup'
import {
  attributeLabelMap,
  TriggerAttributeKeys,
  TriggerAttributes,
  UpsertTriggersPayload,
} from '../../upsertTriggersUtils'

const checkIsAllChecked = (
  tempAttributes: string[],
  options: string[],
): boolean | null => {
  if (tempAttributes.length === options.length) return true
  if (tempAttributes.length === 0) return false
  return null
}

type AddAttributeModalProps = {
  isModalOpen: boolean
  payload: UpsertTriggersPayload
  attributes: TriggerAttributes
  dropdownOptions: TriggerAttributeKeys[]
  disabled: boolean
  onModelOpen: () => void
  onModelClose: () => void
  onActionClick: (attributes: TriggerAttributes) => void
}

export const AddAttributeModal = (props: AddAttributeModalProps) => {
  const {
    isModalOpen,
    payload,
    attributes,
    dropdownOptions,
    disabled,
    onModelOpen,
    onModelClose: onModelCloseProp,
    onActionClick: onActionClickProp,
  } = props

  const { alertTypes, severities, categories, eventIds } = attributes

  const {
    alertTypes: selectedAlertTypes,
    severities: selectedSeverities,
    categories: selectedCategories,
    eventIds: selectedEventIds,
  } = payload

  const [activeType, setActiveType] = useState<TriggerAttributeKeys>()

  const [tempAttributes, setTempAttributes] = useState<{
    alertTypes: string[]
    severities: string[]
    categories: string[]
    eventIds: string[]
  }>({
    alertTypes: selectedAlertTypes,
    severities: selectedCategories,
    categories: selectedEventIds,
    eventIds: selectedSeverities,
  })

  useEffect(() => {
    setTempAttributes({
      alertTypes: selectedAlertTypes,
      severities: selectedSeverities,
      categories: selectedCategories,
      eventIds: selectedEventIds,
    })
  }, [
    selectedAlertTypes,
    selectedSeverities,
    selectedCategories,
    selectedEventIds,
  ])

  const onTempAlertTypeChange = (alertType: string) => {
    setTempAttributes((prev) => {
      const { alertTypes } = prev
      const updatedAlertTypes = alertTypes.includes(alertType)
        ? alertTypes.filter((a) => a !== alertType)
        : [...alertTypes, alertType]

      return { ...prev, alertTypes: updatedAlertTypes }
    })
  }

  const onAllTempAlertTypesChange = (): void => {
    setTempAttributes((prev) => {
      const updatedAlertTypes = checkIsAllChecked(prev.alertTypes, alertTypes)
        ? []
        : alertTypes

      return { ...prev, alertTypes: updatedAlertTypes }
    })
  }

  const onTempSeverityChange = (severity: string) => {
    setTempAttributes((prev) => {
      const { severities } = prev
      const updatedSeverities = severities.includes(severity)
        ? severities.filter((s) => s !== severity)
        : [...severities, severity]

      return { ...prev, severities: updatedSeverities }
    })
  }

  const onAllTempSeveritiesChange = (): void => {
    setTempAttributes((prev) => {
      const updatedSeverities = checkIsAllChecked(prev.severities, severities)
        ? []
        : severities

      return { ...prev, severities: updatedSeverities }
    })
  }

  const onTempCategoryChange = (category: string) => {
    setTempAttributes((prev) => {
      const { categories } = prev
      const updatedCategories = categories.includes(category)
        ? categories.filter((c) => c !== category)
        : [...categories, category]

      return { ...prev, categories: updatedCategories }
    })
  }

  const onAllTempCategoriesChange = (): void => {
    setTempAttributes((prev) => {
      const updatedCategories = checkIsAllChecked(prev.categories, categories)
        ? []
        : categories

      return { ...prev, categories: updatedCategories }
    })
  }

  const onTempEventIdChange = (eventId: string) => {
    setTempAttributes((prev) => {
      const { eventIds } = prev
      const updatedEventIds = eventIds.includes(eventId)
        ? eventIds.filter((e) => e !== eventId)
        : [...eventIds, eventId]

      return { ...prev, eventIds: updatedEventIds }
    })
  }

  const onAllTempEventIdsChange = (): void => {
    setTempAttributes((prev) => {
      const updatedEventIds = checkIsAllChecked(prev.eventIds, eventIds)
        ? []
        : eventIds

      return { ...prev, eventIds: updatedEventIds }
    })
  }

  const onModelClose = () => {
    setActiveType(undefined)
    setTempAttributes({
      alertTypes: selectedAlertTypes,
      severities: selectedSeverities,
      categories: selectedCategories,
      eventIds: selectedEventIds,
    })
    onModelCloseProp()
  }

  const onActionClick = () => {
    setActiveType(undefined)
    onActionClickProp(tempAttributes)
    onModelCloseProp()
  }

  const renderContentFnMap: Record<TriggerAttributeKeys, () => ReactNode> = {
    alertTypes: () => (
      <AttributeCheckboxGroup
        label={attributeLabelMap['alertTypes']}
        isAllChecked={checkIsAllChecked(tempAttributes.alertTypes, alertTypes)}
        attributes={alertTypes}
        selectedAttributes={tempAttributes.alertTypes}
        onAttributesChange={onTempAlertTypeChange}
        onAllAttributesChange={onAllTempAlertTypesChange}
      />
    ),
    severities: () => (
      <AttributeCheckboxGroup
        label={attributeLabelMap['severities']}
        isAllChecked={checkIsAllChecked(tempAttributes.severities, severities)}
        attributes={severities}
        selectedAttributes={tempAttributes.severities}
        onAttributesChange={onTempSeverityChange}
        onAllAttributesChange={onAllTempSeveritiesChange}
      />
    ),
    categories: () => (
      <AttributeCheckboxGroup
        label={attributeLabelMap['categories']}
        isAllChecked={checkIsAllChecked(tempAttributes.categories, categories)}
        attributes={categories}
        selectedAttributes={tempAttributes.categories}
        onAttributesChange={onTempCategoryChange}
        onAllAttributesChange={onAllTempCategoriesChange}
      />
    ),
    eventIds: () => (
      <AttributeCheckboxGroup
        label={attributeLabelMap['eventIds']}
        isAllChecked={checkIsAllChecked(tempAttributes.eventIds, eventIds)}
        attributes={eventIds}
        selectedAttributes={tempAttributes.eventIds}
        onAttributesChange={onTempEventIdChange}
        onAllAttributesChange={onAllTempEventIdsChange}
      />
    ),
  }

  const renderContent = activeType ? renderContentFnMap[activeType] : () => null

  return (
    <div>
      <CosButton
        type="ghost"
        usage="icon-left"
        Icon={AddSquare}
        onClick={onModelOpen}
        disabled={disabled}
      >
        Add Attribute
      </CosButton>
      <CosModal
        isOpen={isModalOpen}
        title="Add Attribute"
        actionText="Set Response"
        onActionClick={onActionClick}
        onCloseClick={onModelClose}
        className="h-[490px]"
      >
        <div className="mb-8 w-[186px]">
          <CosDropdown
            type="regular"
            variant="default"
            isLoading={false}
            disabled={false}
            selectedItems={[activeType]}
          >
            <CosDropdown.Trigger>
              {activeType
                ? attributeLabelMap[activeType]
                : 'Choose an attribute'}
            </CosDropdown.Trigger>
            <CosDropdown.Menu>
              {dropdownOptions.map((option: TriggerAttributeKeys) => (
                <CosDropdown.Item
                  key={option}
                  item={option}
                  onClick={() => setActiveType(option)}
                >
                  {attributeLabelMap[option]}
                </CosDropdown.Item>
              ))}
            </CosDropdown.Menu>
          </CosDropdown>
        </div>
        {renderContent()}
      </CosModal>
    </div>
  )
}
