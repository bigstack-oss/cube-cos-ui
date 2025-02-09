import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import { twMerge } from 'tailwind-merge'
import { mainContentPaddingTopClass } from '../../keycloakLoginStyles'
import { LoginCopyright } from './LoginCopyright'
import { LoginFields } from './LoginFIelds'
import { LoginHeader } from './LoginHeader'
import { LoginHelp } from './LoginHelp'

export const LoginForm = () => {
  const { formActionUrl, authSelectedCredentials } = window.keycloakLoginContext

  return (
    <form
      className={twMerge(
        'flex h-full w-1/2 flex-col items-center',
        mainContentPaddingTopClass,
      )}
      method="post"
      action={formActionUrl}
    >
      <div className="flex w-[504px] flex-col items-center [&>*]:w-full">
        <LoginHeader />
        <CosStroke
          className="mb-[23px] mt-12"
          type="dot"
          color="border-chart-2"
        />
        <LoginFields />
        <CosButton className="mt-12" htmlType="submit" size="lg">
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
