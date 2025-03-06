import { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosDatePicker } from '../../../components/CosDatePicker/CosDatePicker'
import { useState } from 'react'
import { DatePickerBox } from './DatePickerBox'

const meta = {
  title: 'Molecules/Date Picker',
} satisfies Meta<typeof CosDatePicker>

export default meta

export const Gallery: StoryObj = {
  args: {},
  render: function Render() {
    const [startDate, setStartDate] = useState<Date>()

    const [endDate, setEndDate] = useState<Date>()

    const [startDateDefault, setStartDateDefault] = useState<Date | undefined>(
      new Date('2025-03-25'),
    )

    const [endDateDefault, setEndDateDefault] = useState<Date | undefined>(
      new Date('2025-03-31'),
    )

    const handleStartDate = (date?: Date) => setStartDate(date)

    const handleStartDateDefault = (date?: Date) => setStartDateDefault(date)

    const handleEndDate = (date?: Date) => setEndDate(date)

    const handleEndDateDefault = (date?: Date) => setEndDateDefault(date)

    const handleApply = () => {}

    const handleCancel = () => {}

    return (
      <StoryLayout title="Date Picker">
        <StoryLayout.Section title="Date Picker">
          <DatePickerBox title="Master">
            <CosDatePicker
              startDate={startDate}
              setStartDate={handleStartDate}
              endDate={endDate}
              setEndDate={handleEndDate}
              onApplyClick={handleApply}
              onCancelClick={handleCancel}
            />
          </DatePickerBox>
          <DatePickerBox title="Selected">
            <CosDatePicker
              startDate={startDateDefault}
              setStartDate={handleStartDateDefault}
              endDate={endDateDefault}
              setEndDate={handleEndDateDefault}
              onApplyClick={handleApply}
              onCancelClick={handleCancel}
            />
          </DatePickerBox>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <DatePickerBox title="Master">
            <CosDatePicker
              startDate={startDate}
              setStartDate={handleStartDate}
              endDate={endDate}
              setEndDate={handleEndDate}
              onApplyClick={handleApply}
              onCancelClick={handleCancel}
              isLoading={true}
            />
          </DatePickerBox>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
