import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { UpsertTriggersStep } from '../upsertTriggersUtils'

const STEP_PARAM_KEY = 'step'

type UseStepParam = {
  step: UpsertTriggersStep
  goToSelectEvents: () => void
  goToSetResponse: () => void
  goToAddDescription: () => void
}

export const useStepParam = (
  validSteps: UpsertTriggersStep[],
): UseStepParam => {
  const [searchParams, setSearchParams] = useSearchParams()
  const validStepsSet = useMemo(() => new Set(validSteps), [validSteps])

  const step = useMemo<UpsertTriggersStep>(() => {
    const stepParam = searchParams.get(
      STEP_PARAM_KEY,
    ) as UpsertTriggersStep | null

    if (!stepParam || !validStepsSet.has(stepParam)) {
      return validSteps[0]
    }

    return stepParam
  }, [searchParams, validSteps, validStepsSet])

  const goToSelectEvents = () => {
    setSearchParams((prev) => ({
      ...prev,
      [STEP_PARAM_KEY]: UpsertTriggersStep.SelectEvents,
    }))
  }

  const goToSetResponse = () => {
    setSearchParams((prev) => ({
      ...prev,
      [STEP_PARAM_KEY]: UpsertTriggersStep.SetResponse,
    }))
  }

  const goToAddDescription = () => {
    setSearchParams((prev) => ({
      ...prev,
      [STEP_PARAM_KEY]: UpsertTriggersStep.AddDescription,
    }))
  }

  return {
    step,
    goToSelectEvents,
    goToSetResponse,
    goToAddDescription,
  }
}
