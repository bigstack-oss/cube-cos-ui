import { useContext } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { useUILibraryTranslation } from '../../i18n/useUILibraryTranslation'
import { CosButton } from '../CosButton/CosButton'
import { CosDatePickerInput } from './CosDatePickerInput'
import { CosDatePickerCalendar } from './CosDatePickerCalendar'
import { CosDatePickerContext } from './context'
import { menu } from './styles'

export const CosDatePickerMenu = () => {
  const { floatingProps, displayDates, onApply, onReset } =
    useContext(CosDatePickerContext)

  const { start, end } = displayDates

  const { elementRef, resolvedStyles } = floatingProps

  const { t } = useUILibraryTranslation()

  return createPortal(
    <div
      ref={elementRef}
      className={twMerge(menu())}
      style={resolvedStyles?.floatingStyle}
    >
      <div className="flex gap-4">
        <CosDatePickerInput
          type="start"
          value={start ? start.format('YYYY/MM/DD') : ''}
          placeholder={t('component.datePicker.chooseStart')}
        />
        <CosDatePickerInput
          type="end"
          value={end ? end.format('YYYY/MM/DD') : ''}
          placeholder={t('component.datePicker.chooseEnd')}
        />
      </div>
      <CosDatePickerCalendar />
      <div className="flex justify-end gap-2">
        <CosButton size="sm" type="ghost" onClick={onReset}>
          {t('component.datePicker.reset')}
        </CosButton>
        <CosButton
          size="sm"
          type="primary"
          onClick={onApply}
          disabled={!start || !end}
        >
          {t('component.datePicker.apply')}
        </CosButton>
      </div>
    </div>,
    document.body,
  )
}
