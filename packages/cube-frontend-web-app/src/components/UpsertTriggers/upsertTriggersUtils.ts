import { isEmpty } from 'lodash'
import {
  GetPredefinedEventsCategoriesEnum,
  GetPredefinedEventsIdsEnum,
  GetPredefinedEventsSeveritiesEnum,
  GetPredefinedEventsTypesEnum,
  TriggerResponseScript,
} from '@cube-frontend/api'
import {
  EmailRecipientTableRow,
  SlackChannelTableRow,
} from './_components/SetResponse/SetResponse'
import { useTranslation } from 'react-i18next'

export enum UpsertTriggersStep {
  SelectEvents = 'selectEvents',
  SetResponse = 'setResponse',
  AddDescription = 'addDescription',
}

export type UpsertTriggersPayload = {
  alertTypes: GetPredefinedEventsTypesEnum[]
  severities: GetPredefinedEventsSeveritiesEnum[]
  categories: GetPredefinedEventsCategoriesEnum[]
  eventIds: GetPredefinedEventsIdsEnum[]
  emails: EmailRecipientTableRow[]
  slacks: SlackChannelTableRow[]
  script?: TriggerResponseScript
  name: string
  description: string
}

export type TriggerAttributeKeys =
  | 'alertTypes'
  | 'severities'
  | 'categories'
  | 'eventIds'

export type TriggerAttribute = {
  alertTypes: GetPredefinedEventsTypesEnum[]
  severities: GetPredefinedEventsSeveritiesEnum[]
  categories: GetPredefinedEventsCategoriesEnum[]
  eventIds: GetPredefinedEventsIdsEnum[]
}

export const attributeLabelMap: Record<TriggerAttributeKeys, string> = {
  alertTypes: 'Alert Type',
  severities: 'Severity',
  categories: 'Category',
  eventIds: 'Event Id',
}

export const useAttributeSelectAllLabelMap = (): Record<
  TriggerAttributeKeys,
  string
> => {
  const { t } = useTranslation()

  const attributeLabelMap: Record<TriggerAttributeKeys, string> = {
    alertTypes: t('events.triggers.upsert.addAttributes.allAlertTypes'),
    severities: t('events.triggers.upsert.addAttributes.allSeverities'),
    categories: t('events.triggers.upsert.addAttributes.allCategories'),
    eventIds: t('events.triggers.upsert.addAttributes.allEventIds'),
  }

  return attributeLabelMap
}

export const useAttributeLabelMap = (): Record<
  TriggerAttributeKeys,
  string
> => {
  const { t } = useTranslation()

  const attributeLabelMap: Record<TriggerAttributeKeys, string> = {
    alertTypes: t('events.triggers.upsert.addAttributes.alertType'),
    severities: t('events.triggers.upsert.addAttributes.severity'),
    categories: t('events.triggers.upsert.addAttributes.category'),
    eventIds: t('events.triggers.upsert.addAttributes.eventId'),
  }

  return attributeLabelMap
}

export const useAlertTypeLabelMap = (): Record<
  GetPredefinedEventsTypesEnum,
  string
> => {
  const { t } = useTranslation()

  const eventTypeLabelMap: Record<GetPredefinedEventsTypesEnum, string> = {
    host: t('events.triggers.upsert.addAttributes.host'),
    instance: t('events.triggers.upsert.addAttributes.instance'),
    system: t('events.triggers.upsert.addAttributes.system'),
  }

  return eventTypeLabelMap
}
export const isEventsValid = ({
  alertTypes,
  severities,
  categories,
  eventIds,
}: UpsertTriggersPayload): boolean => {
  return !(
    isEmpty(alertTypes) &&
    isEmpty(severities) &&
    isEmpty(categories) &&
    isEmpty(eventIds)
  )
}

export const isResponseValid = ({
  emails,
  slacks,
  script,
}: UpsertTriggersPayload): boolean => {
  return !isEmpty(emails) || !isEmpty(slacks) || !!script
}

export const shouldRedirectToListPage = (
  step: UpsertTriggersStep,
  payload: UpsertTriggersPayload,
): boolean => {
  if (step === 'setResponse' && !isEventsValid(payload)) {
    return true
  }
  if (step === 'addDescription' && !isResponseValid(payload)) {
    return true
  }
  return false
}

export const filterEnumValues = <T extends string>(
  rawValues: string[] | undefined,
  enumObject: Record<string, T>,
): T[] => {
  const enumSet = new Set(Object.values(enumObject))
  return (rawValues ?? []).filter((value): value is T =>
    enumSet.has(value as T),
  )
}
