import { useCallback, useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { useFloating } from '../../internal/utils/floating/useFloating'
import { CosDatePickerTrigger } from './CosDatePickerTrigger'
import { CosDatePickerMenu } from './CosDatePickerMenu'
import { CosDatePickerSkeleton } from './CosDatePickerSkeleton'
import { CosDatePickerContext } from './context'

type CosDatePickerProps = {
  disabled?: boolean
  isLoading?: boolean
  startDate?: Dayjs
  endDate?: Dayjs
  setStartDate: (date: Dayjs | undefined) => void
  setEndDate: (date: Dayjs | undefined) => void
  onApplyClick?: () => void
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

  const [currentMonth, setCurrentMonth] = useState(() => dayjs(new Date()))

  const handleDayClick = (date: Dayjs) => {
    if (startDate && endDate) {
      setStartDate(date)
      setEndDate(undefined)
    } else if (!startDate) {
      setStartDate(date)
    } else if (startDate && date >= startDate) {
      setEndDate(date)
    } else {
      setStartDate(date)
      setEndDate(startDate)
    }
  }

  const handleApply = () => {
    if (onApplyClick) onApplyClick()
    setIsCalendarOpen(false)
  }

  const handleCancel = () => {
    if (onCancelClick) onCancelClick()
    setIsCalendarOpen(false)
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
    // autoPlacement: true,
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
        setIsCalendarOpen(false)
      }
    },
    [anchorRef, elementRef],
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
        isSelected: !!startDate || !!endDate,
        startDate,
        endDate,
        onDateClick: handleDayClick,
        onPreviousMonthClick: handlePreviousMonthClick,
        onNextMonthClick: handleNextMonthClick,
        onApplyClick: handleApply,
        onCancelClick: handleCancel,
      }}
    >
      <div>
        <CosDatePickerTrigger />
        <CosDatePickerMenu />
      </div>
    </CosDatePickerContext.Provider>
  )
}
