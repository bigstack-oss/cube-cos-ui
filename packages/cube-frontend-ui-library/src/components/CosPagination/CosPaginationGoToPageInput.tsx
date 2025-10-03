import {
  CosTableInput,
  CosTableInputProps,
} from '../CosTableInput/CosTableInput'
import { useUILibraryTranslation } from '../../i18n/useUILibraryTranslation'

type CosPaginationGoToPageInputProps = CosTableInputProps & {
  isMinimal: boolean
}

export const CosPaginationGoToPageInput = (
  props: CosPaginationGoToPageInputProps,
) => {
  const { isMinimal, ...restProps } = props

  const { t } = useUILibraryTranslation()

  return (
    <div className="secondary-body4 flex items-center">
      {!isMinimal && (
        <div className="p-[10px]">{t('component.pagination.goTo')}</div>
      )}
      {/* Use table input because the space for error message/icon is limited
          in pagination. */}
      <CosTableInput {...restProps} className="h-7 w-[59px]" />
    </div>
  )
}
