import { MetricRank, MetricRankRankInner } from '@cube-frontend/api'
import { RankingItem } from './RankingItem'
import { range } from 'lodash'
import { RankingItemSkeleton } from './RankingItemSkeleton'
import { useState } from 'react'

export type RankingChartProps = {
  ranking: MetricRank
  isLoading: boolean
}

/**
 * The `id` is not unique for each item in the ranking list.
 * So we need to combine the `id` and `device` to create a unique key.
 */
const getUniqueKey = (item: MetricRankRankInner) => `${item.id}-${item.device}`

export const RankingChart = (props: RankingChartProps) => {
  const { ranking, isLoading } = props

  const [hoverItemUniqueKey, setHoverUniqueKey] = useState<string>()

  const handleMouseEnter = (uniqueKey: string) => () => {
    setHoverUniqueKey(uniqueKey)
  }

  const handleMouseLeave = () => {
    setHoverUniqueKey(undefined)
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-3">
        {isLoading
          ? range(5).map((i) => <RankingItemSkeleton key={i} />)
          : ranking.rank
              .map((rankingItem) => ({
                ...rankingItem,
                uniqueKey: getUniqueKey(rankingItem),
              }))
              .map((rankingItem) => (
                <RankingItem
                  key={rankingItem.uniqueKey}
                  rankingItem={rankingItem}
                  unit={ranking.unit}
                  isBlur={
                    !!hoverItemUniqueKey &&
                    hoverItemUniqueKey !== rankingItem.uniqueKey
                  }
                  onMouseEnter={handleMouseEnter(rankingItem.uniqueKey)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
      </div>
    </div>
  )
}
