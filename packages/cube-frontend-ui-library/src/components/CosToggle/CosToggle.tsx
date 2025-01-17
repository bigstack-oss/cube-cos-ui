import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

export type CosToggleProps = {
  isOn: boolean
  label?: string
  disabled?: boolean
  onChange?: (isOn: boolean) => void
}

const track = cva(
  'flex h-[20px] w-9 items-center rounded-full border border-transparent transition-colors',
  {
    variants: {
      isOn: {
        true: ['bg-status-positive'],
        false: ['bg-functional-disable-text'],
      },
      disabled: {
        false: ['cursor-pointer'],
        true: ['cursor-default'],
      },
    },
    compoundVariants: [
      // Not disabled
      {
        isOn: true,
        disabled: false,
        className: ['hover:bg-green-400'],
      },
      {
        isOn: false,
        disabled: false,
        className: ['hover:bg-grey-400'],
      },
      // Disabled
      {
        isOn: true,
        disabled: true,
        className: ['border-green-200 bg-green-100'],
      },
      {
        isOn: false,
        disabled: true,
        className: ['border-functional-disable bg-grey-150'],
      },
    ],
    defaultVariants: {
      disabled: false,
    },
  },
)

const thumb = cva(
  'size-[17px] rounded-full bg-grey-0 shadow-md transition-transform',
  {
    variants: {
      isOn: {
        true: ['translate-x-4'],
        false: ['translate-x-px'],
      },
    },
  },
)

export const CosToggle = (props: CosToggleProps) => {
  const { isOn, label, disabled, onChange } = props

  const onTrackClick = () => {
    onChange?.(!isOn)
  }

  return (
    <div className="flex items-center gap-x-[6px]">
      <button
        type="button"
        className={twMerge(track({ isOn, disabled }))}
        disabled={disabled}
        onClick={onTrackClick}
      >
        <span className={thumb({ isOn })} />
      </button>
      {label && (
        <label className="primary-body4 text-functional-text">{label}</label>
      )}
    </div>
  )
}
