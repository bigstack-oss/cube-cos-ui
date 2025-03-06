import { useContext } from 'react'
import { createPortal } from 'react-dom'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { CosButton } from '../CosButton/CosButton'
import { CosDatePickerInput } from './CosDatePickerInput'
import { CosDatePickerCalendar } from './CosDatePickerCalendar'
import { CosDatePickerContext } from './context'
import { menu } from './styles'

export const CosDatePickerMenu = () => {
  const {
    floatingProps,
    calendarOpen: isVisible,
    startDate,
    endDate,
    currentMonth,
    onPreviousMonthClick,
    onNextMonthClick,
    onDateClick,
    onCancelClick,
    onApplyClick,
  } = useContext(CosDatePickerContext)

  const { elementRef, resolvedStyles } = floatingProps

  return createPortal(
    <div
      ref={elementRef}
      className={twMerge(menu({ isVisible }))}
      style={resolvedStyles?.floatingStyle}
    >
      <div className="flex gap-4">
        <CosDatePickerInput
          type="start"
          value={startDate ? format(startDate, 'yyyy/MM/dd') : ''}
          placeholder="Choose Start"
        />
        <CosDatePickerInput
          type="end"
          value={endDate ? format(endDate, 'yyyy/MM/dd') : ''}
          placeholder="Choose End"
        />
      </div>
      <CosDatePickerCalendar
        currentMonth={currentMonth}
        onPreviousMonth={onPreviousMonthClick}
        onNextMonth={onNextMonthClick}
        onSelectDay={onDateClick}
        startDate={startDate}
        endDate={endDate}
      />
      <div className="flex justify-end gap-2">
        <CosButton size="sm" type="ghost" onClick={onCancelClick}>
          Cancel
        </CosButton>
        <CosButton size="sm" type="primary" onClick={onApplyClick}>
          Apply
        </CosButton>
      </div>
    </div>,
    document.body,
  )
}
