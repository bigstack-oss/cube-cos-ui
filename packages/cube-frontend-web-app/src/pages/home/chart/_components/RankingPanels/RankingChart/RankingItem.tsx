import { MetricRankRankInner } from '@cube-frontend/api'
import { toAbbreviation } from '@cube-frontend/web-app/utils/number'
import { toUnitAbbreviation } from '@cube-frontend/web-app/utils/unit'
import { twMerge } from 'tailwind-merge'
import { RankingItemLine } from './RankingItemLine'

export type RankingItemProps = {
  rankingItem: MetricRankRankInner
  unit: string
  isBlur: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export const RankingItem = (props: RankingItemProps) => {
  const { rankingItem, unit, isBlur, onMouseEnter, onMouseLeave } = props

  const getName = () => {
    const { name, device } = rankingItem
    if (device) {
      return (
        <span>
          <span className="break-all">{name}</span>
          <span className="ml-1 text-functional-text-light">{`(${device})`}</span>
        </span>
      )
    }
    return name
  }

  const abbreviationUnit = toUnitAbbreviation(unit)

  return (
    <div
      className={twMerge(
        'flex items-center gap-x-2 transition-opacity delay-100 duration-500',
        isBlur && 'opacity-30',
      )}
    >
      <span className="primary-body3 w-[140px] text-functional-text">
        {getName()}
      </span>
      <div className="flex h-[36px] min-w-0 flex-1 items-center gap-x-1.5">
        <span className="primary-body5 w-[48px]">
          {toAbbreviation(rankingItem.value)} {abbreviationUnit}
        </span>
        <div className="h-[36px] min-w-0 flex-1">
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
