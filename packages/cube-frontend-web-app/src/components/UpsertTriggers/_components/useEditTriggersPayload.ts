import { ChangeEvent, useState } from 'react'
import {
  GetPredefinedEventsSeveritiesEnum,
  GetPredefinedEventsTypesEnum,
  GetTriggerResponseData,
} from '@cube-frontend/api'
import {
  EmailRecipientTableRow,
  SlackChannelTableRow,
} from './SetResponse/SetResponse'
import { ScriptFile, UpsertTriggersPayload } from '../upsertTriggersUtils'

type UseEditTriggersPayload = {
  isInitializing: boolean
  payload: UpsertTriggersPayload
  onAlertTypeSelect: (alertTypes: GetPredefinedEventsTypesEnum[]) => void
  onSeveritySelect: (severities: GetPredefinedEventsSeveritiesEnum[]) => void
  onCategorySelect: (categories: string[]) => void
  onEventIdSelect: (eventIds: string[]) => void
  onEmailSelect: (emails: EmailRecipientTableRow[]) => void
  onSlackSelect: (slacks: SlackChannelTableRow[]) => void
  onScriptChange: (file: ScriptFile) => void
  onScriptRemove: () => void
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  onDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onEventsReset: () => void
  onResponseReset: () => void
}

const initializePayload = (
  initialData: GetTriggerResponseData,
): UpsertTriggersPayload => {
  const { name, description, attributes, response } = initialData
  return {
    name,
    description,
    alertTypes: attributes.alertTypes as GetPredefinedEventsTypesEnum[],
    severities: attributes.severities as GetPredefinedEventsSeveritiesEnum[],
    categories: attributes.categories,
    eventIds: attributes.eventIds,
    emails: response.emails.map((email) => ({
      ...email,
      id: email.address,
    })),
    slacks: response.slacks.map((slack) => ({
      ...slack,
      id: slack.url,
    })),
    script: {
      filePath: 'fake.path',
      content: '123',
    },
  }
}

export const useEditTriggersPayload = (
  initialData: GetTriggerResponseData,
): UseEditTriggersPayload => {
  const [isInitializing, setIsInitializing] = useState(true)

  const [payload, setPayload] = useState<UpsertTriggersPayload>(() =>
    initializePayload(initialData),
  )

  const onAlertTypeSelect = (
    alertTypes: GetPredefinedEventsTypesEnum[],
  ): void => {
    setPayload((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        alertTypes,
      }
    })
  }

  const onSeveritySelect = (
    severities: GetPredefinedEventsSeveritiesEnum[],
  ): void => {
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

  const onEmailSelect = (emails: EmailRecipientTableRow[]) => {
    setPayload((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        emails,
      }
    })
  }

  const onSlackSelect = (slacks: SlackChannelTableRow[]): void => {
    setPayload((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        slacks,
      }
    })
  }

  const onScriptChange = (file: ScriptFile) => {
    setPayload((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        script: file,
      }
    })
  }

  const onScriptRemove = () => {
    setPayload((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        script: undefined,
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
    isInitializing,
    payload,
    onAlertTypeSelect,
    onSeveritySelect,
    onCategorySelect,
    onEventIdSelect,
    onEmailSelect,
    onSlackSelect,
    onScriptChange,
    onScriptRemove,
    onNameChange,
    onDescriptionChange,
    onEventsReset,
    onResponseReset,
  }
}
