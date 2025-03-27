import { Node } from '@cube-frontend/api'
import { isIPv4 } from '@cube-frontend/utils'
import { NodeRoleEnum } from '@cube-frontend/web-app/utils/node'
import { HostWithRole } from '../../createTuningsUtils'
import { HostFilterValue } from './useHostFilter'

const filterByKeyword = (hosts: Node[], keyword: string): Node[] => {
  const loweredKeyword = keyword.toLowerCase()
  return hosts.filter((host) =>
    host.hostname.toLowerCase().includes(loweredKeyword),
  )
}

const filterByRole = (
  hosts: Node[],
  selectedRoles: Set<NodeRoleEnum>,
): Node[] => {
  return hosts.filter((host) => selectedRoles.has(host.role as NodeRoleEnum))
}

const filterByStartIp = (hosts: Node[], validIp: string): Node[] => {
  return hosts.filter((host) => {
    const hostIp = ipToInt(host.ip)
    const startIp = ipToInt(validIp)
    return hostIp >= startIp
  })
}

const filterByEndIp = (hosts: Node[], validIp: string): Node[] => {
  return hosts.filter((host) => {
    const hostIp = ipToInt(host.ip)
    const endIp = ipToInt(validIp)
    return hostIp <= endIp
  })
}

const ipToInt = (ip: string): number => {
  const [first, second, third, fourth] = ip
    .split('.')
    .map((octet) => parseInt(octet))
  return (
    first * Math.pow(256, 3) + second * Math.pow(256, 2) + third * 256 + fourth
  )
}

export const filterHosts = (
  hostsFromApi: Node[] | undefined,
  filter: HostFilterValue,
): HostWithRole[] => {
  const {
    keyword,
    selectedRoles,
    ipRange: { start: startIp, end: endIp },
  } = filter
  let hosts = hostsFromApi ?? []

  if (keyword) {
    hosts = filterByKeyword(hosts, keyword)
  }

  if (selectedRoles.length) {
    hosts = filterByRole(hosts, new Set(selectedRoles))
  }

  if (startIp && isIPv4(startIp)) {
    hosts = filterByStartIp(hosts, startIp)
  }

  if (endIp && isIPv4(endIp)) {
    hosts = filterByEndIp(hosts, endIp)
  }

  return hosts.map(
    (host) =>
      ({
        name: host.hostname,
        ip: host.ip,
        role: host.role,
      }) satisfies HostWithRole,
  )
}
