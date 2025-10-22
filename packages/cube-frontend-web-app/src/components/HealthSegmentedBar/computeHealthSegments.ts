import {
  GetModuleHealthHistoryResponseDataHistoryInner,
  GetServiceHealthHistoryResponseDataInnerHistoryInner,
  GetServiceHealthHistoryResponseDataInnerHistoryInnerStatusEnum,
} from '@cube-frontend/api'
import { CosTooltipInformation, Segment } from '@cube-frontend/ui-library'
import { FillColorClass } from '@cube-frontend/ui-theme'
import dayjs, { Dayjs } from 'dayjs'
import { DateTimeRange } from './BrushFilter'
import { TFunction } from 'i18next'

type HistoryEntry =
  | GetModuleHealthHistoryResponseDataHistoryInner
  | GetServiceHealthHistoryResponseDataInnerHistoryInner

export type HealthSegment = Segment & HealthInfo

export type HealthStatus =
  | GetServiceHealthHistoryResponseDataInnerHistoryInnerStatusEnum
  | 'blank'

type HealthInfo = {
  status: HealthStatus
  startDateTime: Dayjs
  endDateTime: Dayjs
}

export const healthStatusColors: Record<HealthStatus, FillColorClass> = {
  ok: 'fill-cosmos-secondary',
  ng: 'fill-status-negative',
  fixing: 'fill-status-warning',
  blank: 'fill-grey-300',
}

const checkHistoryEntriesSorting = (history: HistoryEntry[]): void => {
  if (history.length <= 1) return

  for (let i = 0; i < history.length - 1; i++) {
    const [formerTimestamp, laterTimestamp] = [
      history[i].time,
      history[i + 1].time,
    ]
    const [formerTime, laterTime] = [
      dayjs.respectTzOffset(formerTimestamp),
      dayjs.respectTzOffset(laterTimestamp),
    ]
    if (formerTime.isAfter(laterTime)) {
      console.warn(
        'The history entries of a HealthSegmentedBar must be sorted by time in ascending order, ' +
          `but ${formerTimestamp} is placed before ${laterTimestamp}`,
      )
      return
    }
  }
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
  dateTimeRange: DateTimeRange,
  t: TFunction,
): HealthSegment[] => {
  checkHistoryEntriesSorting(history)

  const [startDateTime, endDateTime] = dateTimeRange

  const segments = parseInitialSegments(history, startDateTime, endDateTime)

  fillLeadingSegment(segments, startDateTime, endDateTime)
  fillTrailingSegment(
    segments,
    history[history.length - 1],
    startDateTime,
    endDateTime,
  )

  const mergedSegments = mergeSegments(segments)
  mergedSegments.forEach((segment) => {
    segment.hoverContent = createHoverContent(segment, t)
  })

  return mergedSegments
}

const parseInitialSegments = (
  history: HistoryEntry[],
  startDateTime: Dayjs,
  endDateTime: Dayjs,
): HealthSegment[] => {
  if (history.length === 1) {
    // There's only 1 entry in the history.
    // Returns an array with a single 1-second segment.
    // The duration is not important because `fillTrailingSegment` will use
    // this segment's status to fill the rest of the bar.
    const entry = history[0]
    const totalMilliseconds = startDateTime.valueOf() - endDateTime.valueOf()
    return [
      {
        color: healthStatusColors[entry.status],
        colCount: 1000 / totalMilliseconds,
        status: entry.status,
        startDateTime: dayjs.respectTzOffset(entry.time),
        endDateTime: dayjs.respectTzOffset(entry.time).add(1, 'seconds'),
      },
    ]
  }

  const segments: HealthSegment[] = []

  for (let i = 0; i < history.length - 1; i++) {
    const segment = parseSegment(
      history[i],
      history[i + 1],
      startDateTime,
      endDateTime,
    )
    if (segment) {
      segments.push(segment)
    }
  }

  return segments
}

