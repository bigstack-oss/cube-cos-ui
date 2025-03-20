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
  startDate: Dayjs | undefined
  endDate: Dayjs | undefined
  setStartDate: (date: Dayjs | undefined) => void
  setEndDate: (date: Dayjs | undefined) => void
  onApplyClick?: () => void
  onCancelClick?: () => void
  /**
   * `onOutsideClickClose` triggered only when the date picker is closed by clicking outside.
   * This will not be triggered when closing via "Apply" or "Cancel" buttons.
   */
  onOutsideClickClose?: () => void
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
    onOutsideClickClose,
  } = props

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const [isClosedByOutsideClick, setIsClosedByOutsideClick] = useState(false)

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
        setIsClosedByOutsideClick(true)
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

  useEffect(() => {
    /**
     *  Handle the case where the date picker is closed by clicking outside
     *  And reset the flag after handling
     */
    if (!isCalendarOpen && isClosedByOutsideClick) {
      onOutsideClickClose?.()
      setIsClosedByOutsideClick(false)
    }
  }, [
    isCalendarOpen,
    onOutsideClickClose,
    isClosedByOutsideClick,
    setIsClosedByOutsideClick,
  ])

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
      <>
        <CosDatePickerTrigger />
        <CosDatePickerMenu />
      </>
    </CosDatePickerContext.Provider>
  )
}
