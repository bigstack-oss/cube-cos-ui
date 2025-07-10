import { ChangeEvent, useState } from 'react'
import {
  GetPredefinedEventsSeveritiesEnum,
  GetPredefinedEventsTypesEnum,
} from '@cube-frontend/api'
import {
  EmailRecipientTableRow,
  SlackChannelTableRow,
} from './SetResponse/SetResponse'
import { ScriptFile, UpsertTriggersPayload } from '../upsertTriggersUtils'

type UseCreateTriggersPayload = {
  payload: UpsertTriggersPayload
  onAlertTypeSelect: (alertTypes: GetPredefinedEventsTypesEnum[]) => void
  onSeveritySelect: (severities: GetPredefinedEventsSeveritiesEnum[]) => void
  onCategorySelect: (categories: string[]) => void
  onEventIdSelect: (eventIds: string[]) => void
  onEmailSelect: (emails: EmailRecipientTableRow[]) => void
  onSlackSelect: (slacks: SlackChannelTableRow[]) => void
  onScriptChange: (file: ScriptFile) => void
  onScriptRemove: () => void
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

  const onEmailSelect = (emails: EmailRecipientTableRow[]): void => {
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
