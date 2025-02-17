import { SvgComponent } from '../CosIcon/CosIcon'
import { CosButton } from '../CosButton/CosButton'

export type QuickAccessBarProps = {
  quickAccesses: {
    Icon: SvgComponent
    href: string
  }[]
}

export const QuickAccessBar = (props: QuickAccessBarProps) => {
  const { quickAccesses } = props

  return (
    <div className="flex flex-row items-center">
      {quickAccesses.map((quickAccess, index) => (
        <a key={index} href={quickAccess.href} target="_blank">
          <CosButton
            size="md"
            type="ghost"
            usage="icon-only"
            Icon={quickAccess.Icon}
          />
        </a>
      ))}
    </div>
  )
}
