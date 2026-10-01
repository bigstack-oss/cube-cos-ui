import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import { LoginPageContext } from '../../keycloakLoginContext'
import { AuthForm } from '../AuthLayout/AuthForm'
import { LoginFields } from './LoginField'
import { LoginHeader } from './LoginHeader'
import { LoginHelp } from './LoginHelp'

export type LoginFormProps = {
  context: LoginPageContext
}

export const LoginForm = (props: LoginFormProps) => {
  const { context } = props
  const { formActionUrl, authSelectedCredentials, loginGreeting } = context

  return (
    <AuthForm action={formActionUrl}>
      <LoginHeader
        title="Log in to the Data Center"
        description={loginGreeting || 'Welcome to COS cloud service platform!'}
      />
      <CosStroke
        className="mb-[23px] mt-12"
        type="dot"
        color="border-chart-2"
      />
      <LoginFields context={context} />
      <CosButton className="mt-12" htmlType="submit" size="lg">
        Log in
      </CosButton>
      <LoginHelp />
      {/* Keeping this input to match the native Keycloak login form. */}
      <input
        type="hidden"
        name="credentialId"
        tabIndex={-1}
        value={authSelectedCredentials}
      />
    </AuthForm>
  )
}
