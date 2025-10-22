import { useTranslation } from 'react-i18next'
import { useUnitDisplay } from '@cube-frontend/web-app/hooks/useUnitDisplay'
import { CurrentStorageItem } from './CurrentStorageItem'
import { Formatter } from './utils'

type CurrentStorageProps = {
  unit: string
  unitSuffix: string
  read: number
  write: number
  formatter: Formatter
}

export const CurrentStorage = (props: CurrentStorageProps) => {
  const { unit, unitSuffix, read, write, formatter } = props

  const { t } = useTranslation()

  const { toUnitDisplay } = useUnitDisplay()

  const formattedRead = formatter(read)
  const formattedWrite = formatter(write)

  const unitDisplay = toUnitDisplay(unit, unitSuffix)
  const readLabel = `${t('home.chart.storage.read')}(${unitDisplay})`
  const writeLabel = `${t('home.chart.storage.write')}(${unitDisplay})`

  return (
    <div className="flex items-center justify-center gap-x-4">
      <CurrentStorageItem type="read" label={readLabel} value={formattedRead} />
      <CurrentStorageItem
        type="write"
        label={writeLabel}
        value={formattedWrite}
      />
    </div>
  )
}
