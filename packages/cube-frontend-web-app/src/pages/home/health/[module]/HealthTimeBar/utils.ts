import dayjs from 'dayjs'
import { GetModuleHealthHistoryResponseDataHistoryInner } from '@cube-frontend/api'
import { DateTimeRange } from '@cube-frontend/web-app/components/HealthSegmentedBar/BrushFilter'

/**
 *
 * Filter history points based on the brush time range,
 * and filled leading points to display chart correctly.
 *
 * points:        ok(filled)            ng               ok ng ok ....
 * timeRange:   .       start                        end
 * chart display:    .  | ---- ok ----- | --- ng --- |
 */
export const filterChartHistory = (
  history: GetModuleHealthHistoryResponseDataHistoryInner[] | undefined,
  brushTimeRange: DateTimeRange | null,
): GetModuleHealthHistoryResponseDataHistoryInner[] => {
  if (!history) return []
  if (!brushTimeRange) return history

  const [start, end] = brushTimeRange
  const result: GetModuleHealthHistoryResponseDataHistoryInner[] = []

  let leadingFilled = false
  for (let i = 0; i < history.length; i++) {
    const currentItem = history[i]
    const currentItemTime = dayjs.respectTzOffset(currentItem.time)

    if (currentItemTime.isAfter(start)) {
      if (!leadingFilled && i > 0) {
        const previousItem = history[i - 1]
        result.unshift(previousItem)
        leadingFilled = true
      }

      if (currentItemTime.isBefore(end) || currentItemTime.isSame(end)) {
        result.push(currentItem)
      }
    }
  }

  return result
}
