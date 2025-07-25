import { get } from 'lodash'
import en from './mockI18n_en.json'

export const mockI18n = (
  path: string,
  args?: Record<string, unknown>,
): string => {
  const raw = get(en, path)

  if (raw === undefined) {
    console.warn(`${path} is not a valid path`)
    return path
  } else if (typeof raw !== 'string') {
    console.warn(`${path} is not a string`)
    return path
  }

  if (!args) return raw

  let interpolated = raw
  Object.entries(args).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g')
    interpolated = interpolated.replace(regex, String(value))
  })

  return interpolated
}
