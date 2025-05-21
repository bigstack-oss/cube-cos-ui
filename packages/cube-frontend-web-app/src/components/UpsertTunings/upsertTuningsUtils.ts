import {
  ListTuningSpecResponseDataInnerLimitationDefault,
  ListTuningSpecResponseDataInnerRolesInnerHostsInner,
  Node,
  TuningLimitationType,
} from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'

export enum UpsertTuningsStep {
  KeyValue = 'keyValue',
  SelectHosts = 'selectHosts',
  Publish = 'publish',
}

export type UpsertTuningsPayload = {
  selectedSpecName: string | undefined
  value: UpsertTuningsPayloadValue
  selectedHosts: HostWithRole[]
}

export type UpsertTuningsPayloadValue = string | boolean | undefined

export type NonNullableUpsertTuningsPayload = {
  [key in keyof UpsertTuningsPayload]: Exclude<
    UpsertTuningsPayload[key],
    undefined
  >
}

export type PreviewRow = CosTableRow & {
  host: HostWithRole
}

export type HostWithRole =
  ListTuningSpecResponseDataInnerRolesInnerHostsInner & {
    role: string
  }

export const hostToPreviewRow = (host: HostWithRole): PreviewRow => ({
  id: host.name,
  host,
})

export const computeValidHosts = (
  nodes: Node[],
  hostNames: string[] = [],
): HostWithRole[] => {
  const map = new Map<string, Node>(nodes.map((node) => [node.hostname, node]))
  const result: HostWithRole[] = []

  hostNames.forEach((hostName) => {
    const node = map.get(hostName)
    if (node) {
      result.push({
        name: node.hostname,
        ip: node.ip,
        role: node.role,
      })
    }
  })

  return result
}

export const limitationValueToPayloadValue = (
  defaultValue: ListTuningSpecResponseDataInnerLimitationDefault | undefined,
): UpsertTuningsPayloadValue => {
  if (defaultValue === undefined) return undefined
  if (typeof defaultValue === 'boolean') return defaultValue
  return defaultValue.toString()
}

export const payloadValueToLimitationValue = (
  limitationType: TuningLimitationType,
  payloadValue: Exclude<UpsertTuningsPayloadValue, undefined>,
): ListTuningSpecResponseDataInnerLimitationDefault => {
  if (limitationType === 'bool' && typeof payloadValue !== 'boolean') {
    throw new Error('bool limitation type only accept boolean value')
  }

  if (typeof payloadValue === 'boolean') return payloadValue

  if (limitationType === 'int' || limitationType === 'uint') {
    const intValue = parseInt(payloadValue, 10)
    if (isNaN(intValue) || !isFinite(intValue)) {
      throw new Error(`${payloadValue} is not a valid numeric string`)
    }
    return intValue
  }

  return payloadValue
}
