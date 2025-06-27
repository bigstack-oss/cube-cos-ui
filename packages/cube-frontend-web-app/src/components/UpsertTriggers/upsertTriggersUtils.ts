import { GetTriggersResponseDataInnerAttributesInner } from '@cube-frontend/api'

export enum UpsertTriggersStep {
  SelectEvents = 'selectEvents',
  SetResponse = 'setResponse',
  AddDescription = 'addDescription',
}

export type UpsertTriggersPayload = {
  events: GetTriggersResponseDataInnerAttributesInner[]
  emails: string[]
  slacks: string[]
  personalizedScripts: string[]
  name: string
  description?: string
}
