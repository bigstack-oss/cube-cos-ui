import { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosDatePicker } from '../../../components/CosDatePicker/CosDatePicker'
import { useState } from 'react'
import { DatePickerBox } from './DatePickerBox'
import dayjs, { Dayjs } from 'dayjs'

const meta = {
  title: 'Molecules/Date Picker',
} satisfies Meta<typeof CosDatePicker>

export default meta

export const Gallery: StoryObj = {
  args: {},
  render: function Render() {
    /**
     * Demo dates (with no default value)
     */
    const [startDate, setStartDate] = useState<Dayjs | undefined>()

    const [endDate, setEndDate] = useState<Dayjs | undefined>()

    /**
     * Demo dates (with default value)
     */
    const [startDateDefault, setStartDateDefault] = useState<Dayjs | undefined>(
      dayjs('2025-03-25'),
    )

    const [endDateDefault, setEndDateDefault] = useState<Dayjs | undefined>(
      dayjs('2025-03-31'),
    )

    /**
     * Demo function to handle dates change (with no default value)
     */
    const handleStartDateChange = (date: Dayjs | undefined) =>
      setStartDate(date)

    const handleEndDateChange = (date: Dayjs | undefined) => setEndDate(date)

    /**
     * Demo function to handle dates change (with default value)
     */
    const handleStartDateDefaultChange = (date: Dayjs | undefined) =>
      setStartDateDefault(date)

    const handleEndDateDefaultChange = (date: Dayjs | undefined) =>
      setEndDateDefault(date)

    const handleApply = () => {}

    const handleCancel = () => {}

    return (
      <StoryLayout title="Date Picker">
        <StoryLayout.Section title="Date Picker">
          <DatePickerBox title="Master">
            <CosDatePicker
              startDate={startDate}
              setStartDate={handleStartDateChange}
              endDate={endDate}
              setEndDate={handleEndDateChange}
              onApplyClick={handleApply}
              onCancelClick={handleCancel}
            />
          </DatePickerBox>
          <DatePickerBox title="Selected">
            <CosDatePicker
              startDate={startDateDefault}
              setStartDate={handleStartDateDefaultChange}
              endDate={endDateDefault}
              setEndDate={handleEndDateDefaultChange}
              onApplyClick={handleApply}
              onCancelClick={handleCancel}
            />
          </DatePickerBox>
          <DatePickerBox title="Disabled">
            <CosDatePicker
              startDate={undefined}
              setStartDate={() => {}}
              endDate={undefined}
              setEndDate={() => {}}
              onApplyClick={handleApply}
              onCancelClick={handleCancel}
              disabled={true}
            />
          </DatePickerBox>
          <DatePickerBox title="Disabled (selected)">
            <CosDatePicker
              startDate={dayjs('2025-03-25')}
              setStartDate={() => {}}
              endDate={undefined}
              setEndDate={() => {}}
              onApplyClick={handleApply}
              onCancelClick={handleCancel}
              disabled={true}
            />
          </DatePickerBox>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <DatePickerBox title="Master">
            <CosDatePicker
              startDate={startDate}
              setStartDate={handleStartDateChange}
              endDate={endDate}
              setEndDate={handleEndDateChange}
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
