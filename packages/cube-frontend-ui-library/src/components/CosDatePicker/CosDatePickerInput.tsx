import { CosTableInput } from '../CosTableInput/CosTableInput'

type CosDatePickerInputProps = {
  type: 'start' | 'end'
  value?: string
  placeholder?: string
}

export const CosDatePickerInput = (props: CosDatePickerInputProps) => {
  const { type, value, placeholder } = props

  const label = type === 'start' ? 'Start' : 'End'

  return (
    <div className="flex w-[132.5px] flex-col gap-2">
      <p className="primary-body4 font-medium text-functional-text-light">
        {label}
      </p>
      <CosTableInput
        type="text"
        value={value}
        placeholder={placeholder}
        readOnly
      />
    </div>
  )
}
