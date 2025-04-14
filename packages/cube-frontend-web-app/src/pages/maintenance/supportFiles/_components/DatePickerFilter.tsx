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

  // Sync the selected dates with props,
  // since the user can clear the start and end dates from the parent component.
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
