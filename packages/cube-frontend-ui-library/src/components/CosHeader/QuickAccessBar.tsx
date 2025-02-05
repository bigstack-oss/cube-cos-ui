import { QuickAccessIconButton } from './QuickAccessIconButton'
import { SvgComponent } from '../CosIcon/CosIcon'

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
        <QuickAccessIconButton
          key={index}
          Icon={quickAccess.Icon}
          href={quickAccess.href}
        />
      ))}
    </div>
  )
}
