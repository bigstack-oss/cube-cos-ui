import { CosInformation, CosNagging } from '@cube-frontend/ui-library'
import { KeycloakMessage } from '../../keycloakLoginContext'
import { toPageMessageView } from './messageText'

export type PageMessageProps = {
  message: KeycloakMessage | undefined
}

/** Keycloak's page-level message, worded by Keycloak. */
export const PageMessage = (props: PageMessageProps) => {
  const view = toPageMessageView(props.message)

  if (!view) {
    return null
  }

  if (view.kind === 'information') {
    return <CosInformation showIcon={true}>{view.text}</CosInformation>
  }

  return (
    <CosNagging
      className="w-full"
      type={view.type}
      variant="top"
      title={view.text}
    />
  )
}
