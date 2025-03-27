import { useMemo } from 'react'
import { useSearchParams } from 'react-router'

type UseStepParam = {
  step: CreateTuningsStep
  goToSelectHosts: () => void
  goToPublish: () => void
}

export enum CreateTuningsStep {
  SelectKeyValue = 'keyValue',
  SelectHosts = 'selectHosts',
  Publish = 'publish',
}

const STEP_PARAM_KEY = 'step'

const availableSteps = new Set(Object.values(CreateTuningsStep))

export const useStepParam = (): UseStepParam => {
  const [searchParams, setSearchParams] = useSearchParams()

  const step = useMemo<CreateTuningsStep>(() => {
    const stepParam = searchParams.get(
      STEP_PARAM_KEY,
    ) as CreateTuningsStep | null

    if (!stepParam || !availableSteps.has(stepParam)) {
      return CreateTuningsStep.SelectKeyValue
    }

    return stepParam
  }, [searchParams])

  const goToSelectHosts = () => {
    setSearchParams((prev) => ({
      ...prev,
      [STEP_PARAM_KEY]: CreateTuningsStep.SelectHosts,
    }))
  }

  const goToPublish = () => {
    setSearchParams((prev) => ({
      ...prev,
      [STEP_PARAM_KEY]: CreateTuningsStep.Publish,
    }))
  }

  return {
    step,
    goToSelectHosts,
    goToPublish,
  }
}
