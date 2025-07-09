import { cubeTheme } from '@cube-frontend/ui-theme'

export type BrushFilterHandlerProps = {
  x: number
  height: number
}

/**
 * We can't customize the d3-brush handler to meet our design requirements.
 * so we add a custom handler and manually adjust x-offset.
 */
export const BrushFilterHandler = (props: BrushFilterHandlerProps) => {
  const { x, height } = props

  return (
    <g>
      <line
        x1={x}
        x2={x}
        y1={0}
        y2={height}
        strokeWidth={2}
        stroke={cubeTheme.colors.dark[500]}
      />
      <line
        x1={x}
        x2={x}
        y1={height / 2 - 10}
        y2={height / 2 + 10}
        strokeWidth={6}
        stroke={cubeTheme.colors.dark[500]}
      />
    </g>
  )
}
