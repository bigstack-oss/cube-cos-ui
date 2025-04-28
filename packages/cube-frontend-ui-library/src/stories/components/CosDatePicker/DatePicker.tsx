import { useState } from 'react'
import { CosDatePicker } from '../../../components/CosDatePicker/CosDatePicker'
import {
  DatePickerDates,
  useDatePickerDisplayDates,
} from '../../../components/CosDatePicker/useDatePickerDisplayDates'
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

  const {
    displayDates,
    onChange,
    onCancel,
    onReset: onDisplayDatesReset,
  } = useDatePickerDisplayDates({
    initialStartDate: dates.start,
    initialEndDate: dates.end,
  })

  const onReset = () => {
    onDisplayDatesReset()
    setDates({
      start: undefined,
      end: undefined,
    })
  }

  const onApply = () => {
    setDates({
      start: displayDates.start,
      end: displayDates.end,
    })
  }

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
