export enum UpsertTriggersStep {
  SelectEvents = 'selectEvents',
  SetResponse = 'setResponse',
  AddDescription = 'addDescription',
}

export type UpsertTriggersPayload = {
  alertTypes: string[]
  severities: string[]
  categories: string[]
  eventIds: string[]
  emails: string[]
  slacks: string[]
  personalizedScripts: string[]
  name: string
  description?: string
}
