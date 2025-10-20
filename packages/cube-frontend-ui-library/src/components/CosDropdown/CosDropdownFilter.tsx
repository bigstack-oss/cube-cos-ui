import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import Search from '../../components/CosIcon/monochrome/search.svg?react'
import { useUILibraryTranslation } from '../../i18n/useUILibraryTranslation'
import { CosDropdownContext } from './cosDropdownContext'
import { filter } from './cosDropdownStyles'

export const CosDropdownFilter = () => {
  const { size, type, searchValue, handleSearchValueChange } =
    useContext(CosDropdownContext)

  const { t } = useUILibraryTranslation()

  return (
    <div className={twMerge(filter.container({ size, type }))}>
      <input
        type="text"
        className={twMerge(filter.input)}
        placeholder={t('component.dropdown.search')}
        value={searchValue}
        onChange={handleSearchValueChange}
      />
      <Search className={twMerge(filter.icon({ size, type }))} />
    </div>
  )
}
