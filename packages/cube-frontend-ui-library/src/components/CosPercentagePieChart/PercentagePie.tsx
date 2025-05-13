import { clamp } from 'lodash'
import { StrokeColorClass } from '@cube-frontend/ui-theme'

type PercentagePieProps = {
  color: StrokeColorClass
  percentage: number
  thresholdPercentage: number
}

const WIDTH = 144
const STROKE_WIDTH = 8

const halfWidth = WIDTH / 2
const radius = (WIDTH - STROKE_WIDTH) / 2
const circumference = 2 * Math.PI * radius

const getSvgPercentage = (percentage: number, thresholdPercentage: number) => {
  const svgPercentageRatio = thresholdPercentage / 100
  let svgPercentage = clamp(percentage / svgPercentageRatio, 0, 100)

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

const getOverThresholdSvgPercentage = (
  percentage: number,
  thresholdPercentage: number,
) => getSvgPercentage(percentage - thresholdPercentage, thresholdPercentage)

export const PercentagePie = (props: PercentagePieProps) => {
  const { color, percentage, thresholdPercentage } = props

  const mainSvgPercentage = getSvgPercentage(percentage, thresholdPercentage)
  const mainSvgOffset =
    circumference - (mainSvgPercentage / 100) * circumference

  const overThresholdSvgPercentage = getOverThresholdSvgPercentage(
    percentage,
    thresholdPercentage,
  )
  const overThresholdSvgOffset =
    circumference - (overThresholdSvgPercentage / 100) * circumference

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
        strokeDashoffset={mainSvgOffset}
        strokeLinecap="round"
      />
      {overThresholdSvgPercentage > 0 && (
        <circle
          className={'fill-transparent stroke-status-over-limit'}
          cx={halfWidth}
          cy={halfWidth}
          r={radius}
          fill="transparent"
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={circumference}
          strokeDashoffset={overThresholdSvgOffset}
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}
