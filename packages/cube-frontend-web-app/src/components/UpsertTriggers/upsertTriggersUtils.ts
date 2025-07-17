import { isEmpty } from 'lodash'
import {
  GetPredefinedEventsSeveritiesEnum,
  GetPredefinedEventsTypesEnum,
  GetTriggerMaterialsResponseDataResponseNotificationsEmailsInner,
  GetTriggerMaterialsResponseDataResponseNotificationsSlacksInner,
  GetTriggerMaterialsResponseDataResponseScriptTypes,
} from '@cube-frontend/api'
import {
  EmailRecipientTableRow,
  SlackChannelTableRow,
} from './_components/SetResponse/SetResponse'

export enum UpsertTriggersStep {
  SelectEvents = 'selectEvents',
  SetResponse = 'setResponse',
  AddDescription = 'addDescription',
}

export type ScriptFile = {
  // Browsers obscure the full file path for security reasons,
  // so only the file name is exposed.
  fileName: string
  content: string
}

export type UpsertTriggersPayload = {
  alertTypes: GetPredefinedEventsTypesEnum[]
  severities: GetPredefinedEventsSeveritiesEnum[]
  categories: string[]
  eventIds: string[]
  emails: EmailRecipientTableRow[]
  slacks: SlackChannelTableRow[]
  script?: ScriptFile
  name: string
  description?: string
}

export type TriggerAttributeKeys =
  | 'alertTypes'
  | 'severities'
  | 'categories'
  | 'eventIds'

export type TriggerAttributes = {
  alertTypes: GetPredefinedEventsTypesEnum[]
  severities: GetPredefinedEventsSeveritiesEnum[]
  categories: string[]
  eventIds: string[]
}

export type TriggerResponses = {
  emails: GetTriggerMaterialsResponseDataResponseNotificationsEmailsInner[]
  slacks: GetTriggerMaterialsResponseDataResponseNotificationsSlacksInner[]
  scriptTypes: GetTriggerMaterialsResponseDataResponseScriptTypes | undefined
}

export const attributeLabelMap: Record<TriggerAttributeKeys, string> = {
  alertTypes: 'Alert Type',
  severities: 'Severity',
  categories: 'Category',
  eventIds: 'Event Id',
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
