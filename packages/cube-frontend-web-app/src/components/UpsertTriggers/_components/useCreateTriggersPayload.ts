import { useState } from 'react'
import { GetTriggersResponseDataInnerAttributesInner } from '@cube-frontend/api'
import { UpsertTriggersPayload } from '../upsertTriggersUtils'

type UseCreateTriggersPayload = {
  payload: UpsertTriggersPayload
  onEventsChange: (
    events: GetTriggersResponseDataInnerAttributesInner[],
  ) => void
  onResponseNotificationChange: () => void
  onResponseScriptChange: () => void
  onDescriptionChange: (description: string) => void
}

export const useCreateTriggersPayload = (): UseCreateTriggersPayload => {
  const [payload, setPayload] = useState<UpsertTriggersPayload>(() => ({
    selectedEvents: [],
    setResponse: {
      notifications: [],
      scripts: [],
    },
    addedDescription: '',
  }))

  const onEventsChange = (
    events: GetTriggersResponseDataInnerAttributesInner[],
  ) => {
    setPayload((prev) => ({
      ...prev,
      events,
    }))
  }

  const onResponseNotificationChange = () => {}

  const onResponseScriptChange = () => {}

  const onDescriptionChange = (description: string) => {
    setPayload((prev) => ({
      ...prev,
      description,
    }))
  }

  return {
    payload,
    onEventsChange,
    onResponseNotificationChange,
    onResponseScriptChange,
    onDescriptionChange,
  }
}
