import { createContext } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { UseFloating } from '../../internal/utils/floating/useFloating'

export type CosDatePickerContextValue = {
  now: Dayjs
  currentMonth: Dayjs
  calendarOpen: boolean
  toggleCalendarOpen: () => void
  floatingProps: UseFloating<HTMLButtonElement, HTMLDivElement>

  triggerDisabled: boolean
  isSelected: boolean
  displayDates: {
    start: Dayjs | undefined
    end: Dayjs | undefined
  }
  onDateClick: (date: Dayjs) => void
  onPreviousMonthClick: () => void
  onNextMonthClick: () => void
  onCancel: () => void
  onApply: () => void
  onReset: () => void
}

export const CosDatePickerContext = createContext<CosDatePickerContextValue>({
  now: dayjs(),
  currentMonth: dayjs(),
  calendarOpen: false,
  toggleCalendarOpen: () => {},
  floatingProps: undefined as unknown as UseFloating<
    HTMLButtonElement,
    HTMLDivElement
  >,

  triggerDisabled: false,
  isSelected: false,
  displayDates: {
    start: undefined,
    end: undefined,
  },
  onDateClick: () => {},
  onPreviousMonthClick: () => {},
  onNextMonthClick: () => {},
  onCancel: () => {},
  onApply: () => {},
  onReset: () => {},
})
