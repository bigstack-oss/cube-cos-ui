import { ChangeEvent, useState } from 'react'
import { UpsertTriggersPayload } from '../upsertTriggersUtils'

type UseEditTriggersPayload = {
  isInitializing: boolean
  payload: UpsertTriggersPayload
  onAlertTypeSelect: (alertTypes: string[]) => void
  onSeveritySelect: (severities: string[]) => void
  onCategorySelect: (categories: string[]) => void
  onEventIdSelect: (eventIds: string[]) => void
  onEmailSelect: (emails: string[]) => void
  onSlackSelect: (slacks: string[]) => void
  onNameChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const useEditTriggersPayload = (): UseEditTriggersPayload => {
  const [isInitializing, setIsInitializing] = useState(true)

  const [payload, setPayload] = useState<UpsertTriggersPayload>({
    alertTypes: [],
    severities: [],
    categories: [],
    eventIds: [],
    emails: [],
    slacks: [],
    personalizedScripts: [],
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

  const onEmailSelect = (emails: string[]) => {
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

  const onPersonalizedScriptChange = () => {}

  const onNameChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
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

  return {
    isInitializing,
    payload,
    onAlertTypeSelect,
    onSeveritySelect,
    onCategorySelect,
    onEventIdSelect,
    onEmailSelect,
    onSlackSelect,
    onNameChange,
    onDescriptionChange,
  }
}
