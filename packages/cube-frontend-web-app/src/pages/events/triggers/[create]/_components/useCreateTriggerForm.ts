import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import {
  GetTriggerResponseData,
  GetTriggersResponseDataInnerAttributes,
} from '@cube-frontend/api'
import { isAllSelected, isRowSelected } from './utils'

type UseTriggerCreateFormOption = {
  trigger: GetTriggerResponseData | undefined
  isTriggerLoading: boolean
}

type UseTriggerCreateForm = {
  enabled: boolean
  attributes: GetTriggersResponseDataInnerAttributes[]
  selectedEmails: string[]
  selectedSlacks: string[]
  description: string
  handleEmailSelect: (id: string) => void
  handleEmailSelectAll: () => void
  handleSlackSelect: (id: string) => void
  handleSlackSelectAll: () => void
  handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const useTriggerCreateForm = (
  option: UseTriggerCreateFormOption,
): UseTriggerCreateForm => {
  const { trigger, isTriggerLoading } = option

  /**
   * Form States
   */
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const [selectedSlacks, setSelectedSlacks] = useState<string[]>([])
  const [description, setDescription] = useState<string>('')

  /**
   * Compute attributes – this field is temporarily non-editable in Phase 1.
   */
  const attributes = useMemo(
    () =>
      (trigger?.attributes ?? []) as GetTriggersResponseDataInnerAttributes[],
    [trigger],
  )
  const allEmails = useMemo(
    () => trigger?.response?.emails?.map((email) => email.note) ?? [],
    [trigger],
  )
  const allSlacks = useMemo(
    () => trigger?.response?.slacks?.map((slack) => slack.url) ?? [],
    [trigger],
  )
  const enabled = useMemo(() => trigger?.enabled ?? true, [trigger])

  /**
   * Sync form state with trigger data when it is available.
   */
  useEffect(() => {
    if (!isTriggerLoading && trigger) {
      setSelectedEmails(allEmails.length > 0 ? [allEmails[0]] : [])
      setSelectedSlacks(allSlacks.length > 0 ? [allSlacks[0]] : [])
      setDescription(trigger.description)
    }
  }, [trigger, isTriggerLoading, allEmails, allSlacks])

  const handleEmailSelect = (id: string) => {
    setSelectedEmails((prev) =>
      isRowSelected(id, prev)
        ? prev.filter((email) => email !== id)
        : [...prev, id],
    )
  }

  const handleEmailSelectAll = () => {
    setSelectedEmails((prev) =>
      isAllSelected(allEmails, prev) ? [] : allEmails,
    )
  }

  const handleSlackSelect = (id: string) => {
    setSelectedSlacks((prev) =>
      isRowSelected(id, prev)
        ? prev.filter((slack) => slack !== id)
        : [...prev, id],
    )
  }

  const handleSlackSelectAll = () => {
    setSelectedSlacks((prev) =>
      isAllSelected(allSlacks, prev) ? [] : allSlacks,
    )
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  return {
    enabled,
    attributes,
    selectedEmails,
    selectedSlacks,
    description,
    handleEmailSelect,
    handleEmailSelectAll,
    handleSlackSelect,
    handleSlackSelectAll,
    handleDescriptionChange,
  }
}
