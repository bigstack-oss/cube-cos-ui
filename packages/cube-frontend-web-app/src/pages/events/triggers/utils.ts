import { z } from 'zod'
import {
  CreateTriggerRequest,
  GetTriggerResponseData,
  UpdateTriggerRequest,
} from '@cube-frontend/api'
import { CosTableRow, DEFAULT_ITEMS_PER_PAGE } from '@cube-frontend/ui-library'
import { paginationQuerySchema } from '@cube-frontend/web-app/utils/pagination'
import { UpsertTriggersPayload } from '@cube-frontend/web-app/components/UpsertTriggers/upsertTriggersUtils'

export type TriggerRow = GetTriggerResponseData &
  CosTableRow & {
    isUpdating: boolean
  }

export const mapToTriggerTableRow = (
  trigger: GetTriggerResponseData,
): TriggerRow => ({
  ...trigger,
  /**
   * We use the trigger name as the row ID since it is unique.
   * This is a workaround for the fact that the API does not return an ID field.
   */
  id: trigger.name,
  isUpdating: false,
})

export const getTriggerResponse = (res: string[]): string => {
  const hasSlack = res.includes('slack')
  const hasEmail = res.includes('email')

  if (hasSlack && hasEmail) return 'Slack / Emails'
  if (hasSlack) return 'Slack'
  if (hasEmail) return 'Emails'

  return 'None'
}

enum TriggersParamKeyEnum {
  CurrentPage = 'page',
  ItemsPerPage = 'pageSize',
}

export type ListTriggersQuery = z.output<typeof paginationQuerySchema>

export const queryToSearchParams = (
  query: ListTriggersQuery,
): URLSearchParams => {
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
): ListTriggersQuery => {
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

export const payloadToUpdateRequest = (
  payload: UpsertTriggersPayload,
): UpdateTriggerRequest => ({
  description: payload.description ?? '',
  attributes: {
    alertTypes: payload.alertTypes,
    severities: payload.severities,
    categories: payload.categories,
    eventIds: payload.eventIds,
  },
  response: {
    script: {
      filePath: payload.script?.filePath ?? '',
      content: payload.script?.content ?? '',
      script: {
        filePath: payload.script?.filePath ?? '',
        content: payload.script?.content ?? '',
      },
    },
    emails: payload.emails.map((email) => email.address),
    slacks: payload.slacks.map((slack) => slack.url),
  },
})

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
    script: payload.script!,
    notifications: {
      emails: payload.emails.map((email) => email.address),
      slacks: payload.slacks.map((slack) => slack.url),
    },
  },
})
