import { twMerge } from 'tailwind-merge'
import { CosHyperlink, CosTooltip } from '@cube-frontend/ui-library'
import { PropsWithClassName } from '@cube-frontend/utils'

export type CosLogConsoleProps = PropsWithClassName & {
  title?: {
    label: string
    href?: string
  }
  copyTooltip?: string
  logWrapperClassName?: string
  children: string
}

export const CosLogConsole = (props: CosLogConsoleProps) => {
  const { title, copyTooltip, className, logWrapperClassName, children } = props

  const onCopyClick = () => {
    if ('navigator' in window && children) {
      window.navigator.clipboard.writeText(children)
    }
  }

  const renderTitle = () => {
    if (!title) {
      // Empty span used as a placeholder to maintain the layout.
      return <span />
    }

    if (title.href) {
      return (
        <CosHyperlink variant="text-only" href={title.href} target="_blank">
          {title.label}
        </CosHyperlink>
      )
    }
    return (
      <span className="primary-body2 font-medium text-primary">
        {title.label}
      </span>
    )
  }

  return (
    <div className={twMerge('flex w-full flex-col', className)}>
      <div
        className={twMerge(
          'flex items-center justify-between px-6 py-3',
          'rounded-t-[5px] border border-functional-border-divider bg-scene-background',
        )}
      >
        {renderTitle()}
        <CosTooltip
          hoverContent={{
            message: copyTooltip ?? 'Click to copy details',
          }}
          clickContent={{
            message: 'Copied!',
          }}
        >
          <button
            type="button"
            className="primary-body2 cursor-pointer font-medium text-functional-text"
            onClick={onCopyClick}
          >
            Copy
          </button>
        </CosTooltip>
      </div>
      <div
        className={twMerge(
          'primary-body3 overflow-x-auto whitespace-pre rounded-b-[5px] bg-dark-700 px-6 py-4 text-functional-border-darker',
          logWrapperClassName,
        )}
      >
        {children}
      </div>
    </div>
  )
}
