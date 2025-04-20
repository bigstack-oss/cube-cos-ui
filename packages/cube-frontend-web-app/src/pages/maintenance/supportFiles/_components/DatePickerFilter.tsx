import {
  CosDatePicker,
  DatePickerDates,
  useDatePicker,
} from '@cube-frontend/ui-library'
import { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'

export type DatePickerFilterProps = {
  startDate?: Dayjs
  endDate?: Dayjs
  handleStartDateChange: (date?: Dayjs) => void
  handleEndDateChange: (date?: Dayjs) => void
}

export const DatePickerFilter = (props: DatePickerFilterProps) => {
  const { startDate, endDate, handleStartDateChange, handleEndDateChange } =
    props

  const [dates, setDates] = useState<DatePickerDates>({
    start: startDate,
    end: endDate,
  })

  const { displayDates, onChange, onCancel, onReset, onApply } = useDatePicker({
    handledDates: dates,
    onHandledDatesChange: (dates: DatePickerDates) => setDates(dates),
  })

  // Sync selected dates with props
  useEffect(() => {
    setDates({ start: startDate, end: endDate })
  }, [endDate, startDate])

  const handleApplyClick = () => {
    const { start, end } = displayDates
    if (!start || !end) return

    onApply()
    handleStartDateChange(start)
    handleEndDateChange(end)
  }

  const handleResetClick = () => {
    onReset()
    handleStartDateChange(undefined)
    handleEndDateChange(undefined)
  }

  return (
    // TODO: we need a method to clear the date picker selection
    <CosDatePicker
      displayDates={displayDates}
      onChange={onChange}
      onCancel={onCancel}
      onApply={handleApplyClick}
      onReset={handleResetClick}
    />
  )
}
