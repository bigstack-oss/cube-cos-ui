import { CosButton, CosHyperlink } from '@cube-frontend/ui-library'
import { LoginFields } from './LoginFIelds'
import { LoginFooter } from './LoginFooter'
import { LoginHeader } from './LoginHeader'

export const LoginForm = () => {
  const { formActionUrl, authSelectedCredentials } = window.keycloakLoginContext

  return (
    <form
      className="flex h-full w-1/2 flex-col items-center px-[180px] pb-[10svh] pt-[20svh]"
      method="post"
      action={formActionUrl}
    >
      <div className="flex w-[360px] flex-col items-center gap-y-12 [&>*]:w-full">
        <LoginHeader />
        <LoginFields />
        <CosButton htmlType="submit" size="lg">
          Log in
        </CosButton>
        <div className="mb-8 flex items-center justify-center gap-x-3">
          <span className="primary-body2 text-functional-text">
            Couldn’t log in ?
          </span>
          <CosHyperlink variant="text-only" href="...">
            Contact Support
          </CosHyperlink>
        </div>
        {/* Keeping this input to match the native Keycloak login form. */}
        <input
          type="hidden"
          name="credentialId"
          value={authSelectedCredentials}
        />
      </div>
      <LoginFooter />
    </form>
  )
}
