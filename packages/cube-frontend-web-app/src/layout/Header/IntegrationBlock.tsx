import OpenStackIcon from '@cube-frontend/ui-library/icons/colored/openstack.svg?react'
import CephIcon from '@cube-frontend/ui-library/icons/colored/ceph.svg?react'
import KeycloakIcon from '@cube-frontend/ui-library/icons/colored/keyclock.svg?react'
import RancherIcon from '@cube-frontend/ui-library/icons/colored/rancher.svg?react'
import { useContext } from 'react'
import { IntegrationsContext } from '@cube-frontend/web-app/context/IntegrationsContext'
import { IntegrationIconButton } from './IntegrationIconButton'

const integrationIcons = {
  keycloak: <KeycloakIcon />,
  ceph: <CephIcon />,
  openstack: <OpenStackIcon />,
  rancher: <RancherIcon />,
}

export const IntegrationBlock = () => {
  const integrations = useContext(IntegrationsContext)

  const integrationsProps = integrations.map((integration) => {
    const icon =
      integrationIcons[integration.name as keyof typeof integrationIcons]
    if (!icon) {
      console.warn(`Integration icon not found for ${integration.name}`)
    }

    return {
      icon,
      onClick: () => {
        window.open(integration.url, '_blank')
      },
    }
  })

  return (
    <div className="flex flex-row items-center">
      {integrationsProps.map((integrations, index) => (
        <IntegrationIconButton key={index} onClick={integrations.onClick}>
          {integrations.icon}
        </IntegrationIconButton>
      ))}
    </div>
  )
}
