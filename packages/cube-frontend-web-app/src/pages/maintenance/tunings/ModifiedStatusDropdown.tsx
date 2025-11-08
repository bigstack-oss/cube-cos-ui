import { CosDropdown } from '@cube-frontend/ui-library'
import { modifiedOptions } from './tuningsUtils'
import { useTranslation } from 'react-i18next'

type ModifiedStatusDropdownProps = {
  selectedModified: boolean[]
  onItemClick: (modified: boolean) => void
  onAllCheckChange: (checked: boolean) => void
}

export const ModifiedStatusDropdown = (props: ModifiedStatusDropdownProps) => {
  const { selectedModified, onItemClick, onAllCheckChange } = props

  const { t } = useTranslation()

  const onClearSelection = (): void => {
    onAllCheckChange(false)
  }

  return (
    <CosDropdown
      size="sm"
      type="checkbox"
      variant="withFilter"
      selectedItems={selectedModified}
      onAllCheckChange={onAllCheckChange}
      onClearSelection={onClearSelection}
    >
      <CosDropdown.Trigger
        className="w-[168px]"
        placeholder={t('maintenance.tunings.modifyStatuses')}
      >
        {selectedModified.length
          ? t('maintenance.tunings.modifyStatuses')
          : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {modifiedOptions.map((modified) => (
          <CosDropdown.Item
            key={modified.toString()}
            item={modified}
            onClick={() => onItemClick(modified)}
          >
            {modified
              ? t('maintenance.tunings.modifyStatus.modified')
              : t('maintenance.tunings.modifyStatus.unmodified')}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