const parseSegment = (
  startHistoryEntry: HistoryEntry,
  endHistoryEntry: HistoryEntry,
  startDateTime: Dayjs,
  endDateTime: Dayjs,
): HealthSegment | undefined => {
  const startHistoryTime = dayjs.respectTzOffset(startHistoryEntry.time)
  const endHistoryTime = dayjs.respectTzOffset(endHistoryEntry.time)

  const isOverlapping = checkIsOverlapping(
    [startHistoryTime, endHistoryTime],
    [startDateTime, endDateTime],
  )

  if (!isOverlapping) {
    return undefined
  }

  const [overlappingStart, overlappingEnd] = [
    dayjs.max(startHistoryTime, startDateTime),
    dayjs.min(endHistoryTime, endDateTime),
  ]

  const overlappingMilliseconds = overlappingEnd.diff(overlappingStart)
  const totalMilliseconds = endDateTime.valueOf() - startDateTime.valueOf()

  return createSegment({
    colCount: overlappingMilliseconds / totalMilliseconds,
    status: startHistoryEntry.status,
    startDateTime: overlappingStart,
    endDateTime: overlappingEnd,
  })
}

const checkIsOverlapping = (
  rangeA: [Dayjs, Dayjs],
  rangeB: [Dayjs, Dayjs],
): boolean => {
  const [startA, endA] = rangeA
  if (startA.isBetween(...rangeB) || endA.isBetween(...rangeB)) {
    return true
  }

  // Range A completely covers Range B.
  // TODO: Draw Chart
  if (startA.isBefore(rangeB[0]) && endA.isAfter(rangeB[1])) {
    return true
  }

  return false
}

/**
 * Fill the gap before the first segment with a blank segment if necessary.
 */
const fillLeadingSegment = (
  segments: HealthSegment[],
  startDateTime: Dayjs,
  endDateTime: Dayjs,
): void => {
  const firstSegment: HealthSegment | undefined = segments[0]

  if (!firstSegment) {
    // No segments exist, fill the entire bar with a blank segment.
    segments.push(
      createSegment({
        colCount: 1,
        status: 'blank',
        startDateTime,
        endDateTime,
      }),
    )
    return
  }

  const startMilliseconds = firstSegment.startDateTime.valueOf()

  // There's a gap before the first segment.
  const gapMilliseconds = startMilliseconds - startDateTime.valueOf()
  const totalMilliseconds = endDateTime.valueOf() - startDateTime.valueOf()

  if (gapMilliseconds <= 0) {
    return
  }

  segments.unshift(
    createSegment({
      colCount: gapMilliseconds / totalMilliseconds,
      status: 'blank',
      startDateTime,
      endDateTime: firstSegment.startDateTime,
    }),
  )
}

/**
 * Fill the gap after the last segment with the status of the last history entry if necessary.
 */
const fillTrailingSegment = (
  segments: HealthSegment[],
  lastHistoryEntry: HistoryEntry | undefined,
  startDateTime: Dayjs,
  endDateTime: Dayjs,
): void => {
  if (!segments.length) {
    throw new Error('segments count must be greater than 0')
  } else if (!lastHistoryEntry) {
    // The history is empty.
    return
  }

  const lastSegment = segments[segments.length - 1]
  const endMilliseconds = lastSegment.endDateTime.valueOf()

  // There's a gap after the last segment.
  const gapMilliseconds = endDateTime.valueOf() - endMilliseconds
  const totalMilliseconds = endDateTime.valueOf() - startDateTime.valueOf()

  if (gapMilliseconds <= 0) {
    return
  }

  segments.push(
    createSegment({
      colCount: gapMilliseconds / totalMilliseconds,
      status: lastHistoryEntry.status,
      startDateTime: lastSegment.endDateTime,
      endDateTime,
    }),
  )
}

type CreateSegmentOptions = Omit<HealthSegment, 'color'>

const createSegment = (options: CreateSegmentOptions): HealthSegment => {
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
  segment: HealthSegment,
  t: TFunction,
): CosTooltipInformation => {
  const { status, startDateTime, endDateTime } = segment

  if (status === 'blank') {
    return {
      message: t('home.health.status.noData'),
    }
  }

  const formatDateTime = (dateTime: Dayjs): string => {
    return dateTime.format('MMM DD, HH:mm')
  }
  const statusText = (t(`home.health.status.${status}`) as string).toUpperCase()

  const durationText = `${formatDateTime(startDateTime)} - ${formatDateTime(endDateTime)}`
  return {
    title: statusText,
    message: durationText,
  }
}

/**
 * Reduces segments by merging adjacent segments with the same status.
 */
const mergeSegments = (segments: HealthSegment[]): HealthSegment[] => {
  const mergedSegments: HealthSegment[] = [{ ...segments[0] }]

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
