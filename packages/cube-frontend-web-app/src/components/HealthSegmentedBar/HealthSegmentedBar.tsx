import {
  GetModuleHealthHistoryResponseDataHistoryInner,
  GetServiceHealthHistoryResponseDataInnerHistoryInner,
} from '@cube-frontend/api'
import {
  CosSegmentedBar,
  CosSegmentedBarProps,
} from '@cube-frontend/ui-library'
import { PropsWithClassName } from '@cube-frontend/utils'
import { ReactNode, useMemo } from 'react'
import { computeHealthSegments, HealthSegment } from './computeHealthSegments'
import { DateTimeRange } from './BrushFilter'
import { useTranslation } from 'react-i18next'

export type HealthSegmentedBarProps<
  T extends
    | GetModuleHealthHistoryResponseDataHistoryInner
    | GetServiceHealthHistoryResponseDataInnerHistoryInner,
> = PropsWithClassName & {
  history: T[]
  dateTimeRange: DateTimeRange
  overlay?: (
    barWidth: number,
    svgHeight: number,
    segments: HealthSegment[],
  ) => ReactNode
} & Pick<
    CosSegmentedBarProps,
    'width' | 'paddingX' | 'barMarginTop' | 'childrenDimensions' | 'children'
  >

export const HealthSegmentedBar = <
  T extends
    | GetModuleHealthHistoryResponseDataHistoryInner
    | GetServiceHealthHistoryResponseDataInnerHistoryInner,
>(
  props: HealthSegmentedBarProps<T>,
) => {
  const {
    className,
    history,
    dateTimeRange,
    width,
    paddingX,
    barMarginTop,
    childrenDimensions,
    children,
    overlay,
  } = props

  const { t } = useTranslation()

  const segments = useMemo<HealthSegment[]>(
    () => computeHealthSegments(history, dateTimeRange, t),
    [history, dateTimeRange, t],
  )

  const commonSegmentedBarProps: CosSegmentedBarProps = {
    className,
    width,
    segments,
    barMarginTop,
    paddingX,
    overlay:
      overlay &&
      ((barWidth, svgHeight) => overlay(barWidth, svgHeight, segments)),
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
