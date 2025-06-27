import { ChangeEvent, useState } from 'react'
import { UpsertTriggersPayload } from '../upsertTriggersUtils'

type UseCreateTriggersPayload = {
  payload: UpsertTriggersPayload
  onEmailSelect: (emails: string[]) => void
  onSlackSelect: (slacks: string[]) => void
  onNameChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const useCreateTriggersPayload = (): UseCreateTriggersPayload => {
  const [payload, setPayload] = useState<UpsertTriggersPayload>({
    events: [],
    emails: [],
    slacks: [],
    personalizedScripts: [],
    name: '',
    description: '',
  })

  const onAttributeChange = (): void => {}

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
    payload,
    onEmailSelect,
    onSlackSelect,
    onNameChange,
    onDescriptionChange,
  }
}
