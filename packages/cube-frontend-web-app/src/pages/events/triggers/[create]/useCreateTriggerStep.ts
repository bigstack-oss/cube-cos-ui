import { useMemo } from 'react'
import { useSearchParams } from 'react-router'

export enum CreateTriggerStepParams {
  TEMPLATE = 'selectTemplate',
  EVENTS = 'selectEvent',
  RESPONSE = 'setResponse',
  DESCRIPTION = 'addDescription',
}

export type CreateTriggerStep =
  | 'Select Template'
  | 'Select Events'
  | 'Set Response'
  | 'Add Description'

export type TriggersCreateStepType = {
  label: CreateTriggerStep
  param: CreateTriggerStepParams
}

export const triggersCreateSteps: TriggersCreateStepType[] = [
  {
    label: 'Select Template',
    param: CreateTriggerStepParams.TEMPLATE,
  },
  {
    label: 'Select Events',
    param: CreateTriggerStepParams.EVENTS,
  },
  {
    label: 'Set Response',
    param: CreateTriggerStepParams.RESPONSE,
  },
  {
    label: 'Add Description',
    param: CreateTriggerStepParams.DESCRIPTION,
  },
] as const

const STEP_PARAM_KEY = 'step'

const availableSteps = new Set(Object.values(CreateTriggerStepParams))

type UseCreateTriggerStep = {
  step: CreateTriggerStepParams
  goToEvents: () => void
  goToResponse: () => void
  goToDescription: () => void
}

export const useCreateTriggerStep = (): UseCreateTriggerStep => {
  const [searchParams, setSearchParams] = useSearchParams()

  const step = useMemo<CreateTriggerStepParams>(() => {
    const stepParam = searchParams.get(
      STEP_PARAM_KEY,
    ) as CreateTriggerStepParams | null

    if (!stepParam || !availableSteps.has(stepParam)) {
      return CreateTriggerStepParams.TEMPLATE
    }

    return stepParam
  }, [searchParams])

  const goToEvents = () => {
    setSearchParams((prev) => ({
      ...prev,
      [STEP_PARAM_KEY]: CreateTriggerStepParams.EVENTS,
    }))
  }

  const goToResponse = () => {
    setSearchParams((prev) => ({
      ...prev,
      [STEP_PARAM_KEY]: CreateTriggerStepParams.RESPONSE,
    }))
  }

  const goToDescription = () => {
    setSearchParams((prev) => ({
      ...prev,
      [STEP_PARAM_KEY]: CreateTriggerStepParams.DESCRIPTION,
    }))
  }

  return {
    step,
    goToEvents,
    goToResponse,
    goToDescription,
  }
}
