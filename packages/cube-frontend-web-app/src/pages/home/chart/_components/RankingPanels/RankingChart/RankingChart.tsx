import { MetricRank, MetricRankRankInner } from '@cube-frontend/api'
import { RankingItem } from './RankingItem'
import { range } from 'lodash'
import { RankingItemSkeleton } from './RankingItemSkeleton'
import { useState } from 'react'

export type RankingChartProps = {
  ranking: MetricRank
  isLoading: boolean
}

export const RankingChart = (props: RankingChartProps) => {
  const { ranking, isLoading } = props

  const [hoverItem, setHoverItem] = useState<string>()

  const handleMouseEnter = (item: MetricRankRankInner) => () => {
    setHoverItem(item.name)
  }

  const handleMouseLeave = () => {
    setHoverItem(undefined)
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-3">
        {isLoading
          ? range(5).map((i) => <RankingItemSkeleton key={i} />)
          : ranking.rank.map((rankingItem) => (
              <RankingItem
                key={rankingItem.name}
                rankingItem={rankingItem}
                unit={ranking.unit}
                isBlur={!!hoverItem && hoverItem !== rankingItem.name}
                onMouseEnter={handleMouseEnter(rankingItem)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
      </div>
    </div>
  )
}
