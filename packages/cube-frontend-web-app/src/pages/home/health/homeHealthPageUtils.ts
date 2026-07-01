import { upperFirst } from 'lodash'

export const HOME_HEALTH_PAGE_POLLING_INTERVAL = 5 * 1000

const serviceNameLabelMap: Record<string, string> = {
  clusterLink: 'Cluster Link',
  clusterSys: 'Cluster Sys',
  clusterSettings: 'Cluster Settings',
  haCluster: 'HA Cluster',
  msgQueue: 'Msg Queue',
  iaasDb: 'Iaas DB',
  virtualIp: 'Virtual IP',
  apiService: 'API Service',
  singleSignOn: 'Single Sign On',
  storage: 'Storage',
  network: 'Network',
  compute: 'Compute',
  bareMetal: 'Bare Metal',
  image: 'Image',
  blockStor: 'BlockStor',
  fileStor: 'FileStor',
  objectStor: 'ObjectStor',
  orchestration: 'Orchestration',
  lbaas: 'LBaaS',
  dnsaas: 'DNSaaS',
  k8saas: 'K8saaS',
  instanceHa: 'Instance HA',
  businessLogic: 'Business Logic',
  dataPipe: 'Data Pipe',
  metrics: 'Metrics',
  logAnalytics: 'Log Analytics',
  notifications: 'Notifications',
}

export const serviceNameToLabel = (name: string | undefined): string => {
  if (!name) return ''
  const label = serviceNameLabelMap[name]
  if (!label) {
    console.warn(`Cannot find the label for service ${name}`)
    return upperFirst(name)
  }
  return label
}

const moduleNameLabelMap: Record<string, string> = {
  link: 'Link',
  clock: 'Clock',
  dns: 'DNS',
  bootstrap: 'Bootstrap',
  license: 'License',
  etcd: 'Etcd',
  nodelist: 'Node List',
  hacluster: 'HA Cluster',
  rabbitmq: 'RabbitMQ',
  mysql: 'MySQL',
  mongodb: 'MongoDB',
  vip: 'VIP',
  haproxy_ha: 'HAProxy HA',
  haproxy: 'HAProxy',
  httpd: 'Httpd',
  skyline: 'Skyline',
  nginx: 'Nginx',
  lmi: 'LMI',
  memcache: 'Memcache',
  api: 'API',
  k3s: 'K3s',
  keycloak: 'Keycloak',
  ceph: 'Ceph',
  ceph_mon: 'Ceph MON',
  ceph_mgr: 'Ceph MGR',
  ceph_mds: 'Ceph MDS',
  ceph_osd: 'Ceph OSD',
  ceph_rgw: 'Ceph RGW',
  rbd_target: 'RBD Target',
  fc_link: 'FC Link',
  neutron: 'Neutron',
  nova: 'Nova',
  cyborg: 'Cyborg',
  ironic: 'Ironic',
  glance: 'Glance',
  cinder: 'Cinder',
  manila: 'Manila',
  swift: 'Swift',
  heat: 'Heat',
  octavia: 'Octavia',
  designate: 'Designate',
  rancher: 'Rancher',
  masakari: 'Masakari',
  senlin: 'Senlin',
  watcher: 'Watcher',
  zookeeper: 'ZooKeeper',
  kafka: 'Kafka',
  monasca: 'Monasca',
  telegraf: 'Telegraf',
  grafana: 'Grafana',
  filebeat: 'Filebeat',
  auditbeat: 'Auditbeat',
  logstash: 'Logstash',
  opensearch: 'OpenSearch',
  'opensearch-dashboards': 'OpenSearch Dashboards',
  influxdb: 'InfluxDB',
  kapacitor: 'Kapacitor',
}

export const moduleNameToLabel = (name: string | undefined): string => {
  if (!name) return ''
  const label = moduleNameLabelMap[name]
  if (!label) {
    console.warn(`Cannot find the label for module ${name}`)
    return upperFirst(name)
  }
  return label
}
