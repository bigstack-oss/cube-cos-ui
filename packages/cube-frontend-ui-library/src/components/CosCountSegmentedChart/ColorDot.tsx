import { FillColorClass } from '@cube-frontend/ui-theme'

const SIZE = 6

const radius = SIZE / 2

type ColorDotProps = {
  color: FillColorClass
}
export const ColorDot = (props: ColorDotProps) => {
  const { color } = props

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE}>
      <circle className={color} cx={radius} cy={radius} r={radius} />
    </svg>
  )
}
