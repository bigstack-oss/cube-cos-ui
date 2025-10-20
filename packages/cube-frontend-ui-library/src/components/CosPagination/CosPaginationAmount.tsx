import { useUILibraryTranslation } from '../../i18n/useUILibraryTranslation'

type CosPaginationAmountProps = {
  isMinimal: boolean
  totalItems: number
}

export const CosPaginationAmount = (props: CosPaginationAmountProps) => {
  const { isMinimal, totalItems } = props

  const { t } = useUILibraryTranslation()

  return (
    <div className="secondary-body4 p-[10px] text-functional-text">
      <span>
        {isMinimal
          ? t('component.pagination.amount.short')
          : t('component.pagination.amount.long')}
      </span>
      {totalItems}
    </div>
  )
}
