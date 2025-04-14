import { useCallback, useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { useFloating } from '../../internal/utils/floating/useFloating'
import { CosDatePickerTrigger } from './CosDatePickerTrigger'
import { CosDatePickerMenu } from './CosDatePickerMenu'
import { CosDatePickerSkeleton } from './CosDatePickerSkeleton'
import { CosDatePickerContext } from './context'

type CosDatePickerProps = {
  /**
   * @default false
   */
  disabled?: boolean
  /**
   * @default false
   */
  isLoading?: boolean
  startDate: Dayjs | undefined
  endDate: Dayjs | undefined
  setStartDate: (date: Dayjs | undefined) => void
  setEndDate: (date: Dayjs | undefined) => void
  /**
   * Optional callback triggered when "Apply" button is clicked
   */
  onApplyClick?: () => void
  /**
   * Optional callback triggered when "Cancel" button is clicked
   */
  onCancelClick?: () => void
}

export const CosDatePicker = (props: CosDatePickerProps) => {
  const {
    disabled = false,
    isLoading = false,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    onApplyClick,
    onCancelClick,
  } = props

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const [displayDates, setDisplayDates] = useState<{
    start: Dayjs | undefined
    end: Dayjs | undefined
  }>({ start: startDate, end: endDate })

  const [currentMonth, setCurrentMonth] = useState(() => dayjs(new Date()))

  const handleDisplayDatesChange = (date: Dayjs) => {
    const { start, end } = displayDates

    if (start && end) {
      setDisplayDates({ start: date, end: undefined })
    } else if (!displayDates.start) {
      setDisplayDates({ start: date, end: undefined })
    } else if (start && date >= start) {
      setDisplayDates((prev) => ({ ...prev, end: date }))
    } else {
      setDisplayDates((prev) => ({ start: date, end: prev.start }))
    }
  }

  const handleApply = () => {
    const { start, end } = displayDates

    if (!start || !end) return

    onApplyClick?.()
    setStartDate(start)
    setEndDate(end)
    setIsCalendarOpen(false)
  }

  const handleCancel = useCallback(() => {
    onCancelClick?.()
    setDisplayDates({ start: startDate, end: endDate })
    setIsCalendarOpen(false)
  }, [endDate, onCancelClick, startDate])

  const handleReset = () => {
    setDisplayDates({ start: startDate, end: endDate })
  }

  const toggleCalendarOpen = () => {
    setIsCalendarOpen((prev) => !prev)
  }

  const handlePreviousMonthClick = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'))
  }

  const handleNextMonthClick = () => {
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
        handleCancel()
      }
    },
    [anchorRef, elementRef, handleCancel],
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
        currentMonth,
        calendarOpen: isCalendarOpen,
        toggleCalendarOpen,
        floatingProps,
        triggerDisabled: disabled,
        isSelected: !!displayDates.start || !!displayDates.end,
        displayDates,
        onDateClick: handleDisplayDatesChange,
        onPreviousMonthClick: handlePreviousMonthClick,
        onNextMonthClick: handleNextMonthClick,
        onApplyClick: handleApply,
        onCancelClick: handleCancel,
        onResetClick: handleReset,
      }}
    >
      <>
        <CosDatePickerTrigger />
        <CosDatePickerMenu />
      </>
    </CosDatePickerContext.Provider>
  )
}
