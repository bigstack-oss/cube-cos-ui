import { lowerFirst, upperFirst } from 'lodash'

export type ChartType = 'proportion' | 'comparison'

export const removeQueryKeyPrefix = (
  chartType: ChartType,
  queryKey: string,
): string => {
  return lowerFirst(queryKey.replace(chartType, ''))
}

const dropdownFilterKeyMapping: Record<string, string> = {
  severities: 'severity',
  categories: 'category',
  ids: 'id',
  names: 'name',
}

type DropdownFilterValues = {
  dropdownFilterLabel: string
  queryKey: string
}

export const mapToDropdownFilterValues = (
  chartType: ChartType,
  key: string,
): DropdownFilterValues => {
  const dropdownFilterKey = dropdownFilterKeyMapping[key]

  if (!dropdownFilterKey) {
    console.warn('Not a valid filter key')
  }

  /**
   * The current implementation is not yet compatible with i18n.
   */
  const dropdownFilterLabel = upperFirst(dropdownFilterKey) ?? ''

  const queryKey = chartType + dropdownFilterLabel

  return { dropdownFilterLabel, queryKey }
}
