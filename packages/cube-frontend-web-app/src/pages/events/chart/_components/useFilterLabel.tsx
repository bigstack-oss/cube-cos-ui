import { useTranslation } from 'react-i18next'
import { FilterKeysResponse } from './utils'

export const useFilterLabel = () => {
  const { t } = useTranslation()

  const filterLabelMapping = {
    categories: t('events.filter.categories'),
    severities: t('events.filter.severities'),
    names: t('events.filter.hosts'),
    ids: t('events.filter.instances'),
  } satisfies Record<FilterKeysResponse, string>

  const getFilterLabel = (key: FilterKeysResponse): string => {
    return filterLabelMapping[key]
  }

  return { getFilterLabel }
}
