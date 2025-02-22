import { clamp } from 'lodash'
import { StrokeColorClass } from '@cube-frontend/ui-theme'

type PercentagePieProps = {
  percentage: number
  color: StrokeColorClass
}

const WIDTH = 144
const STROKE_WIDTH = 8

export const PercentagePie = (props: PercentagePieProps) => {
  const { percentage, color } = props

  const svgPercentage = clamp(percentage, 0, 100)

  const halfWidth = WIDTH / 2
  const radius = (WIDTH - STROKE_WIDTH) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (svgPercentage / 100) * circumference

  return (
    <svg width={WIDTH} height={WIDTH} className="-rotate-90">
      <circle
        className="fill-transparent stroke-functional-border-divider"
        cx={halfWidth}
        cy={halfWidth}
        r={radius}
        strokeWidth={STROKE_WIDTH}
      />
      <circle
        className={`fill-transparent ${color}`}
        cx={halfWidth}
        cy={halfWidth}
        r={radius}
        fill="transparent"
        strokeWidth={STROKE_WIDTH}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  )
}
