import { ListTuningResponseDataTuningsInner } from '@cube-frontend/api'
import { range } from 'lodash'

export const mockTunings: ListTuningResponseDataTuningsInner[] = [
  {
    name: 'neutron.debug.enabled',
    value: 'false',
    hosts: ['example-node-0'],
    description: 'Set to true to enable neutron verbose log.',
    enabled: true,
    isModified: false,
    limitation: {
      type: 'bool',
      default: false,
      min: 0,
      max: 0,
    },
    status: {
      updatedAt: '2025-03-12T19:22:00+08:00',
      isUpdating: true,
    },
  },
  {
    name: 'cubesys.provider.extra',
    value: '',
    hosts: ['example-node-0'],
    description:
      "Set extra provider interfaces ('pvd-' prefix and <= 15 chars) [IF.2:pvd-xxx,eth2:pvd-yyy,...].",
    enabled: true,
    isModified: false,
    limitation: {
      type: 'string',
      default: '',
      regex: '',
      min: 0,
      max: 0,
    },
    status: {
      isUpdating: false,
    },
  },
  {
    name: 'barbican.debug.enabled',
    value: 'false',
    hosts: ['example-node-0'],
    description: 'Set to true to enable barbican verbose log.',
    enabled: true,
    isModified: false,
    limitation: {
      type: 'bool',
      default: false,
      min: 0,
      max: 0,
    },
    status: {
      isUpdating: false,
    },
  },
  {
    name: 'cinder.backup.endpoint',
    value: '',
    hosts: ['example-node-0'],
    description: 'Set cinder backup storage endpoint.',
    enabled: true,
    isModified: false,
    limitation: {
      type: 'string',
      default: '',
      min: 0,
      max: 0,
      regex: '',
    },
    status: {
      isUpdating: false,
    },
  },
  {
    name: 'influxdb.curator.rp',
    value: '7',
    hosts: range(0, 18).map((index) => `example-node-${index}`),
    description: 'influxdb curator retention policy in days.',
    enabled: true,
    isModified: false,
    limitation: {
      type: 'int',
      default: 7,
      min: 0,
      max: 365,
    },
    status: {
      isUpdating: false,
    },
  },
  {
    name: 'influxdb.curator.rp',
    value: '23',
    hosts: ['example-node-3'],
    description: 'influxdb curator retention policy in days.',
    enabled: false,
    isModified: true,
    limitation: {
      type: 'int',
      default: 7,
      min: 0,
      max: 365,
    },
    status: {
      isUpdating: false,
    },
  },
]
