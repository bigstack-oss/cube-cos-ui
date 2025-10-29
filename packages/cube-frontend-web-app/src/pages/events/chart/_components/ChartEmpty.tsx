import Chart from '@cube-frontend/ui-library/icons/monochrome/chart.svg?react'
import { useTranslation } from 'react-i18next'

export const ChartEmpty = () => {
  const { t } = useTranslation()
  return (
    <div className="flex w-full flex-col items-center px-4 py-6">
      <Chart className="icon-xl m-2.5 text-functional-text" />
      <p className="primary-body2 text-functional-text-light">
        {t('events.chart.noData')}
      </p>
    </div>
  )
}
