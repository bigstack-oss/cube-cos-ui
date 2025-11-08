import { z } from 'zod'
import pluralize from 'pluralize'
import {
  DataCenterAdditionalNodeLicenseStatus,
  GetLicenseAttachmentsResponseDataInner,
  GetLicensesProductsEnum,
  GetLicensesResponseDataLicensesInnerExpiry,
  GetLicensesTypesEnum,
  ListLicenseCurrentStatus,
} from '@cube-frontend/api'
import { toPluralizeDisplay } from '@cube-frontend/utils'
import { DEFAULT_ITEMS_PER_PAGE } from '@cube-frontend/ui-library'
import { paginationQuerySchema } from '@cube-frontend/web-app/utils/pagination'
import { BatchLicenseAttachmentTableRow } from './LicenseActions/HardwareSerialNumberModal/LicenseAttachmentTable'
import { TFunction } from 'i18next'

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

export const invalidLicenseMessageMap: Record<
  InvalidLicenseMessageKey,
  (count: number) => string
> = {
  unlicense: (count) => `${toPluralizeDisplay(count, 'host')} is unlicensed`,
  expired: (count) => `${count} host ${pluralize('license', count)} expired`,
}

export const getInvalidMessageList = (
  nodeLicenseStatus: DataCenterAdditionalNodeLicenseStatus,
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
  t: TFunction,
) => {
  const { days } = expiry

  if (days < 0) {
    return t('maintenance.license.daysAgo', { count: Math.abs(days) })
  }

  if (days === 0) {
    return t('maintenance.license.today')
  }

  return t('maintenance.license.inDays', { count: days })
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

enum LicenseParamKeyEnum {
  Keyword = 'keyword',
  Products = 'products',
  Statuses = 'statuses',
  Types = 'types',
  CurrentPage = 'page',
  ItemsPerPage = 'pageSize',
}

const licenseListQuerySchema = paginationQuerySchema.extend({
  keyword: z
    .string()
    .nullable()
    .transform((value) => {
      return value ?? ''
    }),
  products: z
    .enum(Object.values(GetLicensesProductsEnum) as [string, ...string[]])
    .array()
    .nullable()
    .transform((array) => {
      return (array ?? []) as GetLicensesProductsEnum[]
    }),
  statuses: z
    .enum(Object.values(ListLicenseCurrentStatus) as [string, ...string[]])
    .array()
    .nullable()
    .transform((array) => {
      return (array ?? []) as ListLicenseCurrentStatus[]
    }),
  types: z
    .enum(Object.values(GetLicensesTypesEnum) as [string, ...string[]])
    .array()
    .nullable()
    .transform((array) => {
      return (array ?? []) as GetLicensesTypesEnum[]
    }),
})

export type LicenseListQuery = z.output<typeof licenseListQuerySchema>

export const queryToSearchParams = (
  query: LicenseListQuery,
): URLSearchParams => {
  const { keyword, products, statuses, types, currentPage, itemsPerPage } =
    query
  const nextSearchParams = new URLSearchParams()

  if (keyword) {
    nextSearchParams.set(LicenseParamKeyEnum.Keyword, keyword)
  }

  products.forEach((product) => {
    nextSearchParams.append(LicenseParamKeyEnum.Products, product)
  })

  statuses.forEach((status) => {
    nextSearchParams.append(LicenseParamKeyEnum.Statuses, status)
  })

  types.forEach((type) => {
    nextSearchParams.append(LicenseParamKeyEnum.Types, type)
  })

  if (currentPage) {
    nextSearchParams.set(
      LicenseParamKeyEnum.CurrentPage,
      currentPage.toString(),
    )
  }

  if (itemsPerPage) {
    nextSearchParams.set(
      LicenseParamKeyEnum.ItemsPerPage,
      itemsPerPage.toString(),
    )
  }

  return nextSearchParams
}

export const searchParamsToQuery = (
  searchParams: URLSearchParams,
): LicenseListQuery => {
  const keyword = searchParams.get(LicenseParamKeyEnum.Keyword)
  const products = searchParams.getAll(LicenseParamKeyEnum.Products)
  const statuses = searchParams.getAll(LicenseParamKeyEnum.Statuses)
  const types = searchParams.getAll(LicenseParamKeyEnum.Types)
  const currentPage = searchParams.get(LicenseParamKeyEnum.CurrentPage)
  const itemsPerPage = searchParams.get(LicenseParamKeyEnum.ItemsPerPage)

  const parsedQuery = licenseListQuerySchema.safeParse({
    keyword,
    products,
    statuses,
    types,
    currentPage,
    itemsPerPage,
  }).data

  return {
    keyword: parsedQuery?.keyword ?? '',
    products: parsedQuery?.products ?? [],
    statuses: parsedQuery?.statuses ?? [],
    types: (parsedQuery?.types as GetLicensesTypesEnum[]) ?? [],
    currentPage: parsedQuery?.currentPage ?? 1,
    itemsPerPage: parsedQuery?.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE,
  }
}
