import { cva } from 'class-variance-authority'
import { ClassValue } from 'class-variance-authority/types'
import { computeStatusType, Status, StatusType } from './utils'
import { useStatusTranslation } from './useStatusTranslation'

export type CosStatusProps = {
  status: Status
  /**
   * Custom display text for the status text.
   * If not specified, the text will be automatically generated
   * based on the built-in logic and i18n translations.
   */
  message?: string
}

const statusCva = cva(
  [
    'flex h-[19px] w-fit cursor-default items-center rounded-[20px] border px-2.5',
    'secondary-body6 whitespace-nowrap font-semibold',
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
 * Split a string using the `-` character and capitalize the first substring.
 */
const formatOtherStatusText = (status: string): string => {
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
  const { status, message } = props

  const type = computeStatusType(status)

  const translationMap = useStatusTranslation()

  const getMessage = () => {
    if (message) {
      return message
    }

    if (status in translationMap) {
      return translationMap[status]
    }

    return formatOtherStatusText(status)
  }

  return <span className={statusCva({ type })}>{getMessage()}</span>
}
