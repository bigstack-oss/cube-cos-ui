import { useTranslation } from 'react-i18next'
import { isNil } from 'lodash'
import { DataCenterAdditionalNodeLicenseStatus } from '@cube-frontend/api'

export type InvalidLicenseMessageKey = Exclude<
  keyof DataCenterAdditionalNodeLicenseStatus,
  'valid'
>

/**
 * The most left item in the array has the highest priority
 */
export const invalidLicenseTypePriority = [
  'unlicense',
  'expired',
] as const satisfies InvalidLicenseMessageKey[]

export const useInvalidMessageList = (
  nodeLicenseStatus: DataCenterAdditionalNodeLicenseStatus | undefined,
) => {
  const { t } = useTranslation()

  const invalidLicenseMessageMap: Record<
    InvalidLicenseMessageKey,
    (count: number) => string
  > = {
    unlicense: (count) =>
      t('maintenance.license.nagging.unlicenseMessage', { count }),
    expired: (count) =>
      t('maintenance.license.nagging.expiredMessage', { count }),
  }

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
