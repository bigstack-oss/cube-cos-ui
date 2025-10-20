import { useUILibraryTranslation } from '../../i18n/useUILibraryTranslation'
import { CosDropdown } from '../CosDropdown/CosDropdown'
import {
  DEFAULT_ITEMS_PER_PAGE,
  ItemsPerPage,
  itemsPerPageOptions,
} from './cosPaginationUtils'

type CosPaginationViewDropdownProps = {
  isMinimal: boolean
  itemsPerPage: ItemsPerPage
  onItemsPerPageChange: (num: ItemsPerPage) => void
}

export const CosPaginationViewDropdown = (
  props: CosPaginationViewDropdownProps,
) => {
  const {
    isMinimal,
    itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
    onItemsPerPageChange,
  } = props

  const { t } = useUILibraryTranslation()

  return (
    <div className="secondary-body4 flex items-center">
      {!isMinimal && (
        <div className="p-[10px]">{t('component.pagination.view')}</div>
      )}
      <CosDropdown
        size="sm"
        type="radio"
        variant="regular"
        selectedItems={[itemsPerPage]}
      >
        <CosDropdown.Trigger placeholder="View" className="h-7">
          {itemsPerPage.toString()}
        </CosDropdown.Trigger>
        <CosDropdown.Menu>
          {itemsPerPageOptions.map((num) => (
            <CosDropdown.Item
              key={num}
              item={num}
              onClick={() => onItemsPerPageChange(num)}
            >
              {num.toString()}
            </CosDropdown.Item>
          ))}
        </CosDropdown.Menu>
      </CosDropdown>
    </div>
  )
}
