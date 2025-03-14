import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import dayjs from 'dayjs'
import { cubeTheme } from '@cube-frontend/ui-theme/src/cubeTheme'
import { Line } from 'react-chartjs-2'
import { Formatter, StorageChartFooter } from './StorageChartFooter'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

type TimeValue = {
  time: string
  value: number
}

type StorageChartProps = {
  unit: string
  unitSuffix?: string
  read: TimeValue[]
  write: TimeValue[]
  formatter: Formatter
}

const getLast = (data: TimeValue[]) => {
  return data[data.length - 1]?.value ?? 0
}

export const StorageChart = (props: StorageChartProps) => {
  const { unit, unitSuffix = '', read, write, formatter } = props

  const lastRead = getLast(read)
  const lastWrite = getLast(write)

  return (
    <div className="flex flex-col gap-y-4">
      <div className="h-[400px]">
        <Line
          data={{
            labels: read.map((item) => dayjs(item.time).format('HH:mm')),
            datasets: [
              {
                label: 'Read',
                data: read.map((item) => item.value),
                fill: false,
                borderColor: cubeTheme.colors.chart[3],
                tension: 0.1,
              },
              {
                label: 'Write',
                data: write.map((item) => item.value),
                fill: false,
                borderColor: cubeTheme.colors.primary.DEFAULT,
                tension: 0.1,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            interaction: {
              mode: 'nearest',
              axis: 'x',
              intersect: false,
            },
            scales: {
              x: {
                grid: { display: false },
              },
              y: {
                border: { display: false },
                ticks: {
                  stepSize: (1024 * 1024) / 16,
                  callback(tickValue, index, ticks) {
                    const { value: formattedValue, unit: formattedUnit } =
                      formatter(tickValue, unit)
                    console.log(tickValue)
                    return `${formattedValue} ${formattedUnit}`
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const { value: formattedValue, unit: formattedUnit } =
                      formatter(context.parsed.y, unit)
                    return `${context.dataset.label}: ${formattedValue} ${formattedUnit}${unitSuffix}`
                  },
                },
              },
            },
            elements: {
              point: {
                radius: 0,
              },
            },
          }}
        />
      </div>
      <StorageChartFooter
        unit={unit}
        unitSuffix={unitSuffix}
        read={lastRead}
        write={lastWrite}
        formatter={formatter}
      />
    </div>
  )
}
