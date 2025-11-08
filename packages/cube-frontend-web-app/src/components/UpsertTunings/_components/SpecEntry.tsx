import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { ListTuningSpecResponseDataInnerLimitation } from '@cube-frontend/api'
import { CosSkeleton } from '@cube-frontend/ui-library'
import { formatLimitation } from './SelectKeyValue/formatLimitation'

type SpecEntryProps = PropsWithChildren & {
  /**
   * @default false
   */
  isLoading?: boolean
  specName: string | undefined
  limitation?: ListTuningSpecResponseDataInnerLimitation | undefined
  valueLabel: string
}

export const SpecEntry = (props: SpecEntryProps) => {
  const {
    children,
    isLoading = false,
    specName,
    limitation,
    valueLabel,
  } = props

  const { t } = useTranslation()

  const skeleton = <CosSkeleton className="h-[38px] w-[170px]" />

  return (
    <div className="flex gap-x-4 px-4 py-3 text-functional-text">
      <div className="flex min-w-[170px] flex-col gap-y-1.5">
        <div className="primary-body2 font-semibold">
          {t('maintenance.tunings.upsert.key')}
        </div>
        {isLoading ? (
          skeleton
        ) : (
          <p className="primary-body3 py-[9px]">{specName}</p>
        )}
      </div>
      {limitation && (
        <div className="flex min-w-[170px] flex-col gap-y-1.5">
          <div className="primary-body2 font-semibold">
            {t('maintenance.tunings.upsert.limitation')}
          </div>
          {isLoading ? (
            skeleton
          ) : (
            <p className="primary-body3 py-[9px]">
              {formatLimitation(limitation, {
                showDefault: true,
              })}
            </p>
          )}
        </div>
      )}
      <div className="flex flex-col gap-y-1.5">
        <div className="primary-body2 font-semibold">{valueLabel}</div>
        {isLoading ? skeleton : children}
      </div>
    </div>
  )
}
