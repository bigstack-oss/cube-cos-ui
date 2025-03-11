import { GetModuleHealthHistoryResponseDataHistoryInner } from '@cube-frontend/api'
import {
  CosSegmentedBar,
  CosSegmentedBarProps,
} from '@cube-frontend/ui-library'
import { PropsWithClassName } from '@cube-frontend/utils'
import { useMemo } from 'react'
import { computeHealthSegments, HealthSegment } from './computeHealthSegments'
import { TimePoint } from './createTimePoints'

export type HealthSegmentedBarProps = PropsWithClassName & {
  history: GetModuleHealthHistoryResponseDataHistoryInner[]
  timePoints: TimePoint[]
} & Pick<CosSegmentedBarProps, 'width' | 'childrenDimensions' | 'children'>

export const HealthSegmentedBar = (props: HealthSegmentedBarProps) => {
  const {
    className,
    history,
    timePoints,
    width,
    childrenDimensions,
    children,
  } = props

  const segments = useMemo<HealthSegment[]>(
    () => computeHealthSegments(history, timePoints),
    [history, timePoints],
  )

  const commonSegmentedBarProps = {
    className,
    width,
    segments,
  }

  if (childrenDimensions && children) {
    return (
      <CosSegmentedBar
        {...commonSegmentedBarProps}
        childrenDimensions={childrenDimensions}
      >
        {children}
      </CosSegmentedBar>
    )
  }

  return <CosSegmentedBar {...commonSegmentedBarProps} />
}
