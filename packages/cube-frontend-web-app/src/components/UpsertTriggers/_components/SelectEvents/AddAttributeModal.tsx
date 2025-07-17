import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import xor from 'lodash/xor'
import { CosDropdown, CosModal } from '@cube-frontend/ui-library'
import {
  GetPredefinedEventsCategoriesEnum,
  GetPredefinedEventsIdsEnum,
  GetPredefinedEventsSeveritiesEnum,
  GetPredefinedEventsTypesEnum,
} from '@cube-frontend/api'
import {
  attributeLabelMap,
  TriggerAttributeKeys,
  TriggerAttribute,
  UpsertTriggersPayload,
} from '../../upsertTriggersUtils'
import { AttributeCheckboxGroup } from './AttributeCheckboxGroup'
import { isEqual } from 'lodash'

const checkIsAllChecked = (
  selectedAttributes: string[],
  options: string[],
): boolean | null => {
  if (selectedAttributes.length === options.length) return true
  if (selectedAttributes.length === 0) return false
  return null
}

const checkIsSelectionChanged = (
  dropdownOptions: TriggerAttributeKeys[],
  defaultSelection: TriggerAttribute,
  selection: TriggerAttribute,
): boolean => {
  return dropdownOptions.some((key) => {
    const defaultValue = defaultSelection[key]
    const selectedValue = selection[key]
    return !isEqual(defaultValue, selectedValue)
  })
}

type AddAttributeModalProps = {
  isModalOpen: boolean
  payload: UpsertTriggersPayload
  attribute: TriggerAttribute
  activeType: TriggerAttributeKeys | undefined
  dropdownOptions: TriggerAttributeKeys[]
  onModelClose: () => void
  onActiveTypeChange: (type: TriggerAttributeKeys) => void
  onActionClick: (attributes: TriggerAttribute) => void
}

