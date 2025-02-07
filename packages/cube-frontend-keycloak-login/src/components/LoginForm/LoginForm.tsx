import { CosButton, CosHyperlink } from '@cube-frontend/ui-library'
import { LoginFields } from './LoginFIelds'
import { LoginFooter } from './LoginFooter'
import { LoginHeader } from './LoginHeader'
import { twMerge } from 'tailwind-merge'

export const LoginForm = () => {
  const { formActionUrl, authSelectedCredentials } = window.keycloakLoginContext

  return (
    <form
      className={twMerge(
        'flex h-full w-1/2 flex-col items-center px-[180px]',
        'pb-[45px] pt-[75px]',
        'height-md:pb-[60px] height-md:pt-[120px]',
        'height-lg:pb-[90px] height-lg:pt-[150px]',
        'height-xl:pb-[120px] height-xl:pt-[240px]',
      )}
      method="post"
      action={formActionUrl}
    >
      <div className="flex w-[360px] flex-col items-center gap-y-12 [&>*]:w-full">
        <LoginHeader />
        <LoginFields />
        <CosButton htmlType="submit" size="lg">
          Log in
        </CosButton>
        <div className="flex items-center justify-center gap-x-3">
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
