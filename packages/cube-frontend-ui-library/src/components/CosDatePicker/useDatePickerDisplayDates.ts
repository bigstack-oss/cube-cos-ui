import { Dayjs } from 'dayjs'
import { useState } from 'react'

export type DatePickerDates = {
  start: Dayjs | undefined
  end: Dayjs | undefined
}

type UseDatePickerDisplayDatesOptions = {
  initialStartDate?: Dayjs | undefined
  initialEndDate?: Dayjs | undefined
}

type UseDatePickerDisplayDates = {
  displayDates: DatePickerDates
  onChange: (date: Dayjs) => void
  onCancel: () => void
  onReset: () => void
}

export const useDatePickerDisplayDates = (
  options: UseDatePickerDisplayDatesOptions,
): UseDatePickerDisplayDates => {
  const { initialStartDate, initialEndDate } = options

  const [displayDates, setDisplayDates] = useState<DatePickerDates>({
    start: initialStartDate,
    end: initialEndDate,
  })

  const onChange = (date: Dayjs) => {
    const { start, end } = displayDates

    if (start && end) {
      setDisplayDates({ start: date, end: undefined })
    } else if (!start) {
      setDisplayDates({ start: date, end: undefined })
    } else if (start && date >= start) {
      setDisplayDates((prev) => ({ ...prev, end: date }))
    } else {
      setDisplayDates((prev) => ({ start: date, end: prev.start }))
    }
  }

  const onCancel = () => {
    setDisplayDates({ start: initialStartDate, end: initialEndDate })
  }

  const onReset = () => {
    setDisplayDates({ start: undefined, end: undefined })
  }

  return {
    displayDates,
    onChange,
    onCancel,
    onReset,
  }
}
