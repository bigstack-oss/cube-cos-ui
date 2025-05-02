import {
  GetDataCentersResponseDataInnerAdditionalNodeLicenseStatus,
  GetLicenseAttachmentsResponseDataInner,
  GetLicensesResponseDataLicensesInnerExpiry,
} from '@cube-frontend/api'
import { toPluralizeDisplay } from '@cube-frontend/utils'
import { BatchLicenseAttachmentTableRow } from './LicenseActions/HardwareSerialNumberModal/LicenseAttachmentTable'

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
  unlicense: (count) => `${toPluralizeDisplay(count, 'host')} is unlicensed`,
  expired: (count) =>
    `${toPluralizeDisplay(count, 'host')} hosts license expired`,
}

export const getInvalidMessageList = (
  nodeLicenseStatus: GetDataCentersResponseDataInnerAdditionalNodeLicenseStatus,
) => {
  const errorMessageList: string[] = []

  for (const invalidType of invalidLicenseTypePriority) {
    const invalidCount = nodeLicenseStatus[invalidType]
    if (invalidCount > 0) {
      const invalidMessage = invalidLicenseMessageMap[invalidType](invalidCount)
      errorMessageList.push(invalidMessage)
    }
  }

  return errorMessageList
}

export const renderExpiredDays = (
  expiry: GetLicensesResponseDataLicensesInnerExpiry,
) => {
  const { days } = expiry

  if (days < 0) {
    return `${days} ago`
  }

  if (days === 0) {
    return 'Today'
  }

  return `in ${toPluralizeDisplay(days, 'day')}`
}

export const getLicenseExpiryStatus = (expiryDays: number) => {
  if (expiryDays < 0) {
    return 'expired'
  }

  if (expiryDays <= 30) {
    return 'expiring'
  }

  return 'valid'
}

export const isLicenseExpiring = (expiryDays: number) => {
  return expiryDays > 0 && expiryDays <= 30
}

/**
 * The API response does not include a license attachment id field,
 * so we need to create a unique id for each row in the table.
 *
 * 1 host can have multiple licenses, with 0 or 1 licenses per product.
 */
const getRowId = (
  licenseAttachment: GetLicenseAttachmentsResponseDataInner,
) => {
  const { product, hostname, serialNumber } = licenseAttachment
  return `${product}-${hostname}-${serialNumber}`
}

const mapToTableRow = (
  licenseAttachment: GetLicenseAttachmentsResponseDataInner,
): BatchLicenseAttachmentTableRow => {
  return {
    id: getRowId(licenseAttachment),
    ...licenseAttachment,
  }
}

export const mapToTableRows = (
  licenseAttachments: GetLicenseAttachmentsResponseDataInner[] | undefined,
): BatchLicenseAttachmentTableRow[] => {
  return licenseAttachments?.map(mapToTableRow) ?? []
}
