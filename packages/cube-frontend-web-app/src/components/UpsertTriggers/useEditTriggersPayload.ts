import { ChangeEvent, useEffect, useState } from 'react'
import {
  GetPredefinedEventsCategoriesEnum,
  GetPredefinedEventsIdsEnum,
  GetPredefinedEventsSeveritiesEnum,
  GetPredefinedEventsTypesEnum,
  GetTriggerMaterialsResponseDataAttribute,
  Trigger,
  TriggerResponse,
  TriggerResponseScript,
} from '@cube-frontend/api'
import {
  EmailRecipientTableRow,
  SlackChannelTableRow,
} from './_components/SetResponse/SetResponse'
import { filterEnumValues, UpsertTriggersPayload } from './upsertTriggersUtils'

type UseEditTriggersPayload = {
  payload: UpsertTriggersPayload
  onAlertTypeSelect: (alertTypes: GetPredefinedEventsTypesEnum[]) => void
  onSeveritySelect: (severities: GetPredefinedEventsSeveritiesEnum[]) => void
  onCategorySelect: (categories: GetPredefinedEventsCategoriesEnum[]) => void
  onEventIdSelect: (eventIds: GetPredefinedEventsIdsEnum[]) => void
  onEmailSelect: (emails: EmailRecipientTableRow[]) => void
  onSlackSelect: (slacks: SlackChannelTableRow[]) => void
  onScriptChange: (file: TriggerResponseScript) => void
  onScriptRemove: () => void
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  onDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onEventsReset: () => void
  onResponseReset: () => void
}

const getInitialAttribute = (
  attribute: GetTriggerMaterialsResponseDataAttribute,
): Pick<
  UpsertTriggersPayload,
  'alertTypes' | 'categories' | 'severities' | 'eventIds'
> => {
  const alertTypes = filterEnumValues(
    attribute.alertTypes,
    GetPredefinedEventsTypesEnum,
  )

  const severities = filterEnumValues(
    attribute.severities,
    GetPredefinedEventsSeveritiesEnum,
  )

  const categories = filterEnumValues(
    attribute.categories,
    GetPredefinedEventsCategoriesEnum,
  )

  const eventIds = filterEnumValues(
    attribute.eventIds,
    GetPredefinedEventsIdsEnum,
  )

  return { alertTypes, severities, categories, eventIds }
}

const getInitialResponse = (
  response: TriggerResponse,
): Pick<UpsertTriggersPayload, 'emails' | 'slacks' | 'script'> => {
  const { emails: rawEmails, slacks: rawSlacks, script: rawScript } = response

  const emails = rawEmails.map((email) => ({
    ...email,
    id: email.address,
  }))

  const slacks = rawSlacks.map((slack) => ({
    ...slack,
    id: slack.url,
  }))

  const script = {
    ...rawScript,
    content: btoa(rawScript.content),
  }

  return { emails, slacks, script }
}

const getInitialPayload = (initialData: Trigger): UpsertTriggersPayload => {
  const {
    name,
    description,
    attribute: rawAttribute,
    response: rawResponse,
  } = initialData

  const { alertTypes, severities, categories, eventIds } =
    getInitialAttribute(rawAttribute)

  const { emails, slacks, script } = getInitialResponse(rawResponse)

  return {
    name,
    description,
    alertTypes,
    severities,
    categories,
    eventIds,
    emails,
    slacks,
    script,
  }
}

export const useEditTriggersPayload = (
  initialData: Trigger | undefined,
): UseEditTriggersPayload | undefined => {
  const [payload, setPayload] = useState<UpsertTriggersPayload>()

  useEffect(() => {
    if (initialData) {
      setPayload(() => getInitialPayload(initialData))
    }
  }, [initialData])

  if (!initialData || !payload) {
    return undefined
  }

  const updatePayload = (
    updateFn: (prev: UpsertTriggersPayload) => UpsertTriggersPayload,
  ) => {
    setPayload((prev) => {
      if (!prev) return prev
      return updateFn(prev)
    })
  }

  const onAlertTypeSelect = (
    alertTypes: GetPredefinedEventsTypesEnum[],
  ): void => {
    updatePayload((prev) => ({ ...prev, alertTypes }))
  }

  const onSeveritySelect = (
    severities: GetPredefinedEventsSeveritiesEnum[],
  ): void => {
    updatePayload((prev) => ({ ...prev, severities }))
  }

  const onCategorySelect = (
    categories: GetPredefinedEventsCategoriesEnum[],
  ): void => {
    updatePayload((prev) => ({ ...prev, categories }))
  }

  const onEventIdSelect = (eventIds: GetPredefinedEventsIdsEnum[]): void => {
    updatePayload((prev) => ({ ...prev, eventIds }))
  }

  const onEmailSelect = (emails: EmailRecipientTableRow[]) => {
    updatePayload((prev) => ({ ...prev, emails }))
  }

  const onSlackSelect = (slacks: SlackChannelTableRow[]): void => {
    updatePayload((prev) => ({ ...prev, slacks }))
  }

  const onScriptChange = (file: TriggerResponseScript) => {
    updatePayload((prev) => ({ ...prev, script: file }))
  }

  const onScriptRemove = () => {
    updatePayload((prev) => ({ ...prev, script: undefined }))
  }

  const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    updatePayload((prev) => ({ ...prev, name: e.target.value }))
  }

  const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    updatePayload((prev) => ({ ...prev, description: e.target.value }))
  }

  const onEventsReset = (): void => {
    setPayload((prev) => {
      if (!prev || !initialData) return prev

      const { alertTypes, severities, categories, eventIds } =
        getInitialAttribute(initialData.attribute)

      return {
        ...prev,
        alertTypes,
        severities,
        categories,
        eventIds,
      }
    })
  }

  const onResponseReset = (): void => {
    setPayload((prev) => {
      if (!prev || !initialData) return prev

      const { emails, slacks, script } = getInitialResponse(
        initialData.response,
      )

      return {
        ...prev,
        emails,
        slacks,
        script,
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
