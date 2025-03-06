import { createContext } from 'react'
import { UseFloating } from '../../internal/utils/floating/useFloating'

export type CosDatePickerContextValue = {
  currentMonth: Date
  calendarOpen: boolean
  toggleCalendarOpen: () => void
  floatingProps: UseFloating<HTMLButtonElement, HTMLDivElement>

  triggerDisabled: boolean
  isSelected: boolean
  startDate: Date | undefined
  endDate: Date | undefined
  onDateClick: (date: Date) => void
  onPreviousMonthClick: () => void
  onNextMonthClick: () => void
  onApplyClick: () => void
  onCancelClick: () => void
}

export const CosDatePickerContext = createContext<CosDatePickerContextValue>({
  currentMonth: new Date(),
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
