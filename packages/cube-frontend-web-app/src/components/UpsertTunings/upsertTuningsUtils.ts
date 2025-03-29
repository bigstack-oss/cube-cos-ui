import {
  ListTuningResponseDataTuningsInnerLimitationDefault,
  ListTuningSpecResponseDataInnerRolesInnerHostsInner,
  Node,
} from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'

export enum UpsertTuningsStep {
  KeyValue = 'keyValue',
  SelectHosts = 'selectHosts',
  Publish = 'publish',
}

export type UpsertTuningsPayload = {
  selectedSpecName: string | undefined
  value: ListTuningResponseDataTuningsInnerLimitationDefault | undefined
  selectedHosts: HostWithRole[]
}

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
