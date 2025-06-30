import { ReactNode, useEffect, useState } from 'react'
import { CosButton, CosDropdown, CosModal } from '@cube-frontend/ui-library'
import AddSquare from '@cube-frontend/ui-library/icons/monochrome/add_square.svg?react'
import { AttributeCheckboxGroup } from './AttributeCheckboxGroup'

const attributeTypes = ['alertType', 'severity', 'category', 'eventId'] as const

type AttributeType = (typeof attributeTypes)[number]

const attributeLabelMap: Record<AttributeType, string> = {
  alertType: 'Alert Type',
  severity: 'Severity',
  category: 'Category',
  eventId: 'Event Id',
}

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
  alertTypes: string[]
  severities: string[]
  categories: string[]
  eventIds: string[]
  selectedAlertTypes: string[]
  selectedSeverities: string[]
  selectedCategories: string[]
  selectedEventIds: string[]
  onModelOpen: () => void
  onModelClose: () => void
  onActionClick: (attributes: {
    alertTypes: string[]
    severities: string[]
    categories: string[]
    eventIds: string[]
  }) => void
}

export const AddAttributeModal = (props: AddAttributeModalProps) => {
  const {
    isModalOpen,
    alertTypes,
    severities,
    categories,
    eventIds,
    selectedAlertTypes,
    selectedCategories,
    selectedEventIds,
    selectedSeverities,
    onModelOpen,
    onModelClose: onModelCloseProp,
    onActionClick: onActionClickProp,
  } = props

  const [activeType, setActiveType] = useState<AttributeType | undefined>()

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
    onModelCloseProp()
  }

  const onActionClick = () => {
    setActiveType(undefined)
    onActionClickProp(tempAttributes)
    onModelCloseProp()
  }

  const renderContentFnMap: Record<AttributeType, () => ReactNode> = {
    alertType: () => (
      <AttributeCheckboxGroup
        label={attributeLabelMap['alertType']}
        isAllChecked={checkIsAllChecked(tempAttributes.alertTypes, alertTypes)}
        attributes={alertTypes}
        selectedAttributes={tempAttributes.alertTypes}
        onAttributesChange={onTempAlertTypeChange}
        onAllAttributesChange={onAllTempAlertTypesChange}
      />
    ),
    severity: () => (
      <AttributeCheckboxGroup
        label={attributeLabelMap['severity']}
        isAllChecked={checkIsAllChecked(tempAttributes.severities, severities)}
        attributes={severities}
        selectedAttributes={tempAttributes.severities}
        onAttributesChange={onTempSeverityChange}
        onAllAttributesChange={onAllTempSeveritiesChange}
      />
    ),
    category: () => (
      <AttributeCheckboxGroup
        label={attributeLabelMap['category']}
        isAllChecked={checkIsAllChecked(tempAttributes.categories, categories)}
        attributes={categories}
        selectedAttributes={tempAttributes.categories}
        onAttributesChange={onTempCategoryChange}
        onAllAttributesChange={onAllTempCategoriesChange}
      />
    ),
    eventId: () => (
      <AttributeCheckboxGroup
        label={attributeLabelMap['eventId']}
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
      >
        Add Attribute
      </CosButton>
      <CosModal
        isOpen={isModalOpen}
        title="Add Attribute"
        actionText="Set Response"
        onActionClick={onActionClick}
        onCloseClick={onModelClose}
        className="h-[400px]"
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
              {attributeTypes.map((type) => (
                <CosDropdown.Item
                  key={type}
                  item={type}
                  onClick={() => setActiveType(type)}
                >
                  {attributeLabelMap[type]}
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
