import { useState, useEffect } from 'react'
import { Dayjs } from 'dayjs'
import { useUILibraryTranslation } from '../../i18n/useUILibraryTranslation'

/**
 * Changing the global dayjs locale doesn't affect existing dayjs instances.
 * Therefore, we have to synchronize the updated locale with the current i18n language.
 *
 * reference: https://day.js.org/docs/en/i18n/changing-locale
 */
export const useDayjsState = (initialFn: () => Dayjs) => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(initialFn)

  const { i18n } = useUILibraryTranslation()

  useEffect(() => {
    setCurrentMonth((d) => d.locale(i18n.language))
  }, [i18n.language])

  return [currentMonth, setCurrentMonth] as const
}
