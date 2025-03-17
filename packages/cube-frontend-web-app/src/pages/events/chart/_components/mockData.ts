import { GetRankedEventsResponseDataEventsInner } from '@cube-frontend/api'

export const mockRankedEvents =
  (): GetRankedEventsResponseDataEventsInner[] => {
    /**
     * Define the top 5 major events with fixed percentages and counts
     */
    const mainEvents = [
      { id: 'NET00003I', percent: 25.3, number: 440 },
      { id: 'NET00001I', percent: 18.7, number: 320 },
      { id: 'NET00002I', percent: 15.2, number: 260 },
      { id: 'NET00004I', percent: 10.1, number: 180 },
      { id: 'NET00005I', percent: 8.5, number: 150 },
    ].map((event) => ({
      ...event,
      query: `https://example-datat-center.host/api/v1/datacenters/example-data-center/events?type=system&id=${event.id}&start=2024-12-01T00:00:00Z&stop=2025-02-17T00:00:00Z&pageNum=1&pageSize=20`,
    }))

    /**
     * Calculate remaining percentage to ensure the total does not exceed 100%
     */
    let remainingPercent =
      100 - mainEvents.reduce((sum, e) => sum + e.percent, 0)

    /**
     * Generate 35 additional random events while keeping total percent close to 100%
     */
    const additionalEvents = Array.from({ length: 35 }, (_, i) => {
      /**
       * Generate a random percentage within 0.5% - 2.5%
       * while ensuring it doesn't exceed the remaining percentage
       */
      const percent = Math.min(
        remainingPercent,
        Number((Math.random() * 2.5 + 0.5).toFixed(2)),
      )

      /**
       * Reduce the remaining percentage to maintain balance
       */
      remainingPercent -= percent

      return {
        id: `NET000${String(i + 6).padStart(2, '0')}I`,
        percent,
        number: Math.floor(Math.random() * 50) + 5,
        query: `https://example-datat-center.host/api/v1/datacenters/example-data-center/events?type=system&id=NET000${String(i + 6).padStart(2, '0')}I&start=2024-12-01T00:00:00Z&stop=2025-02-17T00:00:00Z&pageNum=1&pageSize=20`,
      }
    })

    return [...mainEvents, ...additionalEvents]
  }
