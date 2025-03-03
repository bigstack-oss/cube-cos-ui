import { GetNetworkTrafficInRankOfHostsResponseDataInner } from '@cube-frontend/api'
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
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export type RankItemProps = {
  item: GetNetworkTrafficInRankOfHostsResponseDataInner
  unit: string
}

export const RankItem = (props: RankItemProps) => {
  const { item, unit } = props
  return (
    <div key={item.id} className="flex items-center gap-x-2">
      <span className="primary-body3 min-w-[80px] text-functional-text">
        {item.name}
      </span>
      <div className="flex h-[36px] flex-1 items-center gap-x-1.5">
        <span className="primary-body5">
          {item.history[item.history.length - 1].value.toFixed(2)} {unit}
        </span>
        <div className="h-[36px] flex-1">
          <Line
            height={36}
            data={{
              labels: item.history.map((item) =>
                dayjs(item.time).format('HH:mm'),
              ),
              datasets: [
                {
                  label: '123',
                  data: item.history.map((item) => item.value),
                  fill: false,
                  borderColor: 'rgba(83, 136, 216, 0.60)',
                  tension: 0.1,
                },
              ],
            }}
            options={{
              // tooltipCaretSize: 0,
              scales: {
                x: {
                  display: false,
                },
                y: {
                  display: false,
                },
              },
              plugins: {
                legend: {
                  display: false,
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
      </div>
    </div>
  )
}
