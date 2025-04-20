import { useEffect, useState } from 'react'
import { Dayjs } from 'dayjs'
import {
  CosDatePicker,
  DatePickerDates,
  useDatePicker,
} from '@cube-frontend/ui-library'

type FilterDatePickerProps = {
  startDate: Dayjs | undefined
  endDate: Dayjs | undefined
  handleEventsQueryChange: (updates: Record<string, string | null>) => void
  handleEventsQueryReset: () => void
}

export const FilterDatePicker = (props: FilterDatePickerProps) => {
  const {
    startDate,
    endDate,
    handleEventsQueryChange,
    handleEventsQueryReset,
  } = props

  const [dates, setDates] = useState<DatePickerDates>({
    start: startDate,
    end: endDate,
  })

  const { displayDates, onChange, onCancel, onReset, onApply } = useDatePicker({
    handledDates: dates,
    onHandledDatesChange: (dates: DatePickerDates) => setDates(dates),
  })

  useEffect(() => {
    setDates({ start: startDate, end: endDate })
  }, [startDate, endDate])

  const handleApplyClick = () => {
    const { start, end } = displayDates
    if (!start || !end) return

    onApply()
    handleEventsQueryChange({
      startDate: start.format('YYYY-MM-DD'),
      endDate: end.format('YYYY-MM-DD'),
    })
  }

  const handleResetClick = () => {
    onReset()
    handleEventsQueryReset()
  }

  return (
    <CosDatePicker
      displayDates={displayDates}
      onChange={onChange}
      onCancel={onCancel}
      onApply={handleApplyClick}
      onReset={handleResetClick}
    />
  )
}
