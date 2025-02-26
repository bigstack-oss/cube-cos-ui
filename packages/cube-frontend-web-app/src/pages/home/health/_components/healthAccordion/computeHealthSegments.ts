import { CosTooltipInformation, Segment } from '@cube-frontend/ui-library'
import { FillColorClass } from '@cube-frontend/ui-theme'
import dayjs, { Dayjs } from 'dayjs'
import { HealthStatus } from '../../homeHealthUtils'
import { TimePoint } from './createTimePointFns'
import { ModuleHealthHistory } from './mockHealth'

type HistoryEntry = ModuleHealthHistory[number]

type SegmentWithHealthInfo = Segment & HealthInfo

type HealthInfo = {
  status: HealthStatus
  startDateTime: Dayjs
  endDateTime: Dayjs
}

const healthStatusColors: Record<HealthStatus, FillColorClass> = {
  ok: 'fill-cosmos-secondary',
  ng: 'fill-status-negative',
  blank: 'fill-grey-300',
}

/**
 * Identify overlapping time periods in health history records and convert them
 * into segments.
 *
 * Both `history` and `timePoints` must be sorted by timestamp in
 * ascending order to get the correct result.
 */
export const computeHealthSegments = (
  history: HistoryEntry[],
  timePoints: TimePoint[],
): SegmentWithHealthInfo[] => {
  if (timePoints.length <= 1) {
    throw new Error('There should be more than 1 time points')
  }

  const segments: SegmentWithHealthInfo[] = []

  const [startTimePoint, endTimePoint] = [
    timePoints[0],
    timePoints[timePoints.length - 1],
  ]

  for (let i = 0; i < history.length - 1; i++) {
    const segment = parseSegment(
      history[i],
      history[i + 1],
      startTimePoint,
      endTimePoint,
    )
    if (segment) {
      segments.push(segment)
    }
  }

  fillLeadingSegment(segments, startTimePoint, endTimePoint)
  fillTrailingSegment(segments, startTimePoint, endTimePoint)

  const mergedSegments = mergeSegments(segments)
  mergedSegments.forEach((segment) => {
    segment.hoverContent = createHoverContent(segment)
  })

  return mergedSegments
}

const parseSegment = (
  startHistoryEntry: HistoryEntry,
  endHistoryEntry: HistoryEntry,
  startTimePoint: TimePoint,
  endTimePoint: TimePoint,
): SegmentWithHealthInfo | undefined => {
  const startHistoryTime = dayjs(startHistoryEntry.time)
  const endHistoryTime = dayjs(endHistoryEntry.time)

  const isOverlapping = checkIsOverlapping(
    [startHistoryTime, endHistoryTime],
    [startTimePoint.dateTime, endTimePoint.dateTime],
  )

  if (!isOverlapping) {
    return undefined
  }

  const [overlappingStart, overlappingEnd] = [
    dayjs.max(startHistoryTime, startTimePoint.dateTime),
    dayjs.min(endHistoryTime, endTimePoint.dateTime),
  ]

  const overlappingMilliseconds = overlappingEnd.diff(overlappingStart)
  const totalMilliseconds = endTimePoint.timestamp - startTimePoint.timestamp

  return createSegment({
    colCount: overlappingMilliseconds / totalMilliseconds,
    status: startHistoryEntry.status as HealthStatus,
    startDateTime: overlappingStart,
    endDateTime: overlappingEnd,
  })
}

const checkIsOverlapping = (
  rangeA: [Dayjs, Dayjs],
  rangeB: [Dayjs, Dayjs],
): boolean => {
  const [startA, endA] = rangeA
  return startA.isBetween(...rangeB) || endA.isBetween(...rangeB)
}

/**
 * Fill the gap before the first segment with a blank segment if necessary.
 */
const fillLeadingSegment = (
  segments: SegmentWithHealthInfo[],
  startTimePoint: TimePoint,
  endTimePoint: TimePoint,
): void => {
  const firstSegment: SegmentWithHealthInfo | undefined = segments[0]

  if (!firstSegment) {
    // No segments exist, fill the entire bar with a blank segment.
    segments.push(
      createSegment({
        colCount: 1,
        status: 'blank',
        startDateTime: startTimePoint.dateTime,
        endDateTime: endTimePoint.dateTime,
      }),
    )
    return
  }

  const startMilliseconds = firstSegment.startDateTime.valueOf()

  if (startMilliseconds === startTimePoint.timestamp) {
    // The first segment already started at the expected time.
    return
  }

  // There's a gap before the first segment.
  const gapMilliseconds = startMilliseconds - startTimePoint.timestamp
  const totalMilliseconds = endTimePoint.timestamp - startTimePoint.timestamp

  segments.unshift(
    createSegment({
      colCount: gapMilliseconds / totalMilliseconds,
      status: 'blank',
      startDateTime: startTimePoint.dateTime,
      endDateTime: firstSegment.startDateTime,
    }),
  )
}

/**
 * Fill the gap after the last segment with a blank segment if necessary.
 */
const fillTrailingSegment = (
  segments: SegmentWithHealthInfo[],
  startTimePoint: TimePoint,
  endTimePoint: TimePoint,
): void => {
  if (!segments.length) {
    throw new Error('segments count must be greater than 0')
  }

  const lastSegment = segments[segments.length - 1]
  const endMilliseconds = lastSegment.startDateTime.valueOf()

  if (endMilliseconds === endTimePoint.timestamp) {
    // The last segment already ended at the expected time.
    return
  }

  // There's a gap after the last segment.
  const gapMilliseconds = endTimePoint.timestamp - endMilliseconds
  const totalMilliseconds = endTimePoint.timestamp - startTimePoint.timestamp

  segments.push(
    createSegment({
      colCount: gapMilliseconds / totalMilliseconds,
      status: lastSegment.status,
      startDateTime: lastSegment.endDateTime,
      endDateTime: endTimePoint.dateTime,
    }),
  )
}

type CreateSegmentOptions = Omit<SegmentWithHealthInfo, 'color'>

const createSegment = (
  options: CreateSegmentOptions,
): SegmentWithHealthInfo => {
  const { colCount, hoverContent, status, startDateTime, endDateTime } = options
  return {
    color: healthStatusColors[status],
    colCount,
    hoverContent,
    status,
    startDateTime,
    endDateTime,
  }
}

const createHoverContent = (
  segment: SegmentWithHealthInfo,
): CosTooltipInformation | undefined => {
  const { status, startDateTime, endDateTime } = segment
  if (status === 'blank') {
    return undefined
  }

  const formatDateTime = (dateTime: Dayjs): string => {
    return dateTime.format('MMM DD, HH:mm')
  }

  const durationText = `${formatDateTime(startDateTime)} - ${formatDateTime(endDateTime)}`
  return {
    title: status.toUpperCase(),
    message: durationText,
  }
}

/**
 * Reduces segments by merging adjacent segments with the same status.
 */
const mergeSegments = (
  segments: SegmentWithHealthInfo[],
): SegmentWithHealthInfo[] => {
  const mergedSegments: SegmentWithHealthInfo[] = [{ ...segments[0] }]

  for (let i = 1; i < segments.length; i++) {
    const lastMergedSegment = mergedSegments[mergedSegments.length - 1]
    const currentSegment = segments[i]

    if (lastMergedSegment.status !== currentSegment.status) {
      mergedSegments.push({ ...currentSegment })
    } else {
      lastMergedSegment.endDateTime = currentSegment.endDateTime
      lastMergedSegment.colCount += currentSegment.colCount
    }
  }

  return mergedSegments
}
