import { useContext } from 'react'
import { createPortal } from 'react-dom'
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
    displayDates,
    onApply,
    onReset,
  } = useContext(CosDatePickerContext)

  const { start, end } = displayDates

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
          value={start ? start.format('YYYY/MM/DD') : ''}
          placeholder="Choose Start"
        />
        <CosDatePickerInput
          type="end"
          value={end ? end.format('YYYY/MM/DD') : ''}
          placeholder="Choose End"
        />
      </div>
      <CosDatePickerCalendar />
      <div className="flex justify-end gap-2">
        <CosButton size="sm" type="ghost" onClick={onReset}>
          Reset
        </CosButton>
        <CosButton
          size="sm"
          type="primary"
          onClick={onApply}
          disabled={!start || !end}
        >
          Apply
        </CosButton>
      </div>
    </div>,
    document.body,
  )
}
