// import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import dayjs, { Dayjs } from 'dayjs'
import ChevronLeft from '../CosIcon/monochrome/chevron_left.svg?react'
import ChevronRight from '../CosIcon/monochrome/chevron_right.svg?react'
import { getDateButtonStatus } from './utils'
import { dayButton } from './styles'

type CosDatePickerCalendarProps = {
  currentMonth: Dayjs
  onPreviousMonth: () => void
  onNextMonth: () => void
  onSelectDay: (day: Dayjs) => void
  startDate?: Dayjs
  endDate?: Dayjs
}

export const CosDatePickerCalendar = (props: CosDatePickerCalendarProps) => {
  const {
    currentMonth,
    onPreviousMonth,
    onNextMonth,
    onSelectDay,
    startDate,
    endDate,
  } = props

  const monthStart = new Date(currentMonth.year(), currentMonth.month(), 1)

  const monthEnd = new Date(currentMonth.year(), currentMonth.month() + 1, 0)

  const firstDate = new Date(monthStart)

  const lastDate = new Date(monthEnd)

  firstDate.setDate(firstDate.getDate() - firstDate.getDay())

  lastDate.setDate(lastDate.getDate() + (6 - lastDate.getDay()))

  const weeks: Date[][] = []

  let days: Date[] = []

  const day = new Date(firstDate)

  while (day <= lastDate) {
    for (let i = 0; i < 7; i++) {
      days.push(new Date(day))
      day.setDate(day.getDate() + 1)
    }
    weeks.push(days)
    days = []
  }

  return (
    <div className="flex flex-col gap-[15px]">
      <div className="flex items-center justify-between">
        <div onClick={onPreviousMonth} className="cursor-pointer p-[10px]">
          <ChevronLeft className="icon-md text-functional-text" />
        </div>
        <div className="secondary-h5">
          {dayjs(currentMonth).format('MMMM YYYY')}
        </div>
        <div onClick={onNextMonth} className="cursor-pointer p-[10px]">
          <ChevronRight className="icon-md text-functional-text" />
        </div>
      </div>
      <div className="grid grid-cols-7 items-center text-center">
        <div className="primary-body3 w-10 text-functional-text-light">S</div>
        <div className="primary-body3 w-10 text-functional-text-light">M</div>
        <div className="primary-body3 w-10 text-functional-text-light">T</div>
        <div className="primary-body3 w-10 text-functional-text-light">W</div>
        <div className="primary-body3 w-10 text-functional-text-light">T</div>
        <div className="primary-body3 w-10 text-functional-text-light">F</div>
        <div className="primary-body3 w-10 text-functional-text-light">S</div>
      </div>
      <div className="flex flex-col gap-y-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-0">
            {week.map((day, dayIndex) => (
              <button
                key={dayIndex}
                onClick={() => onSelectDay(dayjs(day))}
                disabled={false}
                className={twMerge(
                  dayButton({
                    status: getDateButtonStatus(dayjs(day), startDate, endDate),
                    // TODO: apply disabled logic
                    disabled: false,
                  }),
                )}
              >
                {day.getDate()}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
