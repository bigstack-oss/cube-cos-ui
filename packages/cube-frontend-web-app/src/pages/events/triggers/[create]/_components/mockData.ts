import { GetTriggersResponseDataInnerAttributes } from '@cube-frontend/api'

export const mockAttributes: GetTriggersResponseDataInnerAttributes[] = [
  { name: 'severity', type: 'string', value: 'W', enabled: true },
  { name: 'severity', type: 'string', value: 'E', enabled: true },
  { name: 'severity', type: 'string', value: 'C', enabled: true },
  { name: 'category', type: 'string', value: 'DEV', enabled: false },
  { name: 'category', type: 'string', value: 'CPU', enabled: false },
  { name: 'category', type: 'string', value: 'DSK', enabled: false },
  { name: 'category', type: 'string', value: 'MEM', enabled: false },
  { name: 'category', type: 'string', value: 'NET', enabled: false },
  { name: 'category', type: 'string', value: 'SRV', enabled: false },
  { name: 'category', type: 'string', value: 'VRT', enabled: false },
]
