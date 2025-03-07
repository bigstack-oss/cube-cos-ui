import dayjs, { Dayjs } from 'dayjs'

export type DateButtonStatus =
  | 'unselected'
  | 'unselected-today'
  | 'selected-single'
  | 'selected-range-start'
  | 'selected-range-between'
  | 'selected-range-end'

export const formatDateRange = (startDate?: Dayjs, endDate?: Dayjs) => {
  if (startDate && endDate) {
    return `${dayjs(startDate).format('YYYY/MM/DD')} - ${dayjs(endDate).format('YYYY/MM/DD')}`
  }

  if (startDate) {
    return dayjs(startDate).format('YYYY/MM/DD')
  }

  if (endDate) {
    return dayjs(endDate).format('YYYY/MM/DD')
  }

  return undefined
}

export const getDateButtonStatus = (
  selectedDate: Dayjs,
  startDate?: Dayjs,
  endDate?: Dayjs,
) => {
  const today = dayjs().startOf('day')

  if (startDate && selectedDate.isSame(startDate, 'day')) {
    return 'selected-range-start'
  }
  if (endDate && selectedDate.isSame(endDate, 'day')) {
    return 'selected-range-end'
  }
  if (
    startDate &&
    endDate &&
    selectedDate.isAfter(startDate) &&
    selectedDate.isBefore(endDate)
  ) {
    return 'selected-range-between'
  }
  if (selectedDate.isSame(today, 'day')) {
    return 'unselected-today'
  }
  return 'unselected'
}
