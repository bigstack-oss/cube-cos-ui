import { DeviceType } from '@cube-frontend/api'
import { CosDropdown } from '@cube-frontend/ui-library'
import { DeviceRow } from './nodeDevicesUtils'

type DefinedClassCellProps = {
  row: DeviceRow
  onChange: (type: DeviceType) => void
}

export const DefinedClassCell = (props: DefinedClassCellProps) => {
  const { row, onChange } = props

  const {
    class: definedClass,
    status: { isPromotable, isDemotable },
    isEditing,
    isSaving,
    dataForEdit,
  } = row

  const noOptionsAvailable = !isPromotable && !isDemotable

  if (!isEditing || noOptionsAvailable) return definedClass

  return (
    <CosDropdown
      size="sm"
      type="radio"
      selectedItems={[dataForEdit.definedClass]}
      disabled={isSaving}
    >
      <CosDropdown.Trigger>{dataForEdit.definedClass}</CosDropdown.Trigger>
      <CosDropdown.Menu>
        <CosDropdown.Item
          item={DeviceType.Ssd}
          disabled={!isPromotable && row.class !== DeviceType.Ssd}
          onClick={() => onChange(DeviceType.Ssd)}
        >
          {DeviceType.Ssd}
        </CosDropdown.Item>
        <CosDropdown.Item
          item={DeviceType.Hdd}
          disabled={!isDemotable && row.class !== DeviceType.Hdd}
          onClick={() => onChange(DeviceType.Hdd)}
        >
          {DeviceType.Hdd}
        </CosDropdown.Item>
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
