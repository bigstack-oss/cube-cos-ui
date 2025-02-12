import { CosButton } from '@cube-frontend/ui-library'
import { twMerge } from 'tailwind-merge'
import { LoginCopyright } from './LoginCopyright'
import { LoginFields } from './LoginFIelds'
import { LoginHeader } from './LoginHeader'
import { LoginHelp } from './LoginHelp'

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
        <LoginHelp />
        {/* Keeping this input to match the native Keycloak login form. */}
        <input
          type="hidden"
          name="credentialId"
          value={authSelectedCredentials}
        />
      </div>
      <LoginCopyright />
    </form>
  )
}
