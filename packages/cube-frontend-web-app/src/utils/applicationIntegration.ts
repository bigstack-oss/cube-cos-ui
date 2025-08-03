import CephIcon from '@cube-frontend/ui-library/icons/colored/ceph.svg?react'
import KeycloakIcon from '@cube-frontend/ui-library/icons/colored/keycloak.svg?react'
import OpenStackIcon from '@cube-frontend/ui-library/icons/colored/openstack.svg?react'
import RancherIcon from '@cube-frontend/ui-library/icons/colored/rancher.svg?react'

export const applicationIntegrationUIData = {
  keycloak: {
    Icon: KeycloakIcon,
    displayName: 'Keycloak',
  },
  ceph: {
    Icon: CephIcon,
    displayName: 'Ceph',
  },
  openstack: {
    Icon: OpenStackIcon,
    displayName: 'OpenStack',
  },
  rancher: {
    Icon: RancherIcon,
    displayName: 'Rancher',
  },
} as const

export type ApplicationIntegrationKey =
  keyof typeof applicationIntegrationUIData
