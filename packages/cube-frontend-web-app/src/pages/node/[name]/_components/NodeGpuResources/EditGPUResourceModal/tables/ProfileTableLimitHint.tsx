import { tableHintStyles } from './tableStyles'

type ProfileTableLimitHintProps = {
  label: string
  currentSum: {
    value: number // Number.POSITIVE_INFINITY represents "no limit"
    unit?: string
  }
  limit: {
    value: number // Number.POSITIVE_INFINITY represents "no limit"
    unit?: string
  }
}

const formatLimitValue = (value: number, unit?: string) => {
  if (value === Number.POSITIVE_INFINITY) return '—'
  return unit ? `${value} ${unit}` : `${value}`
}

export const ProfileTableLimitHint = (props: ProfileTableLimitHintProps) => {
  const { label, currentSum, limit } = props

  const isLimitExceeded =
    limit.value !== Number.POSITIVE_INFINITY && currentSum.value > limit.value

  return (
    <div className={tableHintStyles.text}>
      {label}:{' '}
      <span
        className={tableHintStyles.number({
          error: isLimitExceeded,
        })}
      >
        {formatLimitValue(currentSum.value, currentSum.unit)}
      </span>
      {' / '}
      {formatLimitValue(limit.value, limit.unit)}
    </div>
  )
}
