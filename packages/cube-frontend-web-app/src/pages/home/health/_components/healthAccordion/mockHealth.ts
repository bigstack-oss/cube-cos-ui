// TODO: Delete this file after all necessary APIs are implemented.
import { Dayjs } from 'dayjs'

export const mockServices = [
  {
    name: 'clusterLink',
    category: 'core',
    modules: [
      {
        name: 'link',
      },
      {
        name: 'clock',
      },
      {
        name: 'dns',
      },
    ],
  },
  {
    name: 'clusterSys',
    category: 'core',
    modules: [
      {
        name: 'bootstrap',
      },
      {
        name: 'license',
      },
    ],
  },
  {
    name: 'clusterSettings',
    category: 'core',
    modules: [
      {
        name: 'etcd',
      },
      {
        name: 'nodelist',
      },
    ],
  },
  {
    name: 'haCluster',
    category: 'core',
    modules: [
      {
        name: 'hacluster',
      },
    ],
  },
  {
    name: 'msgQueue',
    category: 'core',
    modules: [
      {
        name: 'rabbitmq',
      },
    ],
  },
  {
    name: 'iaasDb',
    category: 'core',
    modules: [
      {
        name: 'mysql',
      },
      {
        name: 'mongodb',
      },
    ],
  },
  {
    name: 'virtualIp',
    category: 'core',
    modules: [
      {
        name: 'vip',
      },
      {
        name: 'haproxy_ha',
      },
    ],
  },
  {
    name: 'storage',
    category: 'storage',
    modules: [
      {
        name: 'ceph',
      },
      {
        name: 'ceph_mon',
      },
      {
        name: 'ceph_mgr',
      },
      {
        name: 'ceph_mds',
      },
      {
        name: 'ceph_osd',
      },
      {
        name: 'ceph_rgw',
      },
      {
        name: 'rbd_target',
      },
    ],
  },
  {
    name: 'apiService',
    category: 'core',
    modules: [
      {
        name: 'haproxy',
      },
      {
        name: 'httpd',
      },
      {
        name: 'skyline',
      },
      {
        name: 'lmi',
      },
      {
        name: 'memcache',
      },
    ],
  },
  {
    name: 'singleSignOn',
    category: 'core',
    modules: [
      {
        name: 'k3s',
      },
      {
        name: 'keycloak',
      },
    ],
  },
  {
    name: 'network',
    category: 'cloud computing',
    modules: [
      {
        name: 'neutron',
      },
    ],
  },
  {
    name: 'compute',
    category: 'cloud computing',
    modules: [
      {
        name: 'nova',
      },
      {
        name: 'cyborg',
      },
    ],
  },
  {
    name: 'bareMetal',
    category: 'cloud computing',
    modules: [
      {
        name: 'ironic',
      },
    ],
  },
  {
    name: 'image',
    category: 'cloud computing',
    modules: [
      {
        name: 'glance',
      },
    ],
  },
  {
    name: 'blockStor',
    category: 'cloud computing',
    modules: [
      {
        name: 'cinder',
      },
    ],
  },
  {
    name: 'fileStor',
    category: 'cloud computing',
    modules: [
      {
        name: 'manila',
      },
    ],
  },
  {
    name: 'objectStor',
    category: 'cloud computing',
    modules: [
      {
        name: 'swift',
      },
    ],
  },
  {
    name: 'orchestration',
    category: 'cloud computing',
    modules: [
      {
        name: 'heat',
      },
    ],
  },
  {
    name: 'lbaas',
    category: 'cloud computing',
    modules: [
      {
        name: 'octavia',
      },
    ],
  },
  {
    name: 'dnsaas',
    category: 'cloud computing',
    modules: [
      {
        name: 'designate',
      },
    ],
  },
  {
    name: 'k8saas',
    category: 'cloud computing',
    modules: [
      {
        name: 'rancher',
      },
    ],
  },
  {
    name: 'instanceHa',
    category: 'cloud computing',
    modules: [
      {
        name: 'masakari',
      },
    ],
  },
  {
    name: 'businessLogic',
    category: 'cloud computing',
    modules: [
      {
        name: 'senlin',
      },
      {
        name: 'watcher',
      },
    ],
  },
  {
    name: 'dataPipe',
    category: 'infrascope',
    modules: [
      {
        name: 'zookeeper',
      },
      {
        name: 'kafka',
      },
    ],
  },
  {
    name: 'metrics',
    category: 'infrascope',
    modules: [
      {
        name: 'monasca',
      },
      {
        name: 'telegraf',
      },
      {
        name: 'grafana',
      },
    ],
  },
  {
    name: 'logAnalytics',
    category: 'infrascope',
    modules: [
      {
        name: 'filebeat',
      },
      {
        name: 'auditbeat',
      },
      {
        name: 'logstash',
      },
      {
        name: 'opensearch',
      },
      {
        name: 'opensearch-dashboards',
      },
    ],
  },
  {
    name: 'notifications',
    category: 'infrascope',
    modules: [
      {
        name: 'influxdb',
      },
      {
        name: 'kapacitor',
      },
    ],
  },
]

