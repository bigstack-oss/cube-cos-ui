import { ReactNode } from 'react'
import { CosTab } from './CosTab'
import { CosTabSkeleton } from './CosTabSkeleton'

export type CosTabsProps = {
  children: ReactNode
}

export const CosTabs = (props: CosTabsProps) => {
  const { children } = props

  return (
    <div className="flex items-end border-b border-b-functional-border-divider">
      {children}
    </div>
  )
}

CosTabs.Tab = CosTab
CosTabs.Skeleton = CosTabSkeleton
