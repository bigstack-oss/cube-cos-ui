import { GetModuleHealthHistoryResponseDataHistoryInnerError } from '@cube-frontend/api'
import { CosHyperlink, CosTooltip } from '@cube-frontend/ui-library'
import { twMerge } from 'tailwind-merge'

export type ErrorLogProps = {
  error: GetModuleHealthHistoryResponseDataHistoryInnerError
}

export const ErrorLog = (props: ErrorLogProps) => {
  const { error } = props

  const onCopyClick = () => {
    if ('navigator' in window && error.details) {
      window.navigator.clipboard.writeText(error.details)
    }
  }

  return (
    <div className="mt-4 flex flex-col">
      <div
        className={twMerge(
          'flex items-center justify-between px-6 py-3',
          'rounded-t-[5px] border border-functional-border-divider bg-scene-background',
        )}
      >
        <CosHyperlink variant="text-only" href={error.log} target="_blank">
          Details log
        </CosHyperlink>
        <CosTooltip
          hoverContent={{
            message: 'Click to copy details',
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
      <div className="primary-body3 rounded-b-[5px] bg-dark-700 px-6 py-4 text-functional-border-darker">
        {error.details}
      </div>
    </div>
  )
}
