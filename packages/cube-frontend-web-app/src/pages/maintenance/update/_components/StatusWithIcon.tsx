import { SvgComponent } from '@cube-frontend/ui-library'
import { TextColorClass } from '@cube-frontend/ui-theme'
import { twMerge } from 'tailwind-merge'

export type StatusWithIconProps = {
  Icon: SvgComponent
  text: string
  color: TextColorClass
}

export const StatusWithIcon = (props: StatusWithIconProps) => {
  const { Icon, text, color } = props

  return (
    <div className={twMerge('flex items-center gap-x-2', color)}>
      <Icon className="icon-md-sm" />
      <span className="secondary-body3 font-semibold">{text}</span>
    </div>
  )
}
