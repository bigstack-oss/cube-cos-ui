import { CosDatePicker } from '@cube-frontend/ui-library'
import { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'

export type DatePickerFilterProps = {
  startDate?: Dayjs
  endDate?: Dayjs
  handleStartDateChange: (date?: Dayjs) => void
  handleEndDateChange: (date?: Dayjs) => void
}

export const DatePickerFilter = (props: DatePickerFilterProps) => {
  const { startDate, endDate, handleStartDateChange, handleEndDateChange } =
    props

  const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | undefined>(
    startDate,
  )
  const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | undefined>(
    endDate,
  )

  // Sync selected dates with props
  useEffect(() => {
    setSelectedStartDate(startDate)
    setSelectedEndDate(endDate)
  }, [endDate, startDate])

  const handleApply = () => {
    handleStartDateChange(selectedStartDate)
    handleEndDateChange(selectedEndDate)
  }

  const handleCancel = () => {
    setSelectedStartDate(startDate)
    setSelectedEndDate(endDate)
  }

  return (
    // TODO: we need a method to clear the date picker selection
    <CosDatePicker
      startDate={selectedStartDate}
      setStartDate={setSelectedStartDate}
      endDate={selectedEndDate}
      setEndDate={setSelectedEndDate}
      onApplyClick={handleApply}
      onCancelClick={handleCancel}
    />
  )
}