export const mockOverallHealth = {
  overall: {
    status: 'ok',
    isFixing: false,
  },
  services: [
    {
      name: 'clusterLink',
      category: 'core',
      status: {
        current: 'ok',
      },
      modules: [
        {
          name: 'link',
          status: {
            current: 'ok',
          },
        },
      ],
    },
  ],
}

export type ModuleHealthHistory = ReturnType<
  typeof createMockServiceHealth
>[number]['history']

export const createMockServiceHealth = (now: Dayjs) => [
  {
    category: 'core',
    service: 'clusterLink',
    module: 'link',
    history: [
      {
        time: now.subtract(24, 'hours').subtract(2, 'minutes').toISOString(),
        status: 'ng',
        error: {
          type: 'service down',
          reason: '1 node down',
          nodes: ['dell180'],
          description:
            'nova has 1 node down due to the memory exhausted, and the abnormal memory competition from PID(24887) is detected',
          details: '{ ... the best efforts of error summary / direction ...} ',
          log: 'http://{dataCenter}:8888/log/nova/dell180-20250205113459-b3gc.log',
        },
      },
      {
        time: now.subtract(23, 'hours').subtract(57, 'minutes').toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(23, 'hours').subtract(52, 'minutes').toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(23, 'hours').subtract(47, 'minutes').toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(23, 'hours').subtract(42, 'minutes').toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(23, 'hours').subtract(37, 'minutes').toISOString(),
        status: 'ng',
        error: {
          type: 'service down',
          reason: '1 node down',
          nodes: ['dell180'],
          description:
            'nova has 1 node down due to the memory exhausted, and the abnormal memory competition from PID(24887) is detected',
          details: '{ ... the best efforts of error summary / direction ...} ',
          log: 'http://{dataCenter}:8888/log/nova/dell180-20250205113459-b3gc.log',
        },
      },
      {
        time: now.subtract(23, 'hours').subtract(32, 'minutes').toISOString(),
        status: 'ng',
        error: {
          type: 'service down',
          reason: '1 node down',
          nodes: ['dell180'],
          description:
            'nova has 1 node down due to the memory exhausted, and the abnormal memory competition from PID(24887) is detected',
          details: '{ ... the best efforts of error summary / direction ...} ',
          log: 'http://{dataCenter}:8888/log/nova/dell180-20250205113459-b3gc.log',
        },
      },
      {
        time: now.subtract(23, 'hours').subtract(27, 'minutes').toISOString(),
        status: 'ng',
        error: {
          type: 'service down',
          reason: '1 node down',
          nodes: ['dell180'],
          description:
            'nova has 1 node down due to the memory exhausted, and the abnormal memory competition from PID(24887) is detected',
          details: '{ ... the best efforts of error summary / direction ...} ',
          log: 'http://{dataCenter}:8888/log/nova/dell180-20250205113459-b3gc.log',
        },
      },
      {
        time: now.subtract(23, 'hours').subtract(22, 'minutes').toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(23, 'hours').subtract(17, 'minutes').toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(23, 'hours').toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(22, 'hours').toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(21, 'hours').subtract(30, 'minutes').toISOString(),
        status: 'ng',
        error: {
          type: 'service down',
          reason: '1 node down',
          nodes: ['dell180'],
          description:
            'nova has 1 node down due to the memory exhausted, and the abnormal memory competition from PID(24887) is detected',
          details: '{ ... the best efforts of error summary / direction ...} ',
          log: 'http://{dataCenter}:8888/log/nova/dell180-20250205113459-b3gc.log',
        },
      },
      {
        time: now.subtract(21, 'hours').subtract(25, 'minutes').toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(21, 'hours').subtract(20, 'minutes').toISOString(),
        status: 'ok',
      },
    ],
  },
  {
    category: 'core',
    service: 'clusterLink',
    module: 'clock',
    history: [
      {
        time: now.subtract(15, 'days').toISOString(),
        status: 'ng',
        error: {
          type: 'service down',
          reason: '1 node down',
          nodes: ['dell180'],
          description:
            'nova has 1 node down due to the memory exhausted, and the abnormal memory competition from PID(24887) is detected',
          details: '{ ... the best efforts of error summary / direction ...} ',
          log: 'http://{dataCenter}:8888/log/nova/dell180-20250205113459-b3gc.log',
        },
      },
      {
        time: now.subtract(14, 'days').subtract(16, 'hours').toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(14, 'days').subtract(8, 'hours').toISOString(),
        status: 'ok',
      },
      {
        time: now
          .subtract(14, 'days')
          .subtract(7, 'hours')
          .subtract(55, 'minutes')
          .toISOString(),
        status: 'ok',
      },
      {
        time: now
          .subtract(14, 'days')
          .subtract(7, 'hours')
          .subtract(50, 'minutes')
          .toISOString(),
        status: 'ok',
      },
      {
        time: now
          .subtract(14, 'days')
          .subtract(7, 'hours')
          .subtract(45, 'minutes')
          .toISOString(),
        status: 'ng',
        error: {
          type: 'service down',
          reason: '1 node down',
          nodes: ['dell180'],
          description:
            'nova has 1 node down due to the memory exhausted, and the abnormal memory competition from PID(24887) is detected',
          details: '{ ... the best efforts of error summary / direction ...} ',
          log: 'http://{dataCenter}:8888/log/nova/dell180-20250205113459-b3gc.log',
        },
      },
      {
        time: now
          .subtract(14, 'days')
          .subtract(7, 'hours')
          .subtract(20, 'minutes')
          .toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(14, 'days').subtract(7, 'hours').toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(14, 'days').subtract(6, 'hours').toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(14, 'days').subtract(5, 'hours').toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(5, 'days').toISOString(),
        status: 'ng',
        error: {
          type: 'service down',
          reason: '1 node down',
          nodes: ['dell180'],
          description:
            'nova has 1 node down due to the memory exhausted, and the abnormal memory competition from PID(24887) is detected',
          details: '{ ... the best efforts of error summary / direction ...} ',
          log: 'http://{dataCenter}:8888/log/nova/dell180-20250205113459-b3gc.log',
        },
      },
      {
        time: now.subtract(4, 'days').subtract(23, 'hours').toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(4, 'days').subtract(22, 'hours').toISOString(),
        status: 'ok',
      },
    ],
  },
  {
    category: 'core',
    service: 'clusterLink',
    module: 'dns',
    history: [
      {
        time: now.subtract(58, 'minutes').toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(52, 'minutes').toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(31, 'minutes').toISOString(),
        status: 'ng',
        error: {
          type: 'service down',
          reason: '1 node down',
          nodes: ['dell180'],
          description:
            'nova has 1 node down due to the memory exhausted, and the abnormal memory competition from PID(24887) is detected',
          details: '{ ... the best efforts of error summary / direction ...} ',
          log: 'http://{dataCenter}:8888/log/nova/dell180-20250205113459-b3gc.log',
        },
      },
      {
        time: now.subtract(20, 'minutes').toISOString(),
        status: 'ng',
        error: {
          type: 'service down',
          reason: '1 node down',
          nodes: ['dell180'],
          description:
            'nova has 1 node down due to the memory exhausted, and the abnormal memory competition from PID(24887) is detected',
          details: '{ ... the best efforts of error summary / direction ...} ',
          log: 'http://{dataCenter}:8888/log/nova/dell180-20250205113459-b3gc.log',
        },
      },
      {
        time: now.subtract(13, 'minutes').toISOString(),
        status: 'ok',
      },
      {
        time: now.subtract(3, 'minutes').toISOString(),
        status: 'ng',
        error: {
          type: 'service down',
          reason: '1 node down',
          nodes: ['dell180'],
          description:
            'nova has 1 node down due to the memory exhausted, and the abnormal memory competition from PID(24887) is detected',
          details: '{ ... the best efforts of error summary / direction ...} ',
          log: 'http://{dataCenter}:8888/log/nova/dell180-20250205113459-b3gc.log',
        },
      },
    ],
  },
]
