import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import {
  GetTriggersResponseDataInner,
  GetTriggersResponseDataInnerAttributesInner,
  GetTriggersResponseDataInnerResponseEmailsInner,
  GetTriggersResponseDataInnerResponseSlacksInner,
} from '@cube-frontend/api'
import {
  triggerToFormOptions,
  triggerToFormValue,
  selectSingleItem,
  selectAllItems,
  formValidation,
} from './utils'
import { CreateTriggerStepParams } from './useCreateTriggerStep'

export type CreateTriggerFormOptions = {
  allAttributes: GetTriggersResponseDataInnerAttributesInner[]
  allEmails: GetTriggersResponseDataInnerResponseEmailsInner[]
  allSlacks: GetTriggersResponseDataInnerResponseSlacksInner[]
}

export type CreateTriggerFormValue = {
  formAttributes: GetTriggersResponseDataInnerAttributesInner[]
  formEmails: string[]
  formSlacks: string[]
  formDescription: string
}

type UseTriggerCreateFormOption = {
  step: CreateTriggerStepParams
  isTemplateLoading: boolean
  selectedTemplate: GetTriggersResponseDataInner | undefined
}

type UseTriggerCreateForm = {
  formOptions: CreateTriggerFormOptions
  formValue: CreateTriggerFormValue

  isFormValueValid: boolean
  errorMessage: string | undefined

  handleEmailSelect: (targetEmail: string) => void
  handleEmailSelectAll: () => void
  handleSlackSelect: (targetSlack: string) => void
  handleSlackSelectAll: () => void
  handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const useTriggerCreateForm = (
  option: UseTriggerCreateFormOption,
): UseTriggerCreateForm => {
  const { step, isTemplateLoading, selectedTemplate } = option

  const formOptions = useMemo(
    () => triggerToFormOptions(selectedTemplate),
    [selectedTemplate],
  )
  const { allEmails, allSlacks } = formOptions

  const [formValue, setFormValue] = useState<CreateTriggerFormValue>({
    formAttributes: [],
    formEmails: [],
    formSlacks: [],
    formDescription: '',
  })

  useEffect(() => {
    if (selectedTemplate) {
      const initialFormValue = triggerToFormValue(selectedTemplate)
      setFormValue(initialFormValue)
    }
  }, [selectedTemplate])

  const handleEmailSelect = (targetEmail: string) => {
    setFormValue((prev) => {
      const formEmails = selectSingleItem(targetEmail, prev.formEmails)
      return { ...prev, formEmails }
    })
  }

  const handleEmailSelectAll = () => {
    setFormValue((prev) => {
      const options = allEmails.map((e) => e.address) ?? []
      const formEmails = selectAllItems(options, prev.formEmails)

      return { ...prev, formEmails }
    })
  }

  const handleSlackSelect = (targetSlack: string) => {
    setFormValue((prev) => {
      const formSlacks = selectSingleItem(targetSlack, prev.formSlacks)
      return { ...prev, formSlacks }
    })
  }

  const handleSlackSelectAll = () => {
    setFormValue((prev) => {
      const options = allSlacks.map((s) => s.url) ?? []
      const formSlacks = selectAllItems(options, prev.formSlacks)

      return { ...prev, formSlacks: formSlacks }
    })
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue((prev) => ({ ...prev, formDescription: e.target.value }))
  }

  const errorMessage = formValidation({
    step,
    isTemplateLoading,
    formTemplate: selectedTemplate?.name,
    formEmails: formValue.formEmails,
    formSlacks: formValue.formSlacks,
  })

  return {
    formOptions,
    formValue,
    isFormValueValid: !errorMessage,
    errorMessage,

    handleEmailSelect,
    handleEmailSelectAll,
    handleSlackSelect,
    handleSlackSelectAll,
    handleDescriptionChange,
  }
}
