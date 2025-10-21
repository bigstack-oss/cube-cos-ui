import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Dayjs } from 'dayjs'

/**
 * Changing the global dayjs locale doesn't affect existing dayjs instances.
 * Therefore, we have to synchronize the updated locale with the current i18n language.
 *
 * reference: https://day.js.org/docs/en/i18n/changing-locale
 */
export const useDayjsState = (initialFn: () => Dayjs) => {
  const [date, setDate] = useState<Dayjs>(initialFn)

  const { i18n } = useTranslation()

  useEffect(() => {
    setDate((d) => d.locale(i18n.language))
  }, [i18n.language])

  return [date, setDate] as const
}
