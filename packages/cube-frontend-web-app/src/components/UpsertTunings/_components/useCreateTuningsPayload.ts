import { ListTuningSpecResponseDataInner } from '@cube-frontend/api'
import { ChangeEvent, useMemo, useState } from 'react'
import { HostWithRole, UpsertTuningsPayload } from '../upsertTuningsUtils'

type UseCreateTuningsPayload = {
  payload: UpsertTuningsPayload
  selectedSpec: ListTuningSpecResponseDataInner | undefined
  onSpecSelect: (spec: ListTuningSpecResponseDataInner) => void
  onValueChange: (e: ChangeEvent<HTMLInputElement> | boolean) => void
  onHostsChange: (hosts: HostWithRole[]) => void
}

export const useCreateTuningsPayload = (
  specs: ListTuningSpecResponseDataInner[] | undefined,
): UseCreateTuningsPayload => {
  const [payload, setPayload] = useState<UpsertTuningsPayload>(() => ({
    selectedSpecName: undefined,
    value: undefined,
    selectedHosts: [],
  }))

  const selectedSpec = useMemo<
    ListTuningSpecResponseDataInner | undefined
  >(() => {
    const specName = payload.selectedSpecName
    if (!specs || !specName) {
      return undefined
    }
    return specs.find((spec) => spec.name === specName)
  }, [specs, payload.selectedSpecName])

  const onSpecSelect = (spec: ListTuningSpecResponseDataInner): void => {
    if (selectedSpec?.name !== spec.name) {
      setPayload((prev) => ({
        ...prev,
        selectedSpecName: spec.name,
        value: spec.limitation.default,
      }))
    }
  }

  const onValueChange = (e: ChangeEvent<HTMLInputElement> | boolean): void => {
    const value = typeof e === 'boolean' ? e : e.target.value
    setPayload((prev) => ({
      ...prev,
      value,
    }))
  }

  const onHostsChange = (hosts: HostWithRole[]): void => {
    setPayload((prev) => ({
      ...prev,
      selectedHosts: hosts,
    }))
  }

  return {
    payload,
    selectedSpec,
    onSpecSelect,
    onValueChange,
    onHostsChange,
  }
}
