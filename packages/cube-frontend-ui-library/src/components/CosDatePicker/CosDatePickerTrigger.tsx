import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { useUILibraryTranslation } from '../../i18n/useUILibraryTranslation'
import CalendarIcon from '../CosIcon/monochrome/calendar.svg?react'
import { CosDatePickerContext } from './context'
import { formatDateRange } from './utils'
import { trigger } from './styles'

export const CosDatePickerTrigger = () => {
  const {
    floatingProps,
    isSelected,
    triggerDisabled: disabled,
    calendarOpen: isOpen,
    toggleCalendarOpen,
    displayDates,
  } = useContext(CosDatePickerContext)

  const { start, end } = displayDates

  const { t } = useUILibraryTranslation()

  return (
    <button
      ref={floatingProps.anchorRef}
      type="button"
      disabled={disabled}
      onClick={toggleCalendarOpen}
      className={twMerge(trigger({ isSelected, isOpen, disabled }))}
    >
      <CalendarIcon className="icon-md shrink-0" />
      <span>
        {formatDateRange(start, end) ?? t('component.datePicker.time')}
      </span>
    </button>
  )
}
