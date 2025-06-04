import { GetDataCentersResponseDataInnerAdditionalNodeLicenseStatus } from '@cube-frontend/api'
import { toPluralizeDisplay } from '@cube-frontend/utils'
import { isNil } from 'lodash'
import pluralize from 'pluralize'

export type InvalidLicenseMessageKey = Exclude<
  keyof GetDataCentersResponseDataInnerAdditionalNodeLicenseStatus,
  'valid'
>

/**
 * The most left item in the array has the highest priority
 */
export const invalidLicenseTypePriority = [
  'unlicense',
  'expired',
] as const satisfies InvalidLicenseMessageKey[]

export const invalidLicenseMessageMap: Record<
  InvalidLicenseMessageKey,
  (count: number) => string
> = {
  unlicense: (count) =>
    `${toPluralizeDisplay(count, 'host')} ${pluralize('is', count)} unlicensed.`,
  expired: (count) => `${count} host ${pluralize('license', count)} expired.`,
}

export const getInvalidMessageList = (
  nodeLicenseStatus:
    | GetDataCentersResponseDataInnerAdditionalNodeLicenseStatus
    | undefined,
) => {
  const errorMessageList: string[] = []
  if (isNil(nodeLicenseStatus)) {
    return errorMessageList
  }

  for (const invalidType of invalidLicenseTypePriority) {
    const invalidCount = nodeLicenseStatus[invalidType]
    if (invalidCount > 0) {
      const invalidMessage = invalidLicenseMessageMap[invalidType](invalidCount)
      errorMessageList.push(invalidMessage)
    }
  }

  return errorMessageList
}
