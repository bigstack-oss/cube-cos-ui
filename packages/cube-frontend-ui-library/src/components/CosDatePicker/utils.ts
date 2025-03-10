import dayjs, { Dayjs } from 'dayjs'
import { chunk } from 'lodash'

export type DateButtonStatus =
  | 'unselected'
  | 'unselected-today'
  | 'selected-single'
  | 'selected-range-start'
  | 'selected-range-between'
  | 'selected-range-end'

export const formatDateRange = (
  startDate: Dayjs | undefined,
  endDate: Dayjs | undefined,
) => {
  /**
   * If both start and end date are selected
   * then the selected date is shown as a range
   */
  if (startDate && endDate) {
    return `${dayjs(startDate).format('YYYY/MM/DD')} - ${dayjs(endDate).format('YYYY/MM/DD')}`
  }
  /**
   * If only the start date or end date is selected
   * then the selected date is shown as a single date
   */
  if (startDate) {
    return dayjs(startDate).format('YYYY/MM/DD')
  }
  if (endDate) {
    return dayjs(endDate).format('YYYY/MM/DD')
  }
  /**
   * The default value when no date is selected
   */
  return undefined
}

export const getDateButtonStatus = (
  date: Dayjs,
  selectedStartDate: Dayjs | undefined,
  selectedEndDate: Dayjs | undefined,
) => {
  const today = dayjs().startOf('day')

  /**
   * If both start and end date are selected and they are the same date
   * then the selected date is shown as a single date
   */
  if (
    selectedStartDate &&
    selectedEndDate &&
    date.isSame(selectedStartDate, 'day') &&
    date.isSame(selectedEndDate, 'day')
  ) {
    return 'selected-single'
  }
  /**
   * If the selected date is the start date or the end date
   * then the selected date is shown as the start or end date
   */
  if (selectedStartDate && date.isSame(selectedStartDate, 'day')) {
    return 'selected-range-start'
  }
  if (selectedEndDate && date.isSame(selectedEndDate, 'day')) {
    return 'selected-range-end'
  }
  /**
   * If the selected date is between the start and end date
   * then the selected date is shown as a range between the start and end date
   */
  if (
    selectedStartDate &&
    selectedEndDate &&
    date.isAfter(selectedStartDate) &&
    date.isBefore(selectedEndDate)
  ) {
    return 'selected-range-between'
  }
  /**
   * If the selected date(s) is(are) not today
   * then today is shown as unselected but its style is different
   */
  if (date.isSame(today, 'day')) {
    return 'unselected-today'
  }
  /**
   * The default style for unselected dates
   */
  return 'unselected'
}

/**
 * Each row in the calendar represents a full week, starting on Sunday and ending on Saturday.
 * Every slot in a row must be filled with a date.
 * If the selected month doesn't begin on a Sunday or end on a Saturday,
 * additional dates from the previous or next month are included to complete the first and last weeks.
 */
export const computeCalendarWeeks = (startOfSelectedMonth: Dayjs): Date[][] => {
  const dates: Date[] = []

  const endOfSelectedMonth = startOfSelectedMonth.endOf('month')

  const firstDateOfFirstWeek = startOfSelectedMonth.subtract(
    startOfSelectedMonth.day(),
    'days',
  )

  const lastDateOfLastWeek = endOfSelectedMonth.add(
    6 - endOfSelectedMonth.day(),
    'days',
  )

  const totalDays = lastDateOfLastWeek.diff(firstDateOfFirstWeek, 'days')

  for (let i = 0; i <= totalDays; i++) {
    dates.push(firstDateOfFirstWeek.add(i, 'days').toDate())
  }

  return chunk(dates, 7)
}
