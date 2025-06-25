import { ChangeEvent, createContext } from 'react'
import { GetTriggersResponseDataInner } from '@cube-frontend/api'
import { TemplateRow } from './useTemplateTable'
import {
  CreateTriggerFormOptions,
  CreateTriggerFormValue,
} from './useCreateTriggerForm'
import { CreateTriggerStepParams } from './useCreateTriggerStep'

export type TriggersCreateContextValue = {
  /**
   * Create / Edit Trigger Steps
   */
  step: CreateTriggerStepParams
  goToEvents: () => void
  goToResponse: () => void
  goToDescription: () => void
  /**
   * Template Table
   */
  isTemplateLoading: boolean
  templateRows: TemplateRow[]
  disabledRowsId: string[]
  selectedTemplate: GetTriggersResponseDataInner | undefined
  handleTemplateSelect: (selectedId: string) => void
  /**
   * Form fields
   */
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

export const TriggersCreateContext = createContext<TriggersCreateContextValue>({
  /**
   * Create / Edit Trigger Steps
   */
  step: CreateTriggerStepParams.TEMPLATE,
  goToEvents: () => {},
  goToResponse: () => {},
  goToDescription: () => {},
  /**
   * Template Table
   */
  isTemplateLoading: false,
  templateRows: [],
  disabledRowsId: [],
  selectedTemplate: undefined,
  handleTemplateSelect: () => {},
  /**
   * Form fields
   */
  formOptions: {
    allAttributes: [],
    allEmails: [],
    allSlacks: [],
  },
  formValue: {
    formAttributes: [],
    formEmails: [],
    formSlacks: [],
    formDescription: '',
  },
  isFormValueValid: false,
  errorMessage: undefined,
  handleEmailSelect: () => {},
  handleEmailSelectAll: () => {},
  handleSlackSelect: () => {},
  handleSlackSelectAll: () => {},
  handleDescriptionChange: () => {},
})
