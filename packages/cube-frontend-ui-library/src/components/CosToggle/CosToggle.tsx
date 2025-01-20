import { twMerge } from 'tailwind-merge'
import { labelCva, thumb, track } from './styles'

export type CosToggleProps = {
  isOn: boolean
  label?: string
  disabled?: boolean
  onChange?: (isOn: boolean) => void
}

export const CosToggle = (props: CosToggleProps) => {
  const { isOn, label, disabled = false, onChange } = props

  const toggleIsOn = () => {
    onChange?.(!isOn)
  }

  const onLabelClick = () => {
    if (!disabled) {
      toggleIsOn()
    }
  }

  return (
    <div className="flex items-center gap-x-[6px]">
      <button
        type="button"
        className={twMerge(track({ isOn, disabled }))}
        disabled={disabled}
        onClick={toggleIsOn}
      >
        <span className={thumb({ isOn })} />
      </button>
      {label && (
        <label className={labelCva({ disabled })} onClick={onLabelClick}>
          {label}
        </label>
      )}
    </div>
  )
}
