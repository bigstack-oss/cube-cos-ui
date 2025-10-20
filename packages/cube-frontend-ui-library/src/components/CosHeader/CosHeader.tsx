import { CosStroke } from '@cube-frontend/ui-library'
import { QuickAccessBar, QuickAccessBarProps } from './QuickAccessBar'
import { FunctionBar, FunctionBarItem } from './FunctionBar'
import { LanguageDropdown, LanguageDropdownProps } from './LanguageDropdown'

export type CosHeaderProps = QuickAccessBarProps &
  LanguageDropdownProps & {
    functionBarItems: FunctionBarItem[]
  }

export const CosHeader = (props: CosHeaderProps) => {
  const {
    isLoading,
    quickAccesses,
    functionBarItems,
    languageOptions,
    currentLanguage,
  } = props

  return (
    <div className="relative flex h-[54px] flex-row items-center justify-end gap-x-2.5 px-5">
      <QuickAccessBar isLoading={isLoading} quickAccesses={quickAccesses} />
      <div className="h-6 w-px bg-functional-border-divider" />
      <LanguageDropdown
        currentLanguage={currentLanguage}
        languageOptions={languageOptions}
      />
      <FunctionBar items={functionBarItems} />
      <div className="absolute bottom-0 left-0 w-full px-5">
        <CosStroke />
      </div>
    </div>
  )
}