export const AddAttributeModal = (props: AddAttributeModalProps) => {
  const {
    isModalOpen,
    payload,
    attribute,
    activeType,
    dropdownOptions,
    onModelClose: onModelCloseProp,
    onActiveTypeChange,
    onActionClick: onActionClickProp,
  } = props

  const { alertTypes, severities, categories, eventIds } = attribute

  const {
    alertTypes: defaultSelectedAlertTypes,
    severities: defaultSelectedSeverities,
    categories: defaultSelectedCategories,
    eventIds: defaultSelectedEventIds,
  } = payload

  // Clone values to avoid referencing the original payload fields directly
  // Prevents unintended shared mutations in state
  const cloneAttributes = useCallback((): TriggerAttribute => {
    return structuredClone({
      alertTypes: defaultSelectedAlertTypes,
      severities: defaultSelectedSeverities,
      categories: defaultSelectedCategories,
      eventIds: defaultSelectedEventIds,
    })
  }, [
    defaultSelectedAlertTypes,
    defaultSelectedSeverities,
    defaultSelectedCategories,
    defaultSelectedEventIds,
  ])

  const [selectedAttributes, setSelectedAttributes] =
    useState<TriggerAttribute>(cloneAttributes)

  useEffect(() => {
    setSelectedAttributes(cloneAttributes())
  }, [cloneAttributes])

  const isSelectionChanged = useMemo(() => {
    const defaultAttributes = cloneAttributes()
    return checkIsSelectionChanged(
      dropdownOptions,
      defaultAttributes,
      selectedAttributes,
    )
  }, [cloneAttributes, dropdownOptions, selectedAttributes])

  const onSelectedAlertTypeChange = (
    alertType: GetPredefinedEventsTypesEnum,
  ) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      alertTypes: xor(prev.alertTypes, [alertType]),
    }))
  }

  const onAllSelectedAlertTypesChange = (): void => {
    setSelectedAttributes((prev) => {
      const updatedAlertTypes = checkIsAllChecked(prev.alertTypes, alertTypes)
        ? []
        : alertTypes

      return { ...prev, alertTypes: updatedAlertTypes }
    })
  }

  const onSelectedSeverityChange = (
    severity: GetPredefinedEventsSeveritiesEnum,
  ) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      severities: xor(prev.severities, [severity]),
    }))
  }

  const onAllSelectedSeveritiesChange = (): void => {
    setSelectedAttributes((prev) => {
      const updatedSeverities = checkIsAllChecked(prev.severities, severities)
        ? []
        : severities

      return { ...prev, severities: updatedSeverities }
    })
  }

  const onSelectedCategoryChange = (
    category: GetPredefinedEventsCategoriesEnum,
  ) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      categories: xor(prev.categories, [category]),
    }))
  }

  const onAllSelectedCategoriesChange = (): void => {
    setSelectedAttributes((prev) => {
      const updatedCategories = checkIsAllChecked(prev.categories, categories)
        ? []
        : categories

      return { ...prev, categories: updatedCategories }
    })
  }

  const onSelectedEventIdChange = (eventId: GetPredefinedEventsIdsEnum) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      eventIds: xor(prev.eventIds, [eventId]),
    }))
  }

  const onAllSelectedEventIdsChange = (): void => {
    setSelectedAttributes((prev) => {
      const updatedEventIds = checkIsAllChecked(prev.eventIds, eventIds)
        ? []
        : eventIds

      return { ...prev, eventIds: updatedEventIds }
    })
  }

  const onModelClose = () => {
    setSelectedAttributes({
      alertTypes: defaultSelectedAlertTypes,
      severities: defaultSelectedSeverities,
      categories: defaultSelectedCategories,
      eventIds: defaultSelectedEventIds,
    })
    onModelCloseProp()
  }

  const onActionClick = () => {
    onActionClickProp(selectedAttributes)
    onModelCloseProp()
  }

  const renderContentFnMap: Record<TriggerAttributeKeys, () => ReactNode> = {
    alertTypes: () => (
      <AttributeCheckboxGroup
        label={attributeLabelMap.alertTypes}
        isAllChecked={checkIsAllChecked(
          selectedAttributes.alertTypes,
          alertTypes,
        )}
        attributes={alertTypes}
        selectedAttributes={selectedAttributes.alertTypes}
        onAttributesChange={onSelectedAlertTypeChange}
        onAllAttributesChange={onAllSelectedAlertTypesChange}
      />
    ),
    severities: () => (
      <AttributeCheckboxGroup
        label={attributeLabelMap.severities}
        isAllChecked={checkIsAllChecked(
          selectedAttributes.severities,
          severities,
        )}
        attributes={severities}
        selectedAttributes={selectedAttributes.severities}
        onAttributesChange={onSelectedSeverityChange}
        onAllAttributesChange={onAllSelectedSeveritiesChange}
      />
    ),
    categories: () => (
      <AttributeCheckboxGroup
        label={attributeLabelMap.categories}
        isAllChecked={checkIsAllChecked(
          selectedAttributes.categories,
          categories,
        )}
        attributes={categories}
        selectedAttributes={selectedAttributes.categories}
        onAttributesChange={onSelectedCategoryChange}
        onAllAttributesChange={onAllSelectedCategoriesChange}
      />
    ),
    eventIds: () => (
      <AttributeCheckboxGroup
        label={attributeLabelMap.eventIds}
        isAllChecked={checkIsAllChecked(selectedAttributes.eventIds, eventIds)}
        attributes={eventIds}
        selectedAttributes={selectedAttributes.eventIds}
        onAttributesChange={onSelectedEventIdChange}
        onAllAttributesChange={onAllSelectedEventIdsChange}
      />
    ),
  }

  const renderContent = activeType ? renderContentFnMap[activeType] : () => null

  return (
    <CosModal
      isOpen={isModalOpen}
      title="Add Attributes"
      actionText="Add Attributes"
      actionButtonProps={{
        disabled: !isSelectionChanged,
      }}
      onActionClick={onActionClick}
      onCloseClick={onModelClose}
      className="h-[490px]"
    >
      <div className="mb-8 w-[186px]">
        <CosDropdown
          size="md"
          type="radio"
          variant="regular"
          isLoading={false}
          disabled={false}
          selectedItems={[activeType]}
        >
          <CosDropdown.Trigger>
            {activeType ? attributeLabelMap[activeType] : 'Choose an attribute'}
          </CosDropdown.Trigger>
          <CosDropdown.Menu>
            {dropdownOptions.map((option) => (
              <CosDropdown.Item
                key={option}
                item={option}
                onClick={() => onActiveTypeChange(option)}
              >
                {attributeLabelMap[option]}
              </CosDropdown.Item>
            ))}
          </CosDropdown.Menu>
        </CosDropdown>
      </div>
      {renderContent()}
    </CosModal>
  )
}
