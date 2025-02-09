import { BorderColorClass } from '@cube-frontend/ui-theme'
import { PropsWithClassName } from '@cube-frontend/utils'
import { twJoin, twMerge } from 'tailwind-merge'

type CosStrokeType = 'regular' | 'dot'

export type CosStrokeProps = PropsWithClassName & {
  type?: CosStrokeType
  color?: BorderColorClass
}

const typeBaseClasses: Record<CosStrokeType, string> = {
  regular: twJoin('border-functional-border-divider'),
  dot: twJoin('border-t-4 border-dotted border-primary-50'),
}

export const CosStroke = (props: CosStrokeProps) => {
  const { className, type = 'regular', color } = props

  const baseClasses = typeBaseClasses[type]

  return <hr className={twMerge(baseClasses, color, className)} />
}
