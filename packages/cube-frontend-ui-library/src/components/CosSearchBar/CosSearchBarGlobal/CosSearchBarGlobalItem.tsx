import { twMerge } from 'tailwind-merge'
import Recently from '../../CosIcon/monochrome/recently.svg?react'
import Clear from '../../CosIcon/monochrome/x_small.svg?react'
import { keyword } from './cosSearchBarGlobalStyles'

type BaseItemProps = {
  children: string
  onClick: () => void
}

type SuggestionItemProps = {
  type: 'suggestion'
}

type RecentSuggestionItemProps = {
  type: 'recentSuggestion'
  onSuggestionClear: () => void
}

export type CosSearchBarGlobalItemProps = BaseItemProps &
  (RecentSuggestionItemProps | SuggestionItemProps)

export const CosSearchBarGlobalItem = (props: CosSearchBarGlobalItemProps) => {
  const { type, children, onClick } = props

  const isRecent = type === 'recentSuggestion'

  const renderClearButton = () => {
    if (!isRecent) return null
    const { onSuggestionClear } = props
    return (
      <Clear
        className="icon-md cursor-pointer rounded-full text-functional-text-light hover:bg-white"
        onClick={(e) => {
          e.stopPropagation()
          onSuggestionClear()
        }}
      />
    )
  }

  return (
    <div className={twMerge(keyword.item({ isRecent }))} onClick={onClick}>
      <div
        className="flex min-w-[232px] items-center gap-x-2"
        onClick={onClick}
      >
        {isRecent && (
          <Recently className="icon-md text-functional-text-light" />
        )}
        {children}
      </div>
      {renderClearButton()}
    </div>
  )
}
