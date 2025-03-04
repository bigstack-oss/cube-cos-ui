import { twMerge } from 'tailwind-merge'
import { PropsWithClassName } from '@cube-frontend/utils'
import { CosContentSwitcherItem } from './CosContentSwitcherItem'
import { CosContentSwitcherSkeleton } from './CosContentSwitcherSkeleton'
import {
  ContentSwitcherSize,
  ContentSwitcherVariant,
  CosContentSwitcherContext,
} from './utils'

export type CosContentSwitcherProps = PropsWithClassName & {
  /**
   * @default 'default'
   */
  variant: ContentSwitcherVariant
  children: React.ReactNode
} & (
    | {
        variant: 'default'
        /**
         * @default 'md'
         */
        size?: ContentSwitcherSize
      }
    | {
        variant: 'radius'
      }
  )

export const CosContentSwitcher = (props: CosContentSwitcherProps) => {
  const { className: classNameProp, children, variant = 'default' } = props

  const size =
    variant === 'default'
      ? ((props as Extract<CosContentSwitcherProps, { variant: 'default' }>)
          .size ?? 'md')
      : undefined

  const className = twMerge('flex w-fit', classNameProp)

  return (
    <CosContentSwitcherContext.Provider value={{ variant, size }}>
      <div className={className}>{children}</div>
    </CosContentSwitcherContext.Provider>
  )
}

CosContentSwitcher.Item = CosContentSwitcherItem
CosContentSwitcher.Skeleton = CosContentSwitcherSkeleton
