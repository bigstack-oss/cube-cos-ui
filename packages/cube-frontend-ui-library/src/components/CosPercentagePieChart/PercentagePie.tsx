import { clamp } from 'lodash'
import { StrokeColorClass } from '@cube-frontend/ui-theme'

type PercentagePieProps = {
  percentage: number
  color: StrokeColorClass
}

const WIDTH = 144
const STROKE_WIDTH = 8

const halfWidth = WIDTH / 2
const radius = (WIDTH - STROKE_WIDTH) / 2
const circumference = 2 * Math.PI * radius

const getSvgPercentage = (percentage: number) => {
  let svgPercentage = clamp(percentage, 0, 100)

  /**
   * Workaround:
   *
   * Since we are using strokeLinecap="round", the circle gets additional length.
   * This causes the circle to appear identical to a full circle when the percentage is 99.
   *
   * To avoid this, we set the percentage to 98 when it is between 98 and 100.
   */
  if (svgPercentage > 98 && svgPercentage < 100) {
    svgPercentage = 98
  }

  return svgPercentage
}

export const PercentagePie = (props: PercentagePieProps) => {
  const { percentage, color } = props

  const svgPercentage = getSvgPercentage(percentage)
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
