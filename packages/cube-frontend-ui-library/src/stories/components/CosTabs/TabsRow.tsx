import { CosTabs } from '@cube-frontend/ui-library'
import { ReactNode } from 'react'

export type TabsRowProps = {
  children: ReactNode
  title: string
}

export const TabsRow = (props: TabsRowProps) => {
  const { children, title } = props

  return (
    <div className="flex items-end gap-x-4">
      <h3 className="secondary-h3 w-64 text-functional-title">{title}</h3>
      <CosTabs>{children}</CosTabs>
    </div>
  )
}
