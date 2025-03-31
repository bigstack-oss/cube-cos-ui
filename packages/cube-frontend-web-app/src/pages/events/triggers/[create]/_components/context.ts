import { ChangeEvent, createContext, SetStateAction } from 'react'
import {
  GetTriggerResponseData,
  GetTriggersResponseDataInnerAttributes,
} from '@cube-frontend/api'
import { TriggersCreateStep, triggersCreateSteps } from './utils'

export type TriggersCreateContextValue = {
  activeStep: TriggersCreateStep
  setActiveStep: React.Dispatch<SetStateAction<TriggersCreateStep>>
  trigger: GetTriggerResponseData | undefined
  isTriggerLoading: boolean
  enabled: boolean
  selectedTemplate: string | undefined
  attributes: GetTriggersResponseDataInnerAttributes[]
  selectedEmails: string[]
  selectedSlacks: string[]
  description: string
  handleTemplateSelect: (id: string) => void
  handleTemplateSelectAll: () => void
  handleEmailSelect: (id: string) => void
  handleEmailSelectAll: () => void
  handleSlackSelect: (id: string) => void
  handleSlackSelectAll: () => void
  handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const TriggersCreateContext = createContext<TriggersCreateContextValue>({
  activeStep: triggersCreateSteps[0],
  setActiveStep: () => {},
  trigger: undefined,
  isTriggerLoading: false,
  enabled: true,
  selectedTemplate: undefined,
  attributes: [],
  selectedEmails: [],
  selectedSlacks: [],
  description: '',
  handleTemplateSelect: () => {},
  handleTemplateSelectAll: () => {},
  handleEmailSelect: () => {},
  handleEmailSelectAll: () => {},
  handleSlackSelect: () => {},
  handleSlackSelectAll: () => {},
  handleDescriptionChange: () => {},
})
