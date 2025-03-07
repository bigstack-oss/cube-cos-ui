import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import CalendarIcon from '../CosIcon/monochrome/calendar.svg?react'
import { CosDatePickerContext } from './context'
import { formatDateRange } from './utils'
import { trigger } from './styles'

export const CosDatePickerTrigger = () => {
  const {
    floatingProps,
    isSelected,
    triggerDisabled: disabled,
    startDate,
    endDate,
    toggleCalendarOpen,
  } = useContext(CosDatePickerContext)

  return (
    <button
      ref={floatingProps.anchorRef}
      type="button"
      disabled={disabled}
      onClick={toggleCalendarOpen}
      className={twMerge(trigger({ isSelected, disabled }))}
    >
      <CalendarIcon className="icon-md shrink-0" />
      <span>{formatDateRange(startDate, endDate) ?? 'Time'}</span>
    </button>
  )
}
