import { twMerge } from 'tailwind-merge'
import { CosHyperlink, CosTooltip } from '@cube-frontend/ui-library'

export type LogConsoleProps = {
  title?: {
    label: string
    href?: string
  }
  children: string
  copyTooltip?: string
}

export const LogConsole = (props: LogConsoleProps) => {
  const { title, children, copyTooltip } = props

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
    <div className="flex flex-col">
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
            className="primary-body2 cursor-pointer font-semibold text-functional-text"
            onClick={onCopyClick}
          >
            Copy
          </button>
        </CosTooltip>
      </div>
      <div className="primary-body3 overflow-x-auto whitespace-pre rounded-b-[5px] bg-dark-700 px-6 py-4 text-functional-border-darker">
        {children}
      </div>
    </div>
  )
}
