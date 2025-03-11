import dayjs, { PluginFunc } from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const TZ_OFFSET_REGEX_TRAILING = /[+-]\d{2}:\d{2}$/

export const respectTz: PluginFunc = (
  _option: unknown,
  _dayjsClass: typeof dayjs.Dayjs,
  dayjsFactory: typeof dayjs,
): void => {
  dayjsFactory.respectTzOffset = (date: string): dayjs.Dayjs => {
    const match = date.match(TZ_OFFSET_REGEX_TRAILING)
    if (!match) {
      console.warn(`Missing timezone offset in date ${date}`)
      return dayjs(date)
    }
    return dayjs(date).utcOffset(match[0])
  }
}

declare module 'dayjs' {
  /**
   * By default, Dayjs interprets dates in the local timezone, even if the date
   * string includes a timezone offset.
   *
   * For example, on a system/browser set to UTC+8, calling
   * `dayjs('2025-03-05T12:34:56+03:00').format('HH:mm')` would return `17:34`
   * instead of `12:34`, since Dayjs converts the time to the local timezone.
   *
   * To keep the displayed time consistent with the timezone presented in the date
   * string, we need to adjust the time based on the provided offset.
   *
   * With `dayjs.respectTzOffset('2025-03-05T12:34:56+03:00').format('HH:mm')`,
   * the result would correctly be `12:34`.
   *
   * @param date A date string with a timezone offset, e.g., `2025-03-05T12:34:56+03:00`.
   * @returns A Dayjs instance with the time adjusted according to the given timezone offset.
   */
  export function respectTzOffset(date: string): Dayjs
}
