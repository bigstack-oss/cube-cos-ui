import { CosPasswordInput, CosStroke } from '@cube-frontend/ui-library'
import { AuthForm } from '../components/AuthLayout/AuthForm'
import { AuthFormButtons } from '../components/AuthLayout/AuthFormButtons'
import { LogoutOtherSessions } from '../components/AuthLayout/LogoutOtherSessions'
import { PageMessage } from '../components/AuthLayout/PageMessage'
import { toFieldError } from '../components/AuthLayout/messageText'
import { LoginHeader } from '../components/LoginForm/LoginHeader'
import { LoginUpdatePasswordPageContext } from '../keycloakLoginContext'

export type UpdatePasswordPageProps = {
  context: LoginUpdatePasswordPageContext
}

/** Replaces Keycloak's `login-update-password.ftl`. */
export const UpdatePasswordPage = (props: UpdatePasswordPageProps) => {
  const {
    formActionUrl,
    message,
    username,
    isAppInitiatedAction,
    passwordError,
    passwordConfirmError,
  } = props.context

  return (
    <AuthForm
      action={formActionUrl}
      noValidate={true}
      className="overflow-y-auto"
    >
      <LoginHeader
        title="Update your password"
        description="Choose a new password for your account."
      />
      <CosStroke
        className="mb-[23px] mt-12"
        type="dot"
        color="border-chart-2"
      />
      {/* Lets a password manager tie the new password to this account. */}
      <input
        type="text"
        name="username"
        value={username}
        autoComplete="username"
        readOnly={true}
        hidden={true}
      />
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        hidden={true}
      />
      <div className="flex flex-col gap-y-[23px]">
        <PageMessage message={message} />
        <CosPasswordInput
          name="password-new"
          label="New password"
          placeholder="New password"
          autoComplete="new-password"
          autoFocus={true}
          errorMessage={toFieldError(passwordError)}
        />
        <CosPasswordInput
          name="password-confirm"
          label="Confirm password"
          placeholder="Confirm password"
          autoComplete="new-password"
          errorMessage={toFieldError(passwordConfirmError)}
        />
        <LogoutOtherSessions />
      </div>
      <AuthFormButtons
        submitLabel="Update password"
        isAppInitiatedAction={isAppInitiatedAction}
      />
    </AuthForm>
  )
}
