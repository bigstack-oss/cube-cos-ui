import dayjs, { PluginFunc } from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const TZ_OFFSET_REGEX_TRAILING = /[+-]\d{2}:\d{2}$/
const TZ_OFFSET_REGEX_FULL = /^[+-]\d{2}:\d{2}$/

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
    return addTzOffsetFn(date, match[0])
  }

  dayjsFactory.addTzOffset = (date: string, offset: string): dayjs.Dayjs => {
    if (!TZ_OFFSET_REGEX_FULL.test(offset)) {
      throw new Error(
        `Timezone offset must match ${TZ_OFFSET_REGEX_FULL.source} regular expression`,
      )
    }
    return addTzOffsetFn(date, offset)
  }
}

const addTzOffsetFn = (date: string, offset: string): dayjs.Dayjs => {
  const [hours, minutes] = offset
    .split(':')
    .map((string) => parseInt(string, 10))

  const totalMinutes = hours * 60 + Math.sign(hours) * minutes

  return dayjs(date).utcOffset(totalMinutes)
}

declare module 'dayjs' {
  /**
   * By default, Dayjs interprets dates using the local timezone, even if a
   * timezone offset is presented in the date string.
   *
   * For example, on a system/browser with UTC+8, `dayjs('2025-03-05T12:34:56+03:00').format('HH:mm')`
   * would return `17:34` instead of `12:34`.
   *
   * To ensure dates are displayed in COS's system timezone, we need to adjust the
   * time based on the provided timezone offset.
   *
   * @param date A date string with timezone offset. For example, `2025-03-05T12:34:56+03:00`.
   *
   * @returns A Dayjs instance with the time adjusted according to the provided
   * timezone offset.
   */
  export function respectTzOffset(date: string): Dayjs
  /**
   * @param offset For example, `-03:30`, `+08:00`.
   * @returns A Dayjs instance with the time adjusted according to the provided
   * timezone offset.
   */
  export function addTzOffset(date: string, offset: string): Dayjs
}
