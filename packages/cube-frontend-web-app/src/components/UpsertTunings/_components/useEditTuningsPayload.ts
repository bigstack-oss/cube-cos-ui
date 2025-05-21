import { ListTuningSpecResponseDataInner, Node } from '@cube-frontend/api'
import { EditTuningsInitialData } from '@cube-frontend/web-app/stores/editTuningsStore'
import { ChangeEvent, useEffect, useState } from 'react'
import {
  computeValidHosts,
  HostWithRole,
  limitationValueToPayloadValue,
  UpsertTuningsPayload,
} from '../upsertTuningsUtils'

type UseEditTuningsPayload = {
  isInitializing: boolean
  payload: UpsertTuningsPayload | undefined
  selectedSpec: ListTuningSpecResponseDataInner | undefined
  onValueChange: (e: ChangeEvent<HTMLInputElement> | boolean) => void
  onHostsChange: (hosts: HostWithRole[]) => void
}

const initializePayload = (
  initialData: EditTuningsInitialData,
  selectedSpec: ListTuningSpecResponseDataInner | undefined,
): UpsertTuningsPayload => {
  const { specName, value } = initialData
  return {
    selectedSpecName: specName,
    value:
      value === undefined
        ? limitationValueToPayloadValue(selectedSpec?.limitation.default)
        : limitationValueToPayloadValue(value),
    selectedHosts: [],
  }
}

export const useEditTuningsPayload = (
  specs: ListTuningSpecResponseDataInner[] | undefined,
  nodes: Node[] | undefined,
  initialData: EditTuningsInitialData,
): UseEditTuningsPayload => {
  const [isInitializing, setIsInitializing] = useState(true)
  const [payload, setPayload] = useState<UpsertTuningsPayload | undefined>(
    undefined,
  )
  const [selectedSpec, setSelectedSpec] = useState<
    ListTuningSpecResponseDataInner | undefined
  >(undefined)

  useEffect(() => {
    if (!specs) {
      return
    }
    const selectedSpec = specs.find(
      (spec) => spec.name === initialData.specName,
    )
    setIsInitializing(false)
    setPayload(initializePayload(initialData, selectedSpec))
    setSelectedSpec(selectedSpec)
  }, [specs, initialData])

  useEffect(() => {
    if (!nodes || !initialData.hosts?.length) {
      return
    }
    const validHosts = computeValidHosts(nodes, initialData.hosts)
    setPayload((prev) => {
      if (!prev) {
        return prev
      }
      return {
        ...prev,
        selectedHosts: validHosts,
      }
    })
  }, [nodes, initialData])

  const onValueChange = (e: ChangeEvent<HTMLInputElement> | boolean): void => {
    const value = typeof e === 'boolean' ? e : e.target.value
    setPayload((prev) => {
      if (!prev) {
        return prev
      }
      return {
        ...prev,
        value,
      }
    })
  }

  const onHostsChange = (hosts: HostWithRole[]): void => {
    setPayload((prev) => {
      if (!prev) {
        return prev
      }
      return {
        ...prev,
        selectedHosts: hosts,
      }
    })
  }

  return {
    isInitializing,
    payload,
    selectedSpec,
    onValueChange,
    onHostsChange,
  }
}
