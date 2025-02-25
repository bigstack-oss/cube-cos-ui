import { twMerge } from 'tailwind-merge'
import { PropsWithClassName } from '@cube-frontend/utils'
import { CosContentSwitcherItem } from './CosContentSwitcherItem'
import { CosContentSwitcherSkeleton } from './CosContentSwitcherSkeleton'
import { ContentSwitcherSize, CosContentSwitcherContext } from './utils'

export type CosContentSwitcherProps = PropsWithClassName & {
  size?: ContentSwitcherSize
  children: React.ReactNode
}

export const CosContentSwitcher = (props: CosContentSwitcherProps) => {
  const { className: classNameProp, children, size = 'md' } = props

  const className = twMerge(
    'flex w-fit items-stretch justify-center',
    classNameProp,
  )

  return (
    <CosContentSwitcherContext.Provider value={size}>
      <div className={className}>{children}</div>
    </CosContentSwitcherContext.Provider>
  )
}

CosContentSwitcher.Item = CosContentSwitcherItem
CosContentSwitcher.Skeleton = CosContentSwitcherSkeleton
