import { ChangeEvent, useState } from 'react'
import {
  GetPredefinedEventsTypesEnum,
  TriggerResponseScript,
} from '@cube-frontend/api'
import {
  EmailRecipientTableRow,
  SlackChannelTableRow,
} from './_components/SetResponse/SetResponse'
import {
  EventCategory,
  EventId,
  EventSeverity,
  UpsertTriggersPayload,
} from './upsertTriggersUtils'

const getInitialPayload = (): UpsertTriggersPayload => {
  return {
    alertTypes: [],
    severities: [],
    categories: [],
    eventIds: [],
    emails: [],
    slacks: [],
    script: undefined,
    name: '',
    description: '',
  }
}

type UseCreateTriggersPayload = {
  payload: UpsertTriggersPayload
  onAlertTypeSelect: (alertTypes: GetPredefinedEventsTypesEnum[]) => void
  onSeveritySelect: (severities: EventSeverity[]) => void
  onCategorySelect: (categories: EventCategory[]) => void
  onEventIdSelect: (eventIds: EventId[]) => void
  onEmailSelect: (emails: EmailRecipientTableRow[]) => void
  onSlackSelect: (slacks: SlackChannelTableRow[]) => void
  onScriptChange: (file: TriggerResponseScript) => void
  onScriptRemove: () => void
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onEventsReset: () => void
  onResponseReset: () => void
}

export const useCreateTriggersPayload = (): UseCreateTriggersPayload => {
  const [payload, setPayload] =
    useState<UpsertTriggersPayload>(getInitialPayload)

  const onAlertTypeSelect = (
    alertTypes: GetPredefinedEventsTypesEnum[],
  ): void => {
    setPayload((prev) => ({
      ...prev,
      alertTypes,
    }))
  }

  const onSeveritySelect = (severities: EventSeverity[]): void => {
    setPayload((prev) => ({
      ...prev,
      severities,
    }))
  }

  const onCategorySelect = (categories: EventCategory[]): void => {
    setPayload((prev) => ({
      ...prev,
      categories,
    }))
  }

  const onEventIdSelect = (eventIds: EventId[]): void => {
    setPayload((prev) => ({
      ...prev,
      eventIds,
    }))
  }

  const onEmailSelect = (emails: EmailRecipientTableRow[]): void => {
    setPayload((prev) => ({
      ...prev,
      emails,
    }))
  }

  const onSlackSelect = (slacks: SlackChannelTableRow[]): void => {
    setPayload((prev) => ({
      ...prev,
      slacks,
    }))
  }

  const onScriptChange = (file: TriggerResponseScript) => {
    setPayload((prev) => ({
      ...prev,
      script: file,
    }))
  }

  const onScriptRemove = () => {
    setPayload((prev) => ({
      ...prev,
      script: undefined,
    }))
  }

  const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPayload((prev) => ({
      ...prev,
      name: e.target.value,
    }))
  }

  const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setPayload((prev) => ({
      ...prev,
      description: e.target.value,
    }))
  }

  const onEventsReset = (): void => {
    setPayload((prev) => ({
      ...prev,
      alertTypes: [],
      severities: [],
      categories: [],
      eventIds: [],
    }))
  }

  const onResponseReset = (): void => {
    setPayload((prev) => ({
      ...prev,
      emails: [],
      slacks: [],
      script: undefined,
    }))
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
