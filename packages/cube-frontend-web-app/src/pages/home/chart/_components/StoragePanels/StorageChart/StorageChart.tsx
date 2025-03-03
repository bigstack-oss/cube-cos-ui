import { StorageChartContainer } from './StorageChartContainer'
import { StorageHistory } from './StorageHistory'
import { CurrentStorage } from './CurrentStorage'
import { Formatter, getLastValue, TimeValue } from './utils'

type StorageChartProps = {
  unit: string
  unitSuffix?: string
  read: TimeValue[]
  write: TimeValue[]
  formatter: Formatter
  isLoading: boolean
}

export const StorageChart = (props: StorageChartProps) => {
  const { unit, unitSuffix = '', read, write, formatter, isLoading } = props

  const currentRead = getLastValue(read)
  const currentWrite = getLastValue(write)

  return (
    <StorageChartContainer isLoading={isLoading}>
      <StorageHistory
        unit={unit}
        unitSuffix={unitSuffix}
        read={read}
        write={write}
        formatter={formatter}
        isLoading={isLoading}
      />
      <CurrentStorage
        unit={unit}
        unitSuffix={unitSuffix}
        read={currentRead}
        write={currentWrite}
        formatter={formatter}
      />
    </StorageChartContainer>
  )
}
