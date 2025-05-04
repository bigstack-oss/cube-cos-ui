import { useCallback, useContext, useEffect, useState } from 'react'
import { Dayjs } from 'dayjs'
import { useFloating } from '../../internal/utils/floating/useFloating'
import { useTimeZoneTime } from '../../internal/utils/timeZone/useTimeZoneTime'
import { CosTimeZoneContext } from './CosTimeZoneContext'
import { CosDatePickerTrigger } from './CosDatePickerTrigger'
import { CosDatePickerMenu } from './CosDatePickerMenu'
import { CosDatePickerSkeleton } from './CosDatePickerSkeleton'
import { CosDatePickerContext } from './context'
import { DatePickerDates } from './useDatePickerDisplayDates'

type CosDatePickerProps = {
  /**
   * @default false
   */
  disabled?: boolean
  /**
   * @default false
   */
  isLoading?: boolean
  displayDates: DatePickerDates
  onChange: (date: Dayjs) => void
  onCancel: () => void
  onApply: () => void
  onReset: () => void
}

export const CosDatePicker = (props: CosDatePickerProps) => {
  const {
    disabled = false,
    isLoading = false,
    displayDates,
    onChange: onChangeProps,
    onCancel: onCancelProps,
    onApply: onApplyProps,
    onReset: onResetProps,
  } = props

  const timeZone = useContext(CosTimeZoneContext)

  const now = useTimeZoneTime(timeZone, 5000)

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const [currentMonth, setCurrentMonth] = useState(now)

  useEffect(() => {
    setCurrentMonth(now)
  }, [now])

  const onApply = () => {
    const { start, end } = displayDates

    if (!start || !end) return

    onApplyProps()
    setIsCalendarOpen(false)
  }

  const onReset = useCallback(() => {
    onResetProps()
  }, [onResetProps])

  const onCancel = useCallback(() => {
    onCancelProps()
    setIsCalendarOpen(false)
  }, [onCancelProps])

  const toggleCalendarOpen = () => {
    setIsCalendarOpen((prev) => !prev)
  }

  const onPreviousMonthClick = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'))
  }

  const onNextMonthClick = () => {
    setCurrentMonth(currentMonth.add(1, 'month'))
  }

  const floatingProps = useFloating<HTMLButtonElement, HTMLDivElement>({
    placement: 'bottom-left',
    autoPlacement: true,
    offsets: {
      y: 8,
    },
  })

  const { anchorRef, elementRef } = floatingProps

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement

      const isTrigger = anchorRef.current?.contains(target)
      const isMenu = elementRef.current?.contains(target)

      if (!isTrigger && !isMenu) {
        onCancel()
      }
    },
    [anchorRef, elementRef, onCancel],
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  if (isLoading) return <CosDatePickerSkeleton />

  return (
    <CosDatePickerContext.Provider
      value={{
        now,
        currentMonth,
        calendarOpen: isCalendarOpen,
        toggleCalendarOpen,
        floatingProps,
        triggerDisabled: disabled,
        isSelected: !!displayDates.start || !!displayDates.end,
        displayDates,
        onDateClick: onChangeProps,
        onPreviousMonthClick,
        onNextMonthClick,
        onCancel,
        onApply,
        onReset,
      }}
    >
      <>
        <CosDatePickerTrigger />
        <CosDatePickerMenu />
      </>
    </CosDatePickerContext.Provider>
  )
}
