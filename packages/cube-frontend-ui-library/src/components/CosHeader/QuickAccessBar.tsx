import { range } from 'lodash'
import { SvgComponent } from '../CosIcon/CosIcon'
import { CosButton } from '../CosButton/CosButton'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'

export type QuickAccessBarProps = {
  /**
   * @default false
   */
  isLoading?: boolean
  quickAccesses: {
    Icon: SvgComponent
    href: string
  }[]
}

export const QuickAccessBar = (props: QuickAccessBarProps) => {
  const { isLoading = false, quickAccesses } = props

  const renderQuickAccesses = () => {
    if (isLoading) {
      return range(0, 4).map((_, index) => (
        <span className="p-2">
          <CosSkeleton key={index} className="size-[18px]" />
        </span>
      ))
    }
    return quickAccesses.map((quickAccess, index) => (
      <a key={index} href={quickAccess.href} target="_blank">
        <CosButton
          size="md"
          type="ghost"
          usage="icon-only"
          Icon={quickAccess.Icon}
        />
      </a>
    ))
  }

  return (
    <div className="flex flex-row items-center">{renderQuickAccesses()}</div>
  )
}
