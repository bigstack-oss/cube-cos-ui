import { cva } from 'class-variance-authority'
import { ClassValue } from 'class-variance-authority/types'
import { computeStatusType, Status, StatusType } from './utils'

export type CosStatusProps = {
  status: Status
}

const statusCva = cva(
  [
    'flex h-[17px] cursor-default items-center rounded-[20px] border px-2.5',
    'secondary-body6 font-semibold',
  ],
  {
    variants: {
      type: {
        neutral: 'border-cosmos-primary text-cosmos-primary',
        success: 'border-status-positive text-status-positive',
        warning: 'border-status-negative text-status-negative',
        others: 'border-functional-text-light text-functional-text-light',
      } satisfies Record<StatusType, ClassValue>,
    },
  },
)

/**
 * TODO: Remove this helper function after i18n is implemented.
 * Split a string using the `-` character and capitalize the first substring.
 */
const formatText = (status: string): string => {
  const substrings = status.split('-').filter((text) => !!text)
  if (!substrings.length) {
    // This should not happen.
    return status
  }

  // Capitalize the first substring.
  const [firstSubstring, ...otherSubstrings] = substrings
  const capitalizedFirstSubstring =
    firstSubstring[0].toUpperCase() + firstSubstring.substring(1)

  return [capitalizedFirstSubstring, ...otherSubstrings].join('-')
}

export const CosStatus = (props: CosStatusProps) => {
  const { status } = props

  const type = computeStatusType(status)

  return (
    <span className={statusCva({ type })}>
      {/* TODO: i18n */}
      {formatText(status)}
    </span>
  )
}
