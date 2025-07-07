export enum UpsertTriggersStep {
  SelectEvents = 'selectEvents',
  SetResponse = 'setResponse',
  AddDescription = 'addDescription',
}

export type ScriptFile = {
  name: string
  base64: string
}

export type UpsertTriggersPayload = {
  alertTypes: string[]
  severities: string[]
  categories: string[]
  eventIds: string[]
  emails: string[]
  slacks: string[]
  script?: ScriptFile
  name: string
  description?: string
}

export type TriggerAttributeKeys =
  | 'alertTypes'
  | 'severities'
  | 'categories'
  | 'eventIds'

export type TriggerAttributes = Record<TriggerAttributeKeys, string[]>

export const attributeLabelMap: Record<TriggerAttributeKeys, string> = {
  alertTypes: 'Alert Type',
  severities: 'Severity',
  categories: 'Category',
  eventIds: 'Event Id',
}
