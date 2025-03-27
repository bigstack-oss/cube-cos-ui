import {
  ListTuningResponseDataTuningsInnerLimitationDefault,
  ListTuningSpecResponseDataInnerLimitation,
  TuningLimitationType,
} from '@cube-frontend/api'

export const formatLimitation = (
  limitation: ListTuningSpecResponseDataInnerLimitation,
): string => {
  const formatFn = formatFnMap[limitation.type]
  return formatFn(limitation)
}

type FormatFn = (
  limitation: ListTuningSpecResponseDataInnerLimitation,
) => string

const formatStringLimitation: FormatFn = (limitation) => {
  const { regex } = limitation
  return formatEntries([
    {
      label: 'Regex',
      value: regex,
    },
  ])
}

const formatNumberLimitation: FormatFn = (limitation) => {
  const { min, max } = limitation
  return formatEntries([
    {
      label: 'Min',
      value: min,
    },
    {
      label: 'Max',
      value: max,
    },
  ])
}

const formatFnMap: Record<TuningLimitationType, FormatFn> = {
  string: formatStringLimitation,
  int: formatNumberLimitation,
  float: formatNumberLimitation,
  bool: () => 'Boolean',
}

type Entry = {
  label: string
  value: ListTuningResponseDataTuningsInnerLimitationDefault | undefined
}

const formatEntries = (entries: Entry[]): string => {
  const visibleEntries = entries.filter((entry) => entry.value !== undefined)
  if (!visibleEntries.length) {
    return ''
  }

  const labels = visibleEntries.map((entry) => entry.label).join(', ')
  const values = visibleEntries
    .map((entry) => entry.value!.toString())
    .join(', ')

  return `[${labels}] = [${values}]`
}
