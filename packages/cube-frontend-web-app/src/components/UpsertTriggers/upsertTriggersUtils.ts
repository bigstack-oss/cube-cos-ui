import { GetTriggersResponseDataInnerAttributesInner } from '@cube-frontend/api'

export enum UpsertTriggersStep {
  SelectEvents = 'selectEvents',
  SetResponse = 'setResponse',
  AddDescription = 'addDescription',
}

export type UpsertTriggersPayload = {
  selectedEvents: GetTriggersResponseDataInnerAttributesInner[]
  setResponse: {
    notifications: string[]
    scripts: string[]
  }
  addedDescription: string
}
