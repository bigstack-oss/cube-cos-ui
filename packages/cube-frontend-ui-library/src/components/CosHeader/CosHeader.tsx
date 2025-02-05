import { CosStroke } from '@cube-frontend/ui-library'
import { QuickAccessBar, QuickAccessBarProps } from './QuickAccessBar'
import { FunctionBar, FunctionBarProps } from './FunctionBar'

export type CosHeaderProps = QuickAccessBarProps & FunctionBarProps

export const CosHeader = (props: CosHeaderProps) => {
  const { quickAccesses, onLogout } = props

  return (
    <div className="relative flex h-[54px] flex-row items-center justify-end gap-x-2.5 px-5">
      <QuickAccessBar quickAccesses={quickAccesses} />
      <div className="h-6 w-px bg-functional-border-divider" />
      <FunctionBar onLogout={onLogout} />
      <div className="absolute bottom-0 left-0 w-full px-5">
        <CosStroke />
      </div>
    </div>
  )
}
