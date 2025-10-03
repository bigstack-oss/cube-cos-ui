import { useUILibraryTranslation } from '../../../i18n/useUILibraryTranslation'
import { twMerge } from 'tailwind-merge'
import Search from '../../../components/CosIcon/monochrome/search.svg?react'

type CosTableTdEmptyProps = {
  length: number
}

export const CosTableTdEmpty = (props: CosTableTdEmptyProps) => {
  const { length } = props

  const { t } = useUILibraryTranslation()

  return (
    <td colSpan={length} className="p-6">
      <div
        className={twMerge(
          'flex flex-col items-center justify-center text-functional-text-light',
        )}
      >
        <Search className="icon-lg m-[10px]" />
        <p className="primary-body2">{t('component.table.noResult')}</p>
      </div>
    </td>
  )
}
