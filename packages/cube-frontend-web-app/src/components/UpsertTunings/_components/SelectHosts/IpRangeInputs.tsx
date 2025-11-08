import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { cva } from 'class-variance-authority'
import { isIPv4 } from '@cube-frontend/web-app/utils/ip'
import { IpRange } from './useHostFilter'

type IpRangeInputsProps = {
  ipRange: IpRange
  onChange: (boundary: keyof IpRange, e: ChangeEvent<HTMLInputElement>) => void
}

const input = cva(
  [
    'w-36 px-3 py-2',
    'primary-body3 text-functional-text placeholder:text-functional-border-darker',
    'rounded-[5px] border border-functional-border-divider bg-grey-0 outline-none',
  ],
  {
    variants: {
      hasError: {
        true: 'border-status-negative',
        false: '',
      },
    },
  },
)

export const IpRangeInputs = (props: IpRangeInputsProps) => {
  const {
    ipRange: { start, end },
    onChange,
  } = props

  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-x-2">
      <input
        className={input({
          hasError: !!start && !isIPv4(start),
        })}
        placeholder={t('maintenance.tunings.upsert.ipRange')}
        value={start}
        onChange={(e) => onChange('start', e)}
      />
      <span className="primary-body3 text-functional-text">-</span>
      <input
        className={input({
          hasError: !!end && !isIPv4(end),
        })}
        placeholder={t('maintenance.tunings.upsert.ipRange')}
        value={end}
        onChange={(e) => onChange('end', e)}
      />
    </div>
  )
}
