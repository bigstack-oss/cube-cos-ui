import { FillColorClass } from '@cube-frontend/ui-theme'

const SIZE = 6

type ColorDotProps = {
  color: FillColorClass
}
export const ColorDot = (props: ColorDotProps) => {
  const { color } = props

  const radius = SIZE / 2

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE}>
      <circle className={color} cx={radius} cy={radius} r={radius} />
    </svg>
  )
}
