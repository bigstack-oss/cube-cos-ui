import { CosDropdown } from '../CosDropdown/CosDropdown'

type CosPaginationViewDropdownProps = {
  itemsPerPage?: number
  onItemsPerPageChange: (num: number) => void
}

const options = [10, 20, 30, 50, 100]

export const DEFAULT_ITEMS_PER_PAGE = 10

export const CosPaginationViewDropdown = (
  props: CosPaginationViewDropdownProps,
) => {
  const { itemsPerPage = DEFAULT_ITEMS_PER_PAGE, onItemsPerPageChange } = props

  return (
    <div className="secondary-body4 flex items-center">
      <div className="p-[10px]">View</div>
      <div className="w-[104px]">
        <CosDropdown
          variant="in-table"
          type="regular"
          selectedItems={[itemsPerPage]}
        >
          <CosDropdown.Trigger placeholder="Choose" className="h-7">
            {itemsPerPage.toString()}
          </CosDropdown.Trigger>
          <CosDropdown.Menu>
            {options.map((num) => (
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
    </div>
  )
}
