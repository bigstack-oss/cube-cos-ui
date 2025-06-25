import { groupBy } from 'lodash'
import {
  GetTriggersResponseDataInner,
  GetTriggersResponseDataInnerAttributesInner,
  UpdateTriggerRequest,
} from '@cube-frontend/api'
import {
  CreateTriggerFormOptions,
  CreateTriggerFormValue,
} from './useCreateTriggerForm'
import { CreateTriggerStepParams } from './useCreateTriggerStep'

type GroupedAttribute = Record<
  string,
  GetTriggersResponseDataInnerAttributesInner[]
>

export const groupAttributeByName = (
  arr: GetTriggersResponseDataInnerAttributesInner[] | undefined,
): GroupedAttribute => {
  return groupBy(arr, (item) => item.name)
}

export const triggerToFormOptions = (
  selectedTemplate?: GetTriggersResponseDataInner,
): CreateTriggerFormOptions => {
  if (!selectedTemplate)
    return {
      allAttributes: [],
      allEmails: [],
      allSlacks: [],
    }

  return {
    allAttributes: selectedTemplate.attributes,
    allEmails: selectedTemplate.response.emails,
    allSlacks: selectedTemplate.response.slacks,
  }
}

export const triggerToFormValue = (
  trigger: GetTriggersResponseDataInner,
): CreateTriggerFormValue => {
  const { attributes, response, description } = trigger

  const allEmails: string[] = []
  const enabledEmails: string[] = []

  for (const { address, enabled } of response.emails) {
    allEmails.push(address)
    if (enabled) enabledEmails.push(address)
  }

  const allSlacks: string[] = []
  const enabledSlacks: string[] = []

  for (const { url, enabled } of response.slacks) {
    allSlacks.push(url)
    if (enabled) enabledSlacks.push(url)
  }

  /**
   * If at least one of the tables has a selected option,
   * the other may remain empty.
   */
  let finalEmails: string[] = enabledEmails
  let finalSlacks: string[] = enabledSlacks

  const hasEnabled = enabledEmails.length > 0 || enabledSlacks.length > 0

  if (!hasEnabled) {
    /**
     * If neither form is checked, check the first option of email
     * If there is no option for email, check the first option for slack
     * If both are empty, keep both arrays empty
     */
    if (allEmails.length > 0) {
      finalEmails = [allEmails[0]]
    } else if (allSlacks.length > 0) {
      finalSlacks = [allSlacks[0]]
    }
  }

  return {
    formAttributes: attributes,
    formEmails: finalEmails,
    formSlacks: finalSlacks,
    formDescription: description,
  }
}

type FormValidationOptions = {
  step: CreateTriggerStepParams
  isTemplateLoading: boolean
  formTemplate: string | undefined
  formEmails: string[]
  formSlacks: string[]
}

/**
 * @returns An error message, or `undefined` if there’s no error.
 */
export const formValidation = (
  options: FormValidationOptions,
): string | undefined => {
  const { step, isTemplateLoading, formTemplate, formEmails, formSlacks } =
    options

  if (
    step === CreateTriggerStepParams.TEMPLATE &&
    !isTemplateLoading &&
    !formTemplate
  ) {
    return 'Please select a template.'
  }

  if (step === CreateTriggerStepParams.RESPONSE) {
    const hasEmails = formEmails.length > 0
    const hasSlacks = formSlacks.length > 0
    if (!hasEmails && !hasSlacks) {
      return 'At least one email recipient or Slack channel must be selected.'
    }
  }

  return undefined
}

export const selectSingleItem = (
  id: string,
  selectedRowIds: string[],
): string[] => {
  const isRowSelected = selectedRowIds.includes(id)

  return isRowSelected
    ? selectedRowIds.filter((itemId) => itemId !== id)
    : [...selectedRowIds, id]
}

/**
 * Check if all items in the original array are selected.
 */
export const selectAllItems = (
  options: string[],
  selectedArray: string[],
): string[] => {
  const isAllSelected =
    options.length === selectedArray.length &&
    options.every((item) => selectedArray.includes(item))

  return isAllSelected ? [] : options
}

export const formValueToRequest = (
  formValue: CreateTriggerFormValue,
): UpdateTriggerRequest => {
  const { formAttributes, formEmails, formSlacks, formDescription } = formValue

  return {
    attributes: formAttributes,
    response: {
      slacks: formSlacks.map((url) => ({ url })),
      emails: formEmails.map((address) => ({ address })),
    },
    description: formDescription,
  }
}
