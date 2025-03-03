import { Current } from './CurrentStorage'

export type Formatter = (
  value: number,
  unit: string,
) => { value: string | number; unit: string }

type StorageChartFooterProps = {
  unit: string
  unitSuffix: string
  read: number
  write: number
  formatter: Formatter
}
export const StorageChartFooter = (props: StorageChartFooterProps) => {
  const { unit, unitSuffix, read, write, formatter } = props

  const { value: formattedReadValue, unit: formattedReadUnit } = formatter(
    read,
    unit,
  )
  const { value: formattedWriteValue, unit: formattedWriteUnit } = formatter(
    write,
    unit,
  )

  const readLabel = `Read (${formattedReadUnit}${unitSuffix})`
  const writeLabel = `Write (${formattedWriteUnit}${unitSuffix})`

  return (
    <div className="flex items-center gap-x-4">
      <Current type="read" label={readLabel} value={formattedReadValue} />
      <Current type="write" label={writeLabel} value={formattedWriteValue} />
    </div>
  )
}
