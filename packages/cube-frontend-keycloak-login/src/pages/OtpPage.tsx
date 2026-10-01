import {
  CosButton,
  CosInput,
  CosRadioButton,
  CosRadioButtonGroup,
  CosStroke,
} from '@cube-frontend/ui-library'
import { useState } from 'react'
import { AuthForm } from '../components/AuthLayout/AuthForm'
import { PageMessage } from '../components/AuthLayout/PageMessage'
import { toFieldError } from '../components/AuthLayout/messageText'
import { LoginHeader } from '../components/LoginForm/LoginHeader'
import { LoginHelp } from '../components/LoginForm/LoginHelp'
import { LoginOtpPageContext } from '../keycloakLoginContext'

export type OtpPageProps = {
  context: LoginOtpPageContext
}

/** Replaces Keycloak's `login-otp.ftl`. */
export const OtpPage = (props: OtpPageProps) => {
  const {
    formActionUrl,
    message,
    otpCredentials,
    selectedCredentialId,
    otpError,
  } = props.context

  const [checkedCredentialId, setCheckedCredentialId] = useState<
    string | undefined
  >(selectedCredentialId ?? otpCredentials[0]?.id)

  return (
    <AuthForm
      action={formActionUrl}
      noValidate={true}
      className="overflow-y-auto"
    >
      <LoginHeader
        title="Enter your one-time code"
        description="Open your authenticator app and enter the code it shows for this account."
      />
      <CosStroke
        className="mb-[23px] mt-12"
        type="dot"
        color="border-chart-2"
      />
      <div className="flex flex-col gap-y-[23px]">
        <PageMessage message={message} />
        {/* Keycloak only asks which device when the user has more than one. */}
        {otpCredentials.length > 1 && (
          <div className="flex flex-col gap-y-3">
            <span className="primary-body2 font-semibold text-functional-title">
              Device
            </span>
            <CosRadioButtonGroup direction="vertical">
              {otpCredentials.map((credential, index) => (
                <CosRadioButton
                  key={credential.id}
                  id={`otp-credential-${index}`}
                  name="selectedCredentialId"
                  value={credential.id}
                  label={credential.userLabel || `Device ${index + 1}`}
                  checked={credential.id === checkedCredentialId}
                  onChange={() => setCheckedCredentialId(credential.id)}
                />
              ))}
            </CosRadioButtonGroup>
          </div>
        )}
        <CosInput
          name="otp"
          label="One-time code"
          placeholder="One-time code"
          autoComplete="one-time-code"
          inputMode="numeric"
          autoFocus={true}
          errorMessage={toFieldError(otpError)}
        />
      </div>
      <CosButton
        className="mt-12"
        htmlType="submit"
        size="lg"
        name="login"
        value="Log in"
      >
        Log in
      </CosButton>
      <LoginHelp />
    </AuthForm>
  )
}
