import { z } from 'zod'
import { upperFirst } from 'lodash'
import {
  CreateTriggerRequest,
  GetTriggersResponseDataTriggersInner,
} from '@cube-frontend/api'
import { CosTableRow, DEFAULT_ITEMS_PER_PAGE } from '@cube-frontend/ui-library'
import { paginationQuerySchema } from '@cube-frontend/web-app/utils/pagination'
import { UpsertTriggersPayload } from '@cube-frontend/web-app/components/UpsertTriggers/upsertTriggersUtils'

export type TriggerRow = GetTriggersResponseDataTriggersInner & CosTableRow

export const mapToTriggerTableRow = (
  trigger: GetTriggersResponseDataTriggersInner,
): TriggerRow => ({
  ...trigger,
  /**
   * We use the trigger name as the row ID since it is unique.
   * This is a workaround for the fact that the API does not return an ID field.
   */
  id: trigger.name,
})

export const getTriggerResponse = (types: string[]): string => {
  if (types.length === 0) return 'None'
  return types.map((type) => upperFirst(type)).join(' / ')
}

enum TriggersParamKeyEnum {
  CurrentPage = 'page',
  ItemsPerPage = 'pageSize',
}

export type TriggersQuery = z.output<typeof paginationQuerySchema>

export const queryToSearchParams = (query: TriggersQuery): URLSearchParams => {
  const { currentPage, itemsPerPage } = query
  const nextSearchParams = new URLSearchParams()

  if (currentPage) {
    nextSearchParams.set(
      TriggersParamKeyEnum.CurrentPage,
      currentPage.toString(),
    )
  }

  if (itemsPerPage) {
    nextSearchParams.set(
      TriggersParamKeyEnum.ItemsPerPage,
      itemsPerPage.toString(),
    )
  }

  return nextSearchParams
}

export const searchParamsToQuery = (
  searchParams: URLSearchParams,
): TriggersQuery => {
  const currentPage = searchParams.get(TriggersParamKeyEnum.CurrentPage)
  const itemsPerPage = searchParams.get(TriggersParamKeyEnum.ItemsPerPage)

  const parsedQuery = paginationQuerySchema.safeParse({
    currentPage,
    itemsPerPage,
  }).data

  return {
    currentPage: parsedQuery?.currentPage ?? 1,
    itemsPerPage: parsedQuery?.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE,
  }
}

export const payloadToCreateRequest = (
  payload: UpsertTriggersPayload,
): CreateTriggerRequest => ({
  name: payload.name,
  description: payload.description ?? '',
  attribute: {
    alertTypes: payload.alertTypes,
    severities: payload.severities,
    categories: payload.categories,
    eventIds: payload.eventIds,
  },
  response: {
    // TODO: Align script request type better to API schema
    script: {
      filePath: payload.script!.fileName,
      content: payload.script!.content,
    },
    notifications: {
      emails: payload.emails.map((email) => email.address),
      slacks: payload.slacks.map((slack) => slack.url),
    },
  },
})
