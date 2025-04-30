import { useContext, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
import ChevronLeft from '../CosIcon/monochrome/chevron_left.svg?react'
import ChevronRight from '../CosIcon/monochrome/chevron_right.svg?react'
import { computeCalendarWeeks, getDateButtonStatus } from './utils'
import { dayButton } from './styles'
import { CosDatePickerContext } from './context'

const weekTitles = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export const CosDatePickerCalendar = () => {
  const {
    now,
    currentMonth,
    onPreviousMonthClick,
    onNextMonthClick,
    onDateClick,
    displayDates,
  } = useContext(CosDatePickerContext)

  const { start, end } = displayDates

  const startDateOfCurrentMonth = currentMonth.startOf('month')

  const month = startDateOfCurrentMonth.month()

  const weeks = useMemo(
    () => computeCalendarWeeks(startDateOfCurrentMonth),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [month],
  )

  return (
    <div className="flex flex-col gap-[15px]">
      <div className="flex items-center justify-between">
        <div onClick={onPreviousMonthClick} className="cursor-pointer p-[10px]">
          <ChevronLeft className="icon-md text-functional-text" />
        </div>
        <div className="secondary-h5">
          {dayjs(currentMonth).format('MMMM YYYY')}
        </div>
        <div onClick={onNextMonthClick} className="cursor-pointer p-[10px]">
          <ChevronRight className="icon-md text-functional-text" />
        </div>
      </div>
      <div className="grid grid-cols-7 items-center text-center">
        {weekTitles.map((title, index) => (
          <div
            key={`${title}-${index}`}
            className="primary-body3 w-10 text-functional-text-light"
          >
            {title}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-0">
            {week.map((date, dayIndex) => (
              <button
                key={dayIndex}
                onClick={() => onDateClick(date)}
                disabled={false}
                className={twMerge(
                  dayButton({
                    status: getDateButtonStatus({
                      date,
                      now,
                      selectedStartDate: start,
                      selectedEndDate: end,
                    }),
                    // TODO: apply disabled logic
                    disabled: false,
                  }),
                )}
              >
                {date.date()}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
