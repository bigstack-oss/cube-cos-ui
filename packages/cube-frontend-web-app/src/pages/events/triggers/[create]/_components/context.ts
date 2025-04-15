import { ChangeEvent, createContext, SetStateAction } from 'react'
import {
  GetTriggerResponseData,
  GetTriggersResponseDataInnerAttributes,
} from '@cube-frontend/api'
import { TriggersCreateStep, triggersCreateSteps } from './utils'
import { TemplateRow } from './useTemplateTable'

export type TriggersCreateContextValue = {
  // Step Params
  activeStep: TriggersCreateStep
  setActiveStep: React.Dispatch<SetStateAction<TriggersCreateStep>>
  // Template Table
  isTemplateLoading: boolean
  templateRows: TemplateRow[]
  disabledRowsId: string[]
  selectedTemplateName: string | null
  handleTemplateSelect: (selectedId: string) => void
  // The Rest Form Fields
  trigger: GetTriggerResponseData | undefined
  isTriggerLoading: boolean
  attributes: GetTriggersResponseDataInnerAttributes[]
  selectedEmails: string[]
  selectedSlacks: string[]
  description: string
  // Form Field Handlers
  handleEmailSelect: (id: string) => void
  handleEmailSelectAll: () => void
  handleSlackSelect: (id: string) => void
  handleSlackSelectAll: () => void
  handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const TriggersCreateContext = createContext<TriggersCreateContextValue>({
  // Step Params
  activeStep: triggersCreateSteps[0],
  setActiveStep: () => {},
  // Template Table
  isTemplateLoading: false,
  templateRows: [],
  disabledRowsId: [],
  selectedTemplateName: null,
  handleTemplateSelect: () => {},
  // The Rest Form Fields
  trigger: undefined,
  isTriggerLoading: false,
  attributes: [],
  selectedEmails: [],
  selectedSlacks: [],
  description: '',
  // Form Field Handlers
  handleEmailSelect: () => {},
  handleEmailSelectAll: () => {},
  handleSlackSelect: () => {},
  handleSlackSelectAll: () => {},
  handleDescriptionChange: () => {},
})
