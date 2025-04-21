import {
  ListTuningResponseDataTuningsInnerLimitationDefault,
  ListTuningSpecResponseDataInnerLimitation,
  TuningLimitationType,
} from '@cube-frontend/api'

type FormatLimitationOptions = {
  /**
   * @default false
   */
  showDefault?: boolean
}

export const formatLimitation = (
  limitation: ListTuningSpecResponseDataInnerLimitation,
  options: FormatLimitationOptions = {},
): string => {
  const formatFn = formatFnMap[limitation.type]
  if (!formatFn) {
    // Throwing a straightforward error (to help debug) since COS sometimes
    // returns unexpected limitation types.
    throw new Error(
      `Cannot find the format function for limitation type ${limitation.type}`,
    )
  }
  return formatFn(limitation, options)
}

type FormatFn = (
  limitation: ListTuningSpecResponseDataInnerLimitation,
  options: FormatLimitationOptions,
) => string

const formatStringLimitation: FormatFn = (limitation, options) => {
  // Rename `default` because it's a reserved word in TS.
  const { default: defaultValue, regex } = limitation
  const { showDefault = false } = options
  return formatEntries([
    {
      label: 'Default',
      value: showDefault ? defaultValue : undefined,
    },
    {
      label: 'Regex',
      value: regex,
    },
  ])
}

const formatNumberLimitation: FormatFn = (limitation, options) => {
  // Rename `default` because it's a reserved word in TS.
  const { default: defaultValue, min, max } = limitation
  const { showDefault = false } = options
  return formatEntries([
    {
      label: 'Default',
      value: showDefault ? defaultValue : undefined,
    },
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
  str: formatStringLimitation,
  int: formatNumberLimitation,
  uint: formatNumberLimitation,
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
