import dayjs from 'dayjs'
import { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosDatePicker } from '../../../components/CosDatePicker/CosDatePicker'
import { DatePickerBox } from './DatePickerBox'
import { DatePicker } from './DatePicker'

const meta = {
  title: 'Molecules/Date Picker',
} satisfies Meta<typeof CosDatePicker>

export default meta

export const Gallery: StoryObj = {
  args: {},
  render: () => {
    return (
      <StoryLayout title="Date Picker">
        <StoryLayout.Section title="Date Picker">
          <DatePickerBox title="Master">
            <DatePicker defaultDates={{ start: undefined, end: undefined }} />
          </DatePickerBox>
          <DatePickerBox title="Selected">
            <DatePicker
              defaultDates={{
                start: dayjs('2025-04-15'),
                end: dayjs('2025-05-31'),
              }}
            />
          </DatePickerBox>
          <DatePickerBox title="Disabled">
            <DatePicker
              disabled={true}
              defaultDates={{
                start: undefined,
                end: undefined,
              }}
            />
          </DatePickerBox>
          <DatePickerBox title="Disabled (selected)">
            <DatePicker
              disabled={true}
              defaultDates={{
                start: dayjs('2025-04-15'),
                end: dayjs('2025-05-31'),
              }}
            />
          </DatePickerBox>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <DatePickerBox title="Master">
            <DatePicker
              defaultDates={{ start: undefined, end: undefined }}
              isLoading={true}
            />
          </DatePickerBox>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
