import { twMerge } from 'tailwind-merge'
import { CosDropdownSize, CosDropdownType } from '../cosDropdownTypes'
import { item } from '../cosDropdownStyles'

type ItemNoDataProps = {
  size: CosDropdownSize
  type: CosDropdownType
}

export const ItemNoData = (props: ItemNoDataProps) => {
  const { size, type } = props

  // TODO: i18n
  return <div className={twMerge(item.noData({ size, type }))}>No Data</div>
}
