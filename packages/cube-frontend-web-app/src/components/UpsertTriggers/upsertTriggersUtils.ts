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
  filePath: string
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
