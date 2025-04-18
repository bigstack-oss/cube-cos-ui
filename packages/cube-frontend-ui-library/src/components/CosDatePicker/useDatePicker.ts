import { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'

export type DatePickerDates = {
  start: Dayjs | undefined
  end: Dayjs | undefined
}

type UseDatePickerOption = {
  handledDates: DatePickerDates
  onHandledDatesChange: (dates: DatePickerDates) => void
}

type UseDatePicker = {
  displayDates: DatePickerDates
  onChange: (date: Dayjs) => void
  onCancel: () => void
  onReset: () => void
  onApply: () => void
}

export const useDatePicker = (option: UseDatePickerOption): UseDatePicker => {
  const { handledDates, onHandledDatesChange } = option

  const [displayDates, setDisplayDates] = useState<{
    start: Dayjs | undefined
    end: Dayjs | undefined
  }>({ start: handledDates.start, end: handledDates.end })

  // Sync the displayed dates with the handled dates,
  // as users might clear the start and end dates from outside the component.
  useEffect(() => {
    setDisplayDates(handledDates)
  }, [handledDates])

  const onChange = (date: Dayjs) => {
    const { start, end } = displayDates

    if (start && end) {
      setDisplayDates({ start: date, end: undefined })
    } else if (!displayDates.start) {
      setDisplayDates({ start: date, end: undefined })
    } else if (start && date >= start) {
      setDisplayDates((prev) => ({ ...prev, end: date }))
    } else {
      setDisplayDates((prev) => ({ start: date, end: prev.start }))
    }
  }

  const onCancel = () => {
    setDisplayDates({ start: handledDates.start, end: handledDates.end })
  }

  const onReset = () => {
    setDisplayDates({ start: undefined, end: undefined })
    onHandledDatesChange({ start: undefined, end: undefined })
  }

  const onApply = () => {
    onHandledDatesChange({ start: displayDates.start, end: displayDates.end })
  }

  return {
    displayDates,
    onChange,
    onCancel,
    onReset,
    onApply,
  }
}
