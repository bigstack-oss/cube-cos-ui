import { createContext } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { UseFloating } from '../../internal/utils/floating/useFloating'

export type CosDatePickerContextValue = {
  currentMonth: Dayjs
  calendarOpen: boolean
  toggleCalendarOpen: () => void
  floatingProps: UseFloating<HTMLButtonElement, HTMLDivElement>

  triggerDisabled: boolean
  isSelected: boolean
  startDate: Dayjs | undefined
  endDate: Dayjs | undefined
  onDateClick: (date: Dayjs) => void
  onPreviousMonthClick: () => void
  onNextMonthClick: () => void
  onApplyClick: () => void
  onCancelClick: () => void
}

export const CosDatePickerContext = createContext<CosDatePickerContextValue>({
  currentMonth: dayjs(new Date()),
  calendarOpen: false,
  toggleCalendarOpen: () => {},
  floatingProps: undefined as unknown as UseFloating<
    HTMLButtonElement,
    HTMLDivElement
  >,

  triggerDisabled: false,
  isSelected: false,
  startDate: undefined,
  endDate: undefined,
  onDateClick: () => {},
  onPreviousMonthClick: () => {},
  onNextMonthClick: () => {},
  onApplyClick: () => {},
  onCancelClick: () => {},
})
