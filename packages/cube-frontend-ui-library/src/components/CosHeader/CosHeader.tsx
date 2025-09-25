import { CosStroke } from '@cube-frontend/ui-library'
import { QuickAccessBar, QuickAccessBarProps } from './QuickAccessBar'
import { FunctionBar, FunctionBarItem } from './FunctionBar'

export type CosHeaderProps = QuickAccessBarProps & {
  functionBarItems: FunctionBarItem[]
  /**
   * TODO: The Header component should accept language options and onClick event instead of a React node.
   */
  languageDropdown: React.ReactNode
}

export const CosHeader = (props: CosHeaderProps) => {
  const { isLoading, quickAccesses, functionBarItems, languageDropdown } = props

  return (
    <div className="relative flex h-[54px] flex-row items-center justify-end gap-x-2.5 px-5">
      <QuickAccessBar isLoading={isLoading} quickAccesses={quickAccesses} />
      <div className="h-6 w-px bg-functional-border-divider" />
      {languageDropdown}
      <FunctionBar items={functionBarItems} />
      <div className="absolute bottom-0 left-0 w-full px-5">
        <CosStroke />
      </div>
    </div>
  )
}
