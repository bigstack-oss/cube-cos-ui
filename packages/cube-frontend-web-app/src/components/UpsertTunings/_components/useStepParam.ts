import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { UpsertTuningsStep } from '../upsertTuningsUtils'

type UseStepParam = {
  step: UpsertTuningsStep
  goToSelectHosts: () => void
  goToPublish: () => void
}

const STEP_PARAM_KEY = 'step'

const availableSteps = new Set(Object.values(UpsertTuningsStep))

export const useStepParam = (): UseStepParam => {
  const [searchParams, setSearchParams] = useSearchParams()

  const step = useMemo<UpsertTuningsStep>(() => {
    const stepParam = searchParams.get(
      STEP_PARAM_KEY,
    ) as UpsertTuningsStep | null

    if (!stepParam || !availableSteps.has(stepParam)) {
      return UpsertTuningsStep.KeyValue
    }

    return stepParam
  }, [searchParams])

  const goToSelectHosts = () => {
    setSearchParams((prev) => ({
      ...prev,
      [STEP_PARAM_KEY]: UpsertTuningsStep.SelectHosts,
    }))
  }

  const goToPublish = () => {
    setSearchParams((prev) => ({
      ...prev,
      [STEP_PARAM_KEY]: UpsertTuningsStep.Publish,
    }))
  }

  return {
    step,
    goToSelectHosts,
    goToPublish,
  }
}
