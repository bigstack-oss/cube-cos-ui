import { twMerge } from 'tailwind-merge'
import { useUILibraryTranslation } from '../../../i18n/useUILibraryTranslation'
import { CosDropdownSize, CosDropdownType } from '../cosDropdownTypes'
import { item } from '../cosDropdownStyles'

type ItemNoDataProps = {
  size: CosDropdownSize
  type: CosDropdownType
}

export const ItemNoData = (props: ItemNoDataProps) => {
  const { size, type } = props

  const { t } = useUILibraryTranslation()

  return (
    <div className={twMerge(item.noData({ size, type }))}>
      {t('component.dropdown.noData')}
    </div>
  )
}
