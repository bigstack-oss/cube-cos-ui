import { ReactNode } from 'react'
import { CosTab } from './CosTab'
import { CosTabSkeleton } from './CosTabSkeleton'

export type CosTabsProps = {
  children: ReactNode
}

const CosTabsImplementation = (props: CosTabsProps) => {
  const { children } = props

  return (
    <div className="flex items-end border-b border-b-functional-border-divider">
      {children}
    </div>
  )
}

export const CosTabs: typeof CosTabsImplementation & {
  Tab: typeof CosTab
  Skeleton: typeof CosTabSkeleton
} = Object.assign(CosTabsImplementation, {
  Tab: CosTab,
  Skeleton: CosTabSkeleton,
})
