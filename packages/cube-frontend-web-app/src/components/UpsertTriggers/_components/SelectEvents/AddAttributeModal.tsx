import { ReactNode, useEffect, useState } from 'react'
import {
  CosButton,
  CosCheckbox,
  CosCheckboxGrid,
  CosDropdown,
  CosModal,
} from '@cube-frontend/ui-library'
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

type AddAttributeModalProps = {
  isModalOpen: boolean
  severities: string[]
  eventIds: string[]
  onModelOpen: () => void
  onModelClose: () => void
  onActionClick: () => void
}

export const AddAttributeModal = (props: AddAttributeModalProps) => {
  const {
    isModalOpen,
    severities,
    eventIds,
    onModelOpen,
    onModelClose: onModelCloseProp,
    onActionClick: onActionClickProp,
  } = props

  const [activeType, setActiveType] = useState<AttributeType | undefined>()

  const [tempSeverities, setTempSeverities] = useState<string[]>([])

  const [isAllTempSeveritiesChecked, setIsAllTempSeveritiesChecked] = useState<
    boolean | null
  >(false)

  const [tempEventIds, setTempEventIds] = useState<string[]>([])

  useEffect(() => {
    if (tempSeverities.length === severities.length) {
      setIsAllTempSeveritiesChecked(true)
    } else if (tempSeverities.length === 0) {
      setIsAllTempSeveritiesChecked(false)
    } else {
      setIsAllTempSeveritiesChecked(null)
    }
  }, [severities.length, tempSeverities])

  const onTempSeveritiesChange = (severity: string) => {
    const isSelected = tempSeverities.includes(severity)
    setTempSeverities((prev) => {
      return isSelected
        ? prev.filter((s) => s !== severity)
        : [...prev, severity]
    })
  }

  const onAllTempSeveritiesChange = (): void => {
    if (isAllTempSeveritiesChecked) {
      setTempSeverities([])
    } else {
      setTempSeverities(severities)
    }
  }

  const onTempEventIdsChange = (id: string) => {
    const isSelected = tempEventIds.includes(id)
    setTempEventIds((prev) => {
      return isSelected ? prev.filter((i) => i !== id) : [...prev, id]
    })
  }

  const onModelClose = () => {
    setActiveType(undefined)
    onModelCloseProp()
  }

  const onActionClick = () => {
    setActiveType(undefined)
    onActionClickProp()
    onModelCloseProp()
  }

  const renderContentFnMap: Record<AttributeType, () => ReactNode> = {
    alertType: () => <div>Alert Type</div>,
    severity: () => (
      <AttributeCheckboxGroup
        label={attributeLabelMap['severity']}
        isAllChecked={isAllTempSeveritiesChecked}
        attributes={severities}
        selectedAttributes={tempSeverities}
        onAttributesChange={onTempSeveritiesChange}
        onAllAttributesChange={onAllTempSeveritiesChange}
      />
    ),
    category: () => <div>Category</div>,
    eventId: () => (
      <CosCheckboxGrid direction="wrap">
        {eventIds.map((id) => (
          <CosCheckbox
            label={id}
            checked={tempEventIds.includes(id)}
            onChange={() => onTempEventIdsChange(id)}
          />
        ))}
      </CosCheckboxGrid>
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
        <div>{renderContent()}</div>
      </CosModal>
    </div>
  )
}
