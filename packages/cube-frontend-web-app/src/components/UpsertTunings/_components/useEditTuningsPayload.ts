import { ListTuningSpecResponseDataInner, Node } from '@cube-frontend/api'
import { EditTuningsDefaultData } from '@cube-frontend/web-app/stores/editTuningsStore'
import { ChangeEvent, useEffect, useState } from 'react'
import {
  computeValidHosts,
  HostWithRole,
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
  defaultData: EditTuningsDefaultData,
  selectedSpec: ListTuningSpecResponseDataInner | undefined,
): UpsertTuningsPayload => {
  const { specName, value } = defaultData
  return {
    selectedSpecName: specName,
    value: value === undefined ? selectedSpec?.limitation.default : value,
    selectedHosts: [],
  }
}

export const useEditTuningsPayload = (
  specs: ListTuningSpecResponseDataInner[] | undefined,
  nodes: Node[] | undefined,
  defaultData: EditTuningsDefaultData,
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
      (spec) => spec.name === defaultData.specName,
    )
    setIsInitializing(false)
    setPayload(initializePayload(defaultData, selectedSpec))
    setSelectedSpec(selectedSpec)
  }, [specs, defaultData])

  useEffect(() => {
    if (!nodes || !defaultData.hosts?.length) {
      return
    }
    const validHosts = computeValidHosts(nodes, defaultData.hosts)
    setPayload((prev) => {
      if (!prev) {
        return prev
      }
      return {
        ...prev,
        selectedHosts: validHosts,
      }
    })
  }, [nodes, defaultData])

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
