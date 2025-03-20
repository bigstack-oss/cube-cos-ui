import { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { CosDatePicker } from '@cube-frontend/ui-library'

type FilterDatePickerProps = {
  isLoading: boolean
  selectedStartDate?: string
  selectedEndDate?: string
  onChange: (updates: Record<string, string | null>) => void
}

export const FilterDatePicker = (props: FilterDatePickerProps) => {
  const {
    isLoading,
    selectedStartDate,
    selectedEndDate,
    onChange: onDatePickerChange,
  } = props

  const [startDate, setStartDate] = useState<Dayjs | undefined>()

  const [endDate, setEndDate] = useState<Dayjs | undefined>()

  useEffect(() => {
    setStartDate(selectedStartDate ? dayjs(selectedStartDate) : undefined)
    setEndDate(selectedStartDate ? dayjs(selectedEndDate) : undefined)
  }, [selectedStartDate, selectedEndDate])

  const handleApplyClick = () => {
    if (!dayjs.isDayjs(startDate) || !dayjs.isDayjs(endDate)) return

    onDatePickerChange({
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
    })
  }

  const handleCancelClick = () => {
    setStartDate(undefined)
    setEndDate(undefined)

    onDatePickerChange({
      startDate: null,
      endDate: null,
    })
  }

  const handleOutsideClickClose = () => {
    if (!startDate) return

    if (startDate && !endDate) {
      setEndDate(startDate)
      onDatePickerChange({
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: startDate.format('YYYY-MM-DD'),
      })
    }

    if (startDate && endDate) {
      onDatePickerChange({
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
      })
    }
  }

  return (
    <CosDatePicker
      isLoading={isLoading}
      startDate={startDate}
      endDate={endDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      onApplyClick={handleApplyClick}
      onCancelClick={handleCancelClick}
      onOutsideClickClose={handleOutsideClickClose}
    />
  )
}
