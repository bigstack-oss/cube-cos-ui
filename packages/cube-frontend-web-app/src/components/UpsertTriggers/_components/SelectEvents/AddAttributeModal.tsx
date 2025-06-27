import { useState } from 'react'
import { CosButton, CosDropdown, CosModal } from '@cube-frontend/ui-library'
import AddSquare from '@cube-frontend/ui-library/icons/monochrome/add_square.svg?react'

type OptionType = { label: string; value: string }

const options = [
  { label: 'Alert Type', value: 'alertType' },
  { label: 'Severity', value: 'severity' },
  { label: 'Category', value: 'category' },
  { label: 'Event ID', value: 'eventId' },
] satisfies OptionType[]

type AddAttributeModalProps = {
  isModalOpen: boolean
  onModelOpen: () => void
  onModelClose: () => void
  onActionClick: () => void
}

export const AddAttributeModal = (props: AddAttributeModalProps) => {
  const { isModalOpen, onModelOpen, onModelClose, onActionClick } = props

  const [selectedItems, setSelectedItems] = useState<OptionType[]>([])

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
        <CosDropdown
          type="regular"
          variant="default"
          selectedItems={selectedItems}
          disabled={false}
          isLoading={false}
        >
          <CosDropdown.Trigger placeholder="Choose an attribute">
            {selectedItems.length > 0 ? selectedItems[0].label : undefined}
          </CosDropdown.Trigger>
          <CosDropdown.Menu>
            {options.map((option) => (
              <CosDropdown.Item
                key={option.value}
                item={option}
                onClick={() => setSelectedItems([option])}
              >
                {option.label}
              </CosDropdown.Item>
            ))}
          </CosDropdown.Menu>
        </CosDropdown>
      </CosModal>
    </div>
  )
}
