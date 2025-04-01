import { cva } from 'class-variance-authority'
import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { CosOverflowMenuContext } from './CosOverflowMenuContext'
import { CosOverflowMenuItemLeadingContent } from './CosOverflowMenuItemLeadingContent'
import { CosOverflowMenuItemTrailingContent } from './CosOverflowMenuItemTrailingContent'
import { CosOverflowMenuItemProps } from './cosOverflowMenuItemUtils'

const container = cva(
  [
    'flex items-center gap-x-1',
    'min-w-40 max-w-[360px] px-[22px] py-2',
    'bg-transparent transition-colors',
  ],
  {
    variants: {
      hasOnClickProp: {
        true: 'cursor-pointer',
        false: 'cursor-default',
      },
      withSubtext: {
        true: 'h-[53px]',
        false: 'h-[36ox]',
      },
      disabled: {
        true: 'group cursor-default',
        false: 'hover:bg-functional-hover-grey',
      },
    },
  },
)

export const CosOverflowMenuItem = (props: CosOverflowMenuItemProps) => {
  const { type, title, boldTitle, subText } = props

  const closeMenu = useContext(CosOverflowMenuContext)

  const getIsDisabled = (): boolean => {
    return 'disabled' in props && !!props.disabled
  }

  const onClick = () => {
    if (getIsDisabled()) {
      return
    }

    if ('onClick' in props) {
      props.onClick?.()

      if (type !== 'check-mark' && type !== 'toggle') {
        closeMenu()
      }
    }
  }

  return (
    <div
      className={twMerge(
        container({
          hasOnClickProp: 'onClick' in props,
          withSubtext: !!subText,
          disabled: getIsDisabled(),
        }),
      )}
      onClick={onClick}
    >
      <CosOverflowMenuItemLeadingContent {...props} />
      <div className="flex grow flex-col gap-y-0.5 overflow-hidden">
        <div
          className={twMerge(
            'primary-body2 truncate text-functional-title group-[.group]:text-functional-disable-text',
            boldTitle && 'font-semibold',
          )}
        >
          {title}
        </div>
        {subText && (
          <div className="primary-body5 truncate text-functional-text-light group-[.group]:text-functional-disable-text">
            {subText}
          </div>
        )}
      </div>
      <CosOverflowMenuItemTrailingContent {...props} />
    </div>
  )
}
