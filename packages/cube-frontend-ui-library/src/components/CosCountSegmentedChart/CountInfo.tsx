import { Optional } from '@cube-frontend/utils'
import { CosCountSegmentedChartCountInfo } from './utils'
import { ColorDot } from './ColorDot'

type CountInfoProps = Optional<CosCountSegmentedChartCountInfo, 'color'>

export const CountInfo = (props: CountInfoProps) => {
  const { name, color, count } = props

  return (
    <div className="flex flex-col gap-y-2">
      <div key={name} className="flex items-center justify-between gap-x-1">
        {color && <ColorDot color={color} />}
        <span className="primary-body5 text-functional-text-light">{name}</span>
      </div>
      <span className="primary-body2 self-end text-functional-text">
        {count}
      </span>
    </div>
  )
}
