import { toUnitDisplay } from '@cube-frontend/web-app/utils/unit'
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

  const formattedRead = formatter(read)
  const formattedWrite = formatter(write)

  const unitDisplay = toUnitDisplay(unit, unitSuffix)
  const readLabel = `Read (${unitDisplay})`
  const writeLabel = `Write (${unitDisplay})`

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
