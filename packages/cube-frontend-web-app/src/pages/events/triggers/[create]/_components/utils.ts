import { GetTriggersResponseDataInnerAttributes } from '@cube-frontend/api'

export type CreateStep =
  | 'Select Template'
  | 'Select Events'
  | 'Set Response'
  | 'Add Description'

export type TriggersCreateStep = {
  serialNumber: number
  label: CreateStep
}

export const triggersCreateSteps: TriggersCreateStep[] = [
  { serialNumber: 1, label: 'Select Template' },
  { serialNumber: 2, label: 'Select Events' },
  { serialNumber: 3, label: 'Set Response' },
  { serialNumber: 4, label: 'Add Description' },
] as const

type GroupedAttribute = Record<string, GetTriggersResponseDataInnerAttributes[]>

export const groupAttributeByName = (
  arr: GetTriggersResponseDataInnerAttributes[] | undefined,
): GroupedAttribute | undefined => {
  if (!arr) return
  return arr.reduce((acc: GroupedAttribute, item) => {
    if (!acc[item.name]) {
      acc[item.name] = []
    }
    acc[item.name].push(item)
    return acc
  }, {})
}

/**
 * @returns An object containing:
 *   - `isValid`: `true` if the form values are valid for the given step, otherwise `false`.
 *   - `errorMessage`: A string describing the validation error, or `undefined` if valid.
 */
export const isFormValueValid = (
  activeStep: TriggersCreateStep,
  selectedTemplate: string | undefined,
  selectedEmails: string[],
  selectedSlacks: string[],
): { isValid: boolean; errorMessage?: string } => {
  switch (activeStep.label) {
    case 'Select Template':
      return {
        isValid: Boolean(selectedTemplate),
        errorMessage: selectedTemplate
          ? undefined
          : 'A template must be selected.',
      }

    case 'Set Response': {
      const hasEmails = selectedEmails.length > 0
      const hasSlacks = selectedSlacks.length > 0
      return {
        isValid: hasEmails && hasSlacks,
        errorMessage: hasEmails
          ? hasSlacks
            ? undefined
            : 'At least one Slack channel must be selected.'
          : 'At least one email recipient must be selected.',
      }
    }

    default:
      return { isValid: true, errorMessage: undefined }
  }
}

/**
 * Check if a specific row is selected.
 */
export const isRowSelected = (id: string, selectedRowIds: string[]): boolean =>
  selectedRowIds.includes(id)

/**
 * Check if all items in the original array are selected.
 */
export const isAllSelected = (
  originalArray: string[],
  selectedArray: string[],
): boolean => {
  return (
    originalArray.length === selectedArray.length &&
    originalArray.every((item) => selectedArray.includes(item))
  )
}
