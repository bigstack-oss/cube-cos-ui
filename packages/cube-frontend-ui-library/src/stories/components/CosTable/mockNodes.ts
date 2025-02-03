export type MockNode = {
  id: string
  hostname: string
  managementIp: string
  role: string
  licenseExpire: Date
  cpu: number
  ram: number
  partition: number
  running: number
  status: string
}

export const mockNodes: MockNode[] = [
  {
    id: '5dcc8077-427a-4128-8fa2-470f6f87b451',
    hostname: 'Dell03',
    managementIp: '10.32.10.102',
    role: 'control-converged',
    licenseExpire: new Date('2025-01-22T01:23:45'),
    cpu: 33,
    ram: 34,
    partition: 33,
    running: 567,
    status: 'error',
  },
  {
    id: 'f8732267-4b0f-4976-bb92-20e763dc0f6a',
    hostname: 'Dell01',
    managementIp: '10.32.10.100',
    role: 'control-converged',
    licenseExpire: new Date('2025-01-20T01:23:45'),
    cpu: 11,
    ram: 78,
    partition: 11,
    running: 123,
    status: 'success',
  },
  {
    id: '4cd64b93-d59c-4ded-83ab-7d5c4f158e2e',
    hostname: 'Dell04',
    managementIp: '10.32.10.103',
    role: 'control-converged',
    licenseExpire: new Date('2025-01-23T01:23:45'),
    cpu: 80,
    ram: 125,
    partition: 170,
    running: 1357,
    status: 'running',
  },
  {
    id: 'cdf63e29-9a05-4c67-ab02-e07b7fb086fa',
    hostname: 'Dell02',
    managementIp: '10.32.10.101',
    role: 'control-converged',
    licenseExpire: new Date('2025-01-21T01:23:45'),
    cpu: 22,
    ram: 56,
    partition: 22,
    running: 234,
    status: 'running',
  },
]
