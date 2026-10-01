import { AuthLayout } from '../components/AuthLayout/AuthLayout'
import { LoginForm } from '../components/LoginForm/LoginForm'
import { KeycloakLoginContext, LoginPageContext } from '../keycloakLoginContext'
import { ConfigTotpPage } from './ConfigTotpPage'
import { OtpPage } from './OtpPage'
import { UpdatePasswordPage } from './UpdatePasswordPage'

export type KeycloakPageProps = {
  context: KeycloakLoginContext
}

const renderPage = (context: KeycloakLoginContext) => {
  switch (context.pageId) {
    case 'login-otp':
      return <OtpPage context={context} />
    case 'login-config-totp':
      return <ConfigTotpPage context={context} />
    case 'login-update-password':
      return <UpdatePasswordPage context={context} />
    case 'login':
    default:
      // Anything without a known `pageId` is the login page, the one page
      // this theme rendered before the others existed.
      return <LoginForm context={context as LoginPageContext} />
  }
}

/** Picks the page for the `.ftl` Keycloak rendered, inside the shared layout. */
export const KeycloakPage = (props: KeycloakPageProps) => {
  const { context } = props

  return (
    <AuthLayout resourcesPath={context.resourcesPath}>
      {renderPage(context)}
    </AuthLayout>
  )
}
