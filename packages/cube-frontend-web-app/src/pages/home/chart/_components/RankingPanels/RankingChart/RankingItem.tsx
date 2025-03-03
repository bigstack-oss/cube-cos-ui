import { MetricRankRankInner } from '@cube-frontend/api'
import { toUnitAbbreviation } from '@cube-frontend/web-app/utils/unit'
import { toAbbreviation } from '@cube-frontend/web-app/utils/number'
import { RankingItemLine } from './RankingItemLine'
import { twMerge } from 'tailwind-merge'

export type RankingItemProps = {
  rankingItem: MetricRankRankInner
  unit: string
  isBlur: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export const RankingItem = (props: RankingItemProps) => {
  const { rankingItem, unit, isBlur, onMouseEnter, onMouseLeave } = props

  const abbreviationUnit = toUnitAbbreviation(unit)

  return (
    <div
      className={twMerge(
        'flex items-center gap-x-2 transition-opacity delay-100 duration-500',
        isBlur && 'opacity-30',
      )}
    >
      <span className="primary-body3 w-[140px] text-functional-text">
        {rankingItem.name}
      </span>
      <div className="flex h-[36px] flex-1 items-center gap-x-1.5">
        <span className="primary-body5 w-[48px]">
          {toAbbreviation(rankingItem.value)} {abbreviationUnit}
        </span>
        <div className="h-[36px] flex-1">
          <RankingItemLine
            rankItem={rankingItem}
            unit={unit}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </div>
      </div>
    </div>
  )
}
