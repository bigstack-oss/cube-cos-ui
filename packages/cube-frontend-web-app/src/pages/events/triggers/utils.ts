import { z } from 'zod'
import { upperFirst } from 'lodash'
import {
  Trigger,
  CreateTriggerRequest,
  UpdateTriggerRequest,
  TriggerResponseTypesEnum,
} from '@cube-frontend/api'
import { CosTableRow, DEFAULT_ITEMS_PER_PAGE } from '@cube-frontend/ui-library'
import { paginationQuerySchema } from '@cube-frontend/web-app/utils/pagination'
import { UpsertTriggersPayload } from '@cube-frontend/web-app/components/UpsertTriggers/upsertTriggersUtils'
import { TFunction } from 'i18next'

export type TriggerRow = Trigger & CosTableRow & { isProcessing: boolean }

export const mapToTriggerTableRow = (trigger: Trigger): TriggerRow => ({
  ...trigger,
  /**
   * We use the trigger name as the row ID since it is unique.
   * This is a workaround for the fact that the API does not return an ID field.
   */
  id: trigger.name,
  isProcessing: trigger.status?.current !== 'ok' || trigger.status.isProcessing,
})

export const getTriggerResponse = (
  types: TriggerResponseTypesEnum[],
  t: TFunction,
): string => {
  const responseKeyMap: Record<TriggerResponseTypesEnum, string> = {
    email: t('events.triggers.response.email'),
    slack: t('events.triggers.response.slack'),
    script: t('events.triggers.response.script'),
  }

  if (types.length === 0) return t('events.triggers.response.none')
  return types.map((type) => upperFirst(responseKeyMap[type])).join(' / ')
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
    script: payload.script ?? { name: '', content: '' },
    emails: payload.emails.map((email) => email.address),
    slacks: payload.slacks.map((slack) => slack.url),
  },
})

export const payloadToUpdateRequest = (
  payload: UpsertTriggersPayload,
): UpdateTriggerRequest => ({
  description: payload.description ?? '',
  attribute: {
    alertTypes: payload.alertTypes,
    severities: payload.severities,
    categories: payload.categories,
    eventIds: payload.eventIds,
  },
  response: {
    script: payload.script ?? { name: '', content: '' },
    emails: payload.emails.map((email) => email.address),
    slacks: payload.slacks.map((slack) => slack.url),
  },
})
