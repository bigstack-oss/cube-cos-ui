import { format } from 'date-fns'

export type DateButtonStatus =
  | 'unselected'
  | 'unselected-today'
  | 'selected-single'
  | 'selected-range-start'
  | 'selected-range-between'
  | 'selected-range-end'

export const formatDateRange = (startDate?: Date, endDate?: Date) => {
  if (startDate && endDate) {
    return `${format(startDate, 'yyyy/MM/dd')} - ${format(endDate, 'yyyy/MM/dd')}`
  }

  if (startDate) {
    return format(startDate, 'yyyy/MM/dd')
  }

  if (endDate) {
    return format(endDate, 'yyyy/MM/dd')
  }

  return undefined
}

export const getDateButtonStatus = (
  selectedDate: Date,
  startDate?: Date,
  endDate?: Date,
): DateButtonStatus => {
  const today = new Date()

  if (
    !startDate &&
    !endDate &&
    today.toDateString() === selectedDate.toDateString()
  )
    return 'unselected-today'

  const isSingleSelection =
    startDate && endDate && startDate.toDateString() === endDate.toDateString()

  if (
    isSingleSelection &&
    startDate.toDateString() === selectedDate.toDateString()
  ) {
    return 'selected-single'
  }

  if (startDate?.toDateString() === selectedDate.toDateString())
    return 'selected-range-start'

  if (endDate?.toDateString() === selectedDate.toDateString())
    return 'selected-range-end'

  if (
    startDate &&
    endDate &&
    selectedDate > startDate &&
    selectedDate < endDate
  )
    return 'selected-range-between'

  return 'unselected'
}
