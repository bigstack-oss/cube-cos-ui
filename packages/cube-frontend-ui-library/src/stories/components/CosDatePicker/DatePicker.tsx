import { useState } from 'react'
import { CosDatePicker } from '../../../components/CosDatePicker/CosDatePicker'
import {
  DatePickerDates,
  useDatePicker,
} from '../../../components/CosDatePicker/useDatePicker'
import { Dayjs } from 'dayjs'

type DatePickerProps = {
  defaultDates: DatePickerDates
  disabled?: boolean
  isLoading?: boolean
}

export const DatePicker = (props: DatePickerProps) => {
  const { defaultDates, disabled = false, isLoading = false } = props

  const [dates, setDates] = useState<{
    start: Dayjs | undefined
    end: Dayjs | undefined
  }>({ start: defaultDates.start, end: defaultDates.end })

  const { displayDates, onChange, onCancel, onReset, onApply } = useDatePicker({
    handledDates: dates,
    onHandledDatesChange: (dates: DatePickerDates) => setDates(dates),
  })

  return (
    <CosDatePicker
      disabled={disabled}
      isLoading={isLoading}
      displayDates={displayDates}
      onChange={onChange}
      onCancel={onCancel}
      onApply={onApply}
      onReset={onReset}
    />
  )
}
