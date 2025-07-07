import { ChangeEvent, useState } from 'react'
import { UpsertTriggersPayload } from '../upsertTriggersUtils'

type UseCreateTriggersPayload = {
  payload: UpsertTriggersPayload
  onAlertTypeSelect: (alertTypes: string[]) => void
  onSeveritySelect: (severities: string[]) => void
  onCategorySelect: (categories: string[]) => void
  onEventIdSelect: (eventIds: string[]) => void
  onEmailSelect: (emails: string[]) => void
  onSlackSelect: (slacks: string[]) => void
  onPersonalizedScriptSelect: (file: File) => void
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onEventsReset: () => void
  onResponseReset: () => void
}

export const useCreateTriggersPayload = (): UseCreateTriggersPayload => {
  const [payload, setPayload] = useState<UpsertTriggersPayload>({
    alertTypes: [],
    severities: [],
    categories: [],
    eventIds: [],
    emails: [],
    slacks: [],
    script: undefined,
    name: '',
    description: '',
  })

  const onAlertTypeSelect = (alertTypes: string[]): void => {
    setPayload((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        alertTypes,
      }
    })
  }

  const onSeveritySelect = (severities: string[]): void => {
    setPayload((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        severities,
      }
    })
  }

  const onCategorySelect = (categories: string[]): void => {
    setPayload((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        categories,
      }
    })
  }

  const onEventIdSelect = (eventIds: string[]): void => {
    setPayload((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        eventIds,
      }
    })
  }

  const onEmailSelect = (emails: string[]): void => {
    setPayload((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        emails,
      }
    })
  }

  const onSlackSelect = (slacks: string[]): void => {
    setPayload((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        slacks,
      }
    })
  }

  const onPersonalizedScriptSelect = (file: File) => {
    setPayload((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        script: file,
      }
    })
  }

  const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPayload((prev) => {
      if (!prev) {
        return prev
      }
      return {
        ...prev,
        name: e.target.value,
      }
    })
  }

  const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setPayload((prev) => {
      if (!prev) {
        return prev
      }
      return {
        ...prev,
        description: e.target.value,
      }
    })
  }

  const onEventsReset = (): void => {
    setPayload((prev) => {
      if (!prev) {
        return prev
      }
      return {
        ...prev,
        alertTypes: [],
        severities: [],
        categories: [],
        eventIds: [],
      }
    })
  }

  const onResponseReset = (): void => {
    setPayload((prev) => {
      if (!prev) {
        return prev
      }
      return {
        ...prev,
        emails: [],
        slacks: [],
        script: undefined,
      }
    })
  }

  return {
    payload,
    onAlertTypeSelect,
    onSeveritySelect,
    onCategorySelect,
    onEventIdSelect,
    onEmailSelect,
    onSlackSelect,
    onPersonalizedScriptSelect,
    onNameChange,
    onDescriptionChange,
    onEventsReset,
    onResponseReset,
  }
}
